import { SLIDES } from './slides.js';
import { Scene } from './scenes.js';

const DURATION = 1600;
const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

const $ = (s, el = document) => el.querySelector(s);
const pad = (n) => String(n).padStart(2, '0');
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2);
const easeOut = (t) => 1 - (1 - t) ** 4;
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const stage = $('.stage');
const wipe = $('.wipe');
const wipeLine = $('.wipe line');
const card = $('.card');
const menu = $('.menu');
const menuBtn = $('.menu-btn');
const cursor = $('.cursor');

let W = innerWidth;
let H = innerHeight;
let current = 0;
let transition = null;
let intro = null;
let mouse = { x: 0, y: 0, active: false };
const smooth = { x: 0, y: 0 };

// ------------------------------------------------------------------ build DOM
function splitTitle(lines) {
  let i = 0;
  return lines
    .map((line) => `<span class="line">${line
      .split(' ')
      .map((word) => `<span class="word">${[...word].map((ch) => `<span class="char" style="--i:${i++}">${esc(ch)}</span>`).join('')}</span>`)
      .join(' ')}</span>`)
    .join('');
}

const slides = SLIDES.map((def, i) => {
  const el = document.createElement('section');
  el.className = 'slide';
  el.dataset.id = def.id;
  el.setAttribute('aria-roledescription', 'slide');
  el.setAttribute('aria-label', `${i + 1} of ${SLIDES.length}: ${def.title.join(' ')}`);
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `
    <canvas class="slide__canvas"></canvas>
    <div class="slide__shade"></div>
    <div class="slide__content">
      <div class="slide__head">
        <p class="slide__eyebrow"><span>${pad(i + 1)}</span>${esc(def.eyebrow)}</p>
        <h2 class="slide__title">${splitTitle(def.title)}</h2>
      </div>
      <div class="slide__foot">
        <p class="slide__text">${esc(def.text)}</p>
        <a class="slide__cta" href="#" data-hover>${esc(def.cta)}</a>
      </div>
    </div>
    <div class="slide__hotspots"></div>`;
  stage.appendChild(el);

  const hotspots = (def.hotspots || []).map((h) => {
    const b = document.createElement('button');
    b.className = 'hotspot';
    b.type = 'button';
    b.dataset.hover = '';
    b.innerHTML = '<span class="hotspot__ring"></span><span class="hotspot__label">Explore</span>';
    b.setAttribute('aria-label', `Explore: ${h.title}`);
    b.addEventListener('click', () => openCard(def.eyebrow, h.title, h.text));
    $('.slide__hotspots', el).appendChild(b);
    return { ...h, el: b };
  });

  $('.slide__cta', el).addEventListener('click', (e) => {
    e.preventDefault();
    openCard(def.eyebrow, def.card.title, def.card.text);
  });

  const canvas = $('canvas', el);
  return {
    def, i, el, canvas, hotspots,
    ctx: canvas.getContext('2d'),
    scene: new Scene(def.scene, (i + 1) * 7919),
    visible: false, shift: 0, zoom: 1,
  };
});

const rail = $('.rail');
const menuList = $('.menu__list');
slides.forEach((s, i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.dataset.hover = '';
  b.innerHTML = `<span>${pad(i + 1)} ${esc(s.def.eyebrow)}</span><i></i>`;
  b.setAttribute('aria-label', `Go to slide ${i + 1}: ${s.def.title.join(' ')}`);
  b.addEventListener('click', () => go(i));
  rail.appendChild(b);

  const li = document.createElement('li');
  li.innerHTML = `<button type="button" data-hover style="--i:${i}"><small>${pad(i + 1)}</small>${esc(s.def.title.join(' '))}</button>`;
  li.firstChild.addEventListener('click', () => { toggleMenu(false); go(i); });
  menuList.appendChild(li);
});
$('.counter__total').textContent = pad(slides.length);

// ------------------------------------------------------------------ scenes
const isBuilt = (s) => !!s.scene.layers;
function ensureBuilt(s) {
  if (!isBuilt(s)) s.scene.buildSync(W, H, DPR);
}
function show(s) {
  s.visible = true;
  s.canvas.width = Math.round(W * DPR);
  s.canvas.height = Math.round(H * DPR);
  s.el.classList.add('is-visible');
  s.el.setAttribute('aria-hidden', 'false');
}
function hide(s) {
  s.visible = false;
  s.canvas.width = s.canvas.height = 0;
  s.el.classList.remove('is-visible', 'is-active', 'is-leaving', 'is-entering');
  s.el.setAttribute('aria-hidden', 'true');
  s.el.style.clipPath = '';
  s.el.style.removeProperty('--dim');
  s.shift = 0;
  s.zoom = 1;
}
const neighbours = (i) => [i, (i + 1) % slides.length, (i - 1 + slides.length) % slides.length];

let idleJob = 0;
function scheduleNeighbourBuilds() {
  clearTimeout(idleJob);
  const keep = new Set(neighbours(current));
  slides.forEach((s, i) => { if (!keep.has(i) && !s.visible) s.scene.dispose(); });
  const queue = [...keep].map((i) => slides[i]).filter((s) => !isBuilt(s));
  const step = () => {
    const s = queue.shift();
    if (!s) return;
    if (!transition) ensureBuilt(s);
    else queue.unshift(s);
    idleJob = setTimeout(step, 120);
  };
  idleJob = setTimeout(step, 250);
}

// ------------------------------------------------------------------ navigation
function setUI() {
  [...rail.children].forEach((b, i) => b.setAttribute('aria-current', String(i === current)));
  [...menuList.querySelectorAll('button')].forEach((b, i) => b.setAttribute('aria-current', String(i === current)));
  $('.counter__current').textContent = pad(current + 1);
  history.replaceState(null, '', `#/${slides[current].def.id}`);
}

function go(target, dir) {
  if (!booted) return;
  if (transition || intro || card.classList.contains('is-open')) return;
  const to = (target + slides.length) % slides.length;
  if (to === current) return;
  dir = dir ?? (to > current ? 1 : -1);
  const from = slides[current];
  const next = slides[to];
  ensureBuilt(next);
  show(next);
  next.el.classList.add('is-entering', 'is-active');
  from.el.classList.remove('is-active');
  from.el.classList.add('is-leaving');
  wipe.style.opacity = 1;
  transition = { from, to: next, dir, start: performance.now(), duration: reduceMotion ? 500 : DURATION };
  current = to;
  setUI();
}

function stepTransition(now) {
  const { from, to, dir, start, duration } = transition;
  const p = clamp((now - start) / duration);
  const e = easeInOut(p);
  const slant = W * 0.08 * (1 - e);
  let top, bottom;
  if (dir > 0) {
    top = (1 - e) * W;
    bottom = top + slant;
    to.el.style.clipPath = `polygon(${top}px 0, ${W + 2}px 0, ${W + 2}px ${H}px, ${bottom}px ${H}px)`;
  } else {
    top = e * W;
    bottom = top - slant;
    to.el.style.clipPath = `polygon(-2px 0, ${top}px 0, ${bottom}px ${H}px, -2px ${H}px)`;
  }
  wipeLine.setAttribute('x1', top);
  wipeLine.setAttribute('x2', bottom);
  wipeLine.setAttribute('y1', 0);
  wipeLine.setAttribute('y2', H);
  wipe.style.opacity = Math.sin(p * Math.PI) * 1.4;

  const travel = reduceMotion ? 0 : 1;
  to.shift = dir * (1 - e) * W * 0.32 * travel;
  to.zoom = 1 + 0.1 * (1 - e) * travel;
  from.shift = -dir * e * W * 0.22 * travel;
  from.zoom = 1 + 0.04 * e * travel;
  from.el.style.setProperty('--dim', (e * 0.45).toFixed(3));

  if (p >= 1) {
    hide(from);
    to.el.style.clipPath = '';
    to.el.classList.remove('is-entering');
    to.shift = 0;
    to.zoom = 1;
    wipe.style.opacity = 0;
    transition = null;
    scheduleNeighbourBuilds();
    if (pendingResize) handleResize();
  }
}

// ------------------------------------------------------------------ overlays
function openCard(eyebrow, title, text) {
  $('.card__eyebrow').textContent = eyebrow;
  $('.card__title').textContent = title;
  $('.card__text').textContent = text;
  card.classList.add('is-open');
  card.setAttribute('aria-hidden', 'false');
  $('.card__close').focus({ preventScroll: true });
}
function closeCard() {
  card.classList.remove('is-open');
  card.setAttribute('aria-hidden', 'true');
}
$('.card__close').addEventListener('click', closeCard);

function toggleMenu(force) {
  const open = force ?? !menu.classList.contains('is-open');
  menu.classList.toggle('is-open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuBtn.setAttribute('aria-expanded', String(open));
  $('.menu-btn__label').textContent = open ? 'Close' : 'Menu';
}
menuBtn.addEventListener('click', () => toggleMenu());

const overlayOpen = () => menu.classList.contains('is-open') || card.classList.contains('is-open');

// ------------------------------------------------------------------ input
let lastWheel = 0;
let wheelAcc = 0;
let needGap = false;
addEventListener('wheel', (e) => {
  e.preventDefault();
  if (overlayOpen()) return;
  const now = performance.now();
  const gap = now - lastWheel;
  lastWheel = now;
  if (gap > 160) {
    wheelAcc = 0;
    if (!transition) needGap = false;
  }
  if (transition || intro || needGap) return;
  wheelAcc += Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
  if (Math.abs(wheelAcc) > 30) {
    const d = Math.sign(wheelAcc);
    wheelAcc = 0;
    needGap = true;
    go(current + d, d);
  }
}, { passive: false });

addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeCard(); toggleMenu(false); return; }
  if (overlayOpen()) return;
  if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(current + 1, 1); }
  if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); go(current - 1, -1); }
  if (e.key === 'Home') go(0, -1);
  if (e.key === 'End') go(slides.length - 1, 1);
});

let touch = null;
addEventListener('touchstart', (e) => { touch = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }, { passive: true });
addEventListener('touchend', (e) => {
  if (!touch || overlayOpen()) return;
  const t = e.changedTouches[0];
  const dx = touch.x - t.clientX;
  const dy = touch.y - t.clientY;
  const d = Math.abs(dx) > Math.abs(dy) ? dx : dy;
  touch = null;
  if (Math.abs(d) > 45) go(current + Math.sign(d), Math.sign(d));
});

const cursorRing = $('.cursor__ring');
const cursorDot = $('.cursor__dot');
const ring = { x: W / 2, y: H / 2 };
const pointer = { x: W / 2, y: H / 2 };
addEventListener('pointermove', (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  mouse.x = (e.clientX / W) * 2 - 1;
  mouse.y = (e.clientY / H) * 2 - 1;
  mouse.active = e.pointerType === 'mouse';
});
document.addEventListener('pointerover', (e) => cursor.classList.toggle('is-hover', !!e.target.closest('[data-hover]')));
addEventListener('pointerdown', () => cursor.classList.add('is-down'));
addEventListener('pointerup', () => cursor.classList.remove('is-down'));

addEventListener('hashchange', () => {
  const i = slides.findIndex((s) => `#/${s.def.id}` === location.hash);
  if (i >= 0 && i !== current) go(i);
});

let booted = false;
let pendingResize = false;
let resizeTimer = 0;
function handleResize() {
  pendingResize = false;
  W = innerWidth;
  H = innerHeight;
  slides.forEach((s) => s.scene.dispose());
  slides.filter((s) => s.visible).forEach((s) => { ensureBuilt(s); show(s); });
  scheduleNeighbourBuilds();
}
addEventListener('resize', () => {
  if (!booted) return;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => (transition ? (pendingResize = true) : handleResize()), 200);
});

// ------------------------------------------------------------------ loop
function frame(now) {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const t = now / 1000;

  const tx = mouse.active ? mouse.x : Math.sin(t * 0.21) * 0.35;
  const ty = mouse.active ? mouse.y : Math.cos(t * 0.17) * 0.25;
  const k = reduceMotion ? 0.02 : 0.05;
  smooth.x += (tx - smooth.x) * k;
  smooth.y += (ty - smooth.y) * k;

  if (transition) stepTransition(now);

  let introZoom = 1;
  if (intro) {
    const p = clamp((now - intro) / 2600);
    introZoom = 1 + 0.18 * (1 - easeOut(p));
    if (p >= 1) intro = null;
  }

  const breathe = 1 + 0.01 * Math.sin(t * 0.3);
  for (const s of slides) {
    if (!s.visible) continue;
    const zoom = s.zoom * breathe * (s.i === current ? introZoom : 1);
    s.scene.draw(s.ctx, W, H, DPR, t, smooth.x, smooth.y, s.shift, zoom);
    for (const h of s.hotspots) {
      const [x, y] = Scene.project(W, H, (W < H && h.portraitAt) || h.at, h.depth, smooth.x, smooth.y, s.shift, zoom);
      h.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }

  if (finePointer) {
    ring.x += (pointer.x - ring.x) * 0.2;
    ring.y += (pointer.y - ring.y) * 0.2;
    cursorRing.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
    cursorDot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
  }
}

// ------------------------------------------------------------------ preload + intro
async function boot() {
  const fromHash = slides.findIndex((s) => `#/${s.def.id}` === location.hash);
  current = fromHash >= 0 ? fromHash : 0;
  const order = neighbours(current).map((i) => slides[i]);
  const total = order.reduce((n, s) => n + s.scene.stepCount, 0) + 1;
  let done = 0;
  let shown = 0;
  const countEl = $('.preloader__count span');
  const bar = $('.preloader__bar');
  const paint = () => {
    shown += (done / total - shown) * 0.25;
    countEl.textContent = Math.round(shown * 100);
    bar.style.setProperty('--p', shown.toFixed(3));
  };
  const nextFrame = () => new Promise((r) => requestAnimationFrame(r));

  await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]);
  done++;
  for (const s of order) {
    for (const _ of s.scene.build(W, H, DPR)) {
      done++;
      paint();
      await nextFrame();
    }
  }
  while (shown < 0.995) { paint(); await nextFrame(); }
  if (W !== innerWidth || H !== innerHeight) {
    W = innerWidth;
    H = innerHeight;
    slides.forEach((s) => s.scene.dispose());
  }
  ensureBuilt(slides[current]);
  booted = true;
  countEl.textContent = '100';

  const s = slides[current];
  show(s);
  setUI();
  requestAnimationFrame(frame);
  $('.preloader').classList.add('is-done');
  intro = performance.now() + 200;
  setTimeout(() => s.el.classList.add('is-entering', 'is-active'), 300);
  setTimeout(() => s.el.classList.remove('is-entering'), 2400);
  scheduleNeighbourBuilds();
}
boot();
