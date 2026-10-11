// Procedural, layered scene renderer. Static layers are pre-rendered once per
// size into offscreen canvases; dynamic layers (mist, particles, birds, rays)
// are drawn every frame. Each layer has a depth used for parallax.

export const OVERSCAN = 0.06;
export const MAX_PARALLAX = 38;

const TAU = Math.PI * 2;
const lerp = (a, b, t) => a + (b - a) * t;

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function noise(r, octaves = 4) {
  const waves = [];
  for (let o = 0; o < octaves; o++) {
    waves.push({ f: (0.6 + r() * 0.8) * 2 ** o, p: r() * TAU, a: 0.5 ** o });
  }
  const norm = waves.reduce((s, w) => s + w.a, 0);
  return (x) => waves.reduce((s, w) => s + Math.sin(x * w.f * TAU + w.p) * w.a, 0) / norm;
}

const toRgb = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
export const hexA = (hex, a = 1) => `rgba(${toRgb(hex).join(',')},${a})`;
const mix = (h1, h2, t) => {
  const a = toRgb(h1), b = toRgb(h2);
  return '#' + a.map((v, i) => Math.round(lerp(v, b[i], t)).toString(16).padStart(2, '0')).join('');
};
const shade = (hex, amt) => (amt < 0 ? mix(hex, '#000000', -amt) : mix(hex, '#ffffff', amt));
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const circle = (ctx, x, y, rad) => { ctx.beginPath(); ctx.arc(x, y, rad, 0, TAU); ctx.fill(); };

function leafPath(ctx, s, w = 0.38) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(s * 0.5, -s * w, s, 0);
  ctx.quadraticCurveTo(s * 0.5, s * w, 0, 0);
}

function leaf(ctx, x, y, s, ang, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(ang);
  ctx.fillStyle = color;
  leafPath(ctx, s);
  ctx.fill();
  ctx.restore();
}

function frond(ctx, x, y, s, ang, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(ang);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(1, s * 0.035);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(s * 0.5, s * 0.06, s, s * 0.16);
  ctx.stroke();
  const k = 7;
  for (let i = 1; i <= k; i++) {
    const t = i / (k + 1);
    const ls = s * 0.3 * (1 - t * 0.65);
    for (const sgn of [-1, 1]) {
      ctx.save();
      ctx.translate(s * t, s * 0.16 * t * t);
      ctx.rotate(sgn * 1.05 + 0.25);
      leafPath(ctx, ls, 0.3);
      ctx.fill();
      ctx.restore();
    }
  }
  ctx.restore();
}

function bigLeaf(ctx, x, y, len, ang, color, vein) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(ang);
  const g = ctx.createLinearGradient(0, 0, len, 0);
  g.addColorStop(0, shade(color, -0.25));
  g.addColorStop(1, color);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(len * 0.25, -len * 0.3, len * 0.75, -len * 0.22, len, 0);
  ctx.bezierCurveTo(len * 0.75, len * 0.18, len * 0.25, len * 0.26, 0, 0);
  ctx.fill();
  ctx.strokeStyle = vein;
  ctx.lineWidth = Math.max(1, len * 0.01);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(len * 0.5, -len * 0.02, len, 0);
  ctx.stroke();
  ctx.restore();
}

const bezier = (p, t) => {
  const u = 1 - t;
  return [0, 1].map((k) => u * u * u * p[0][k] + 3 * u * u * t * p[1][k] + 3 * u * t * t * p[2][k] + t * t * t * p[3][k]);
};

// ---------------------------------------------------------------- painters
// Signature: (ctx, W, H, r, opts). Coordinates in opts are 0..1 of the layer.
const P = {
  sky(ctx, W, H, r, { stops }) {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    stops.forEach(([p, c]) => g.addColorStop(p, c));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  },

  glow(ctx, W, H, r, { x, y, radius, color, alpha = 1, blend = 'screen' }) {
    const R = radius * Math.max(W, H);
    const g = ctx.createRadialGradient(x * W, y * H, 0, x * W, y * H, R);
    g.addColorStop(0, hexA(color, alpha));
    g.addColorStop(0.18, hexA(color, alpha * 0.55));
    g.addColorStop(0.5, hexA(color, alpha * 0.15));
    g.addColorStop(1, hexA(color, 0));
    ctx.save();
    ctx.globalCompositeOperation = blend;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  },

  sun(ctx, W, H, r, { x, y, radius, color, disc = 0.035 }) {
    P.glow(ctx, W, H, r, { x, y, radius, color, alpha: 0.9 });
    const R = disc * Math.max(W, H);
    const g = ctx.createRadialGradient(x * W, y * H, 0, x * W, y * H, R);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(0.7, hexA(color, 1));
    g.addColorStop(1, hexA(color, 0));
    ctx.fillStyle = g;
    circle(ctx, x * W, y * H, R);
  },

  stars(ctx, W, H, r, { count = 200, maxY = 0.6 }) {
    for (let i = 0; i < count; i++) {
      ctx.fillStyle = hexA('#ffffff', 0.15 + r() * 0.7);
      circle(ctx, r() * W, r() ** 1.4 * maxY * H, 0.4 + r() * 1.1);
    }
  },

  ridge(ctx, W, H, r, { y, amp = 0.1, color, top, freq = 1.5, canopy = 0 }) {
    const n = noise(r, 5);
    const pts = [];
    ctx.beginPath();
    ctx.moveTo(0, H);
    for (let x = 0; x <= W + 4; x += 4) {
      const yy = (y - (n((x / W) * freq) * 0.5 + 0.5) * amp) * H;
      pts.push([x, yy]);
      ctx.lineTo(x, yy);
    }
    ctx.lineTo(W, H);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, (y - amp) * H, 0, H);
    g.addColorStop(0, top || color);
    g.addColorStop(0.55, color);
    g.addColorStop(1, color);
    ctx.fillStyle = g;
    ctx.fill();
    if (canopy) {
      for (const [x, yy] of pts) {
        if (r() > 0.55) continue;
        const rad = canopy * H * (0.4 + r());
        circle(ctx, x, yy + rad * 0.6, rad);
      }
    }
  },

  island(ctx, W, H, r, { x, y, h, color, reflect = 0.25 }) {
    const n = noise(r, 4);
    const x0 = x[0] * W, x1 = x[1] * W, base = y * H;
    const shape = (dir) => {
      ctx.beginPath();
      ctx.moveTo(x0, base);
      for (let px = x0; px <= x1; px += 3) {
        const t = (px - x0) / (x1 - x0);
        const dome = Math.sin(t * Math.PI) ** 0.6;
        ctx.lineTo(px, base - dir * dome * h * H * (0.8 + 0.3 * n(t * 3)));
      }
      ctx.lineTo(x1, base);
      ctx.closePath();
    };
    ctx.fillStyle = color;
    shape(1);
    ctx.fill();
    for (let px = x0; px <= x1; px += 5) {
      const t = (px - x0) / (x1 - x0);
      const dome = Math.sin(t * Math.PI) ** 0.6;
      if (r() < 0.5) circle(ctx, px, base - dome * h * H * (0.8 + 0.3 * n(t * 3)), h * H * 0.12 * (0.5 + r()));
    }
    ctx.globalAlpha = reflect;
    shape(-0.7);
    ctx.fill();
    ctx.globalAlpha = 1;
  },

  palms(ctx, W, H, r, { items, color }) {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    for (const [px, py, ph] of items) {
      const bx = px * W, by = py * H, hh = ph * H;
      const lean = (r() - 0.5) * 0.5 * hh;
      const tx = bx + lean, ty = by - hh;
      ctx.lineCap = 'round';
      for (let k = 0; k < 4; k++) {
        ctx.lineWidth = hh * (0.04 - k * 0.008);
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.quadraticCurveTo(bx + lean * 0.1, by - hh * 0.6, tx, ty);
        ctx.stroke();
      }
      const fronds = 9;
      for (let k = 0; k < fronds; k++) {
        const ang = -Math.PI + (k / (fronds - 1)) * Math.PI + (r() - 0.5) * 0.3;
        const L = hh * 0.42 * (0.75 + r() * 0.4);
        const ex = tx + Math.cos(ang) * L;
        const ey = ty + Math.sin(ang) * L * 0.45 + L * 0.45;
        const cx = tx + Math.cos(ang) * L * 0.5;
        const cy = ty + Math.sin(ang) * L * 0.5 - L * 0.12;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.quadraticCurveTo(cx, cy - L * 0.12, ex, ey);
        ctx.quadraticCurveTo(cx, cy + L * 0.06, tx, ty);
        ctx.fill();
      }
    }
  },

  clouds(ctx, W, H, r, { count = 6, x = [0, 1], y = [0.1, 0.4], size = 0.2, color = '#ffffff', alpha = 0.7, flat = 0.35 }) {
    for (let i = 0; i < count; i++) {
      const cx = lerp(x[0], x[1], r()) * W;
      const cy = lerp(y[0], y[1], r()) * H;
      const s = size * W * (0.6 + r() * 0.8);
      const puffs = 10 + Math.floor(r() * 12);
      for (let j = 0; j < puffs; j++) {
        const px = cx + (r() - 0.5) * s * 1.8;
        const py = cy + (r() - 0.5) * s * flat;
        const rad = s * (0.18 + r() * 0.32);
        const g = ctx.createRadialGradient(px, py, 0, px, py, rad);
        g.addColorStop(0, hexA(color, alpha));
        g.addColorStop(0.6, hexA(color, alpha * 0.4));
        g.addColorStop(1, hexA(color, 0));
        ctx.fillStyle = g;
        ctx.fillRect(px - rad, py - rad, rad * 2, rad * 2);
      }
    }
  },

  branch(ctx, W, H, r, {
    p, width = 0.08, taper = 0.45, density = 1, moss = 12,
    bark = ['#2a2117', '#4a3a28', '#6b5a3e'],
    leaves = ['#284d17', '#3c6e1f', '#5b9a2c', '#86c13c', '#b5dc5a'],
    mossColor = '#a7ad74',
  }) {
    const PP = p.map(([x, y]) => [x * W, y * H]);
    const n = noise(r, 3);
    const N = 300;
    const pts = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const [x, y] = bezier(PP, t);
      pts.push({ x, y, t, w: width * H * (1 - taper * t) * (0.85 + 0.25 * n(t * 3)) });
    }
    ctx.fillStyle = bark[0];
    for (const q of pts) circle(ctx, q.x, q.y + q.w * 0.1, q.w * 0.5);
    ctx.fillStyle = bark[1];
    for (const q of pts) circle(ctx, q.x, q.y - q.w * 0.05, q.w * 0.4);
    ctx.lineCap = 'round';
    for (let i = 0; i < 260 * density; i++) {
      const a = Math.floor(r() * (N - 15));
      const q = pts[a], q2 = pts[a + 4 + Math.floor(r() * 10)];
      const off = (r() - 0.5) * q.w * 0.7;
      ctx.strokeStyle = hexA(r() > 0.5 ? bark[2] : bark[0], 0.55);
      ctx.lineWidth = 1 + r() * q.w * 0.04;
      ctx.beginPath();
      ctx.moveTo(q.x, q.y + off);
      ctx.lineTo(q2.x, q2.y + off + (r() - 0.5) * 4);
      ctx.stroke();
    }
    for (let i = 0; i < moss; i++) {
      const q = pts[Math.floor(r() * N)];
      const len = H * (0.04 + r() * 0.16);
      const strands = 3 + Math.floor(r() * 6);
      for (let s = 0; s < strands; s++) {
        const dx = (r() - 0.5) * q.w * 0.6;
        ctx.strokeStyle = hexA(mossColor, 0.3 + r() * 0.35);
        ctx.lineWidth = 0.8 + r() * 2;
        ctx.beginPath();
        ctx.moveTo(q.x + dx, q.y + q.w * 0.3);
        ctx.quadraticCurveTo(q.x + dx + (r() - 0.5) * 20, q.y + len * 0.5, q.x + dx + (r() - 0.5) * 12, q.y + q.w * 0.3 + len * (0.6 + r() * 0.4));
        ctx.stroke();
      }
    }
    const count = Math.floor(1100 * density);
    for (let i = 0; i < count; i++) {
      const q = pts[Math.floor(r() * N)];
      const top = r() < 0.78;
      const x = q.x + (r() - 0.5) * q.w * 1.2;
      const y = q.y + (top ? -q.w * (0.2 + r() * 0.55) : q.w * (0.2 + r() * 0.3));
      const s = H * (0.01 + r() * 0.018) * (0.7 + (q.w / (width * H)) * 0.5);
      const ang = top ? -Math.PI / 2 + (r() - 0.5) * 2.4 : Math.PI / 2 + (r() - 0.5) * 2;
      const color = top ? pick(r, leaves) : leaves[Math.floor(r() * 2)];
      if (r() < 0.3) frond(ctx, x, y, s * 1.9, ang, color);
      else leaf(ctx, x, y, s, ang, color);
    }
  },

  trunks(ctx, W, H, r, { count = 6, width = [0.02, 0.05], color = '#3d4a33', moss = '#6f8f3a', mossAlpha = 0.5, vines = 0, x = [0, 1] }) {
    const tops = [];
    for (let i = 0; i < count; i++) {
      const cx = lerp(x[0], x[1], (i + 0.1 + r() * 0.8) / count) * W;
      const w = lerp(width[0], width[1], r()) * W;
      const lean = (r() - 0.5) * 0.12 * W;
      const n = noise(r, 3);
      const L = [], R = [];
      for (let y = 0; y <= H + 8; y += 8) {
        const t = y / H;
        const xc = cx + lean * (1 - t) + n(t * 1.5) * w * 0.7;
        const ww = w * (0.75 + 0.35 * t) * (0.9 + 0.15 * n(t * 6 + 3));
        L.push([xc - ww / 2, y]);
        R.push([xc + ww / 2, y]);
      }
      ctx.beginPath();
      L.forEach(([px, py], k) => (k ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
      for (let k = R.length - 1; k >= 0; k--) ctx.lineTo(R[k][0], R[k][1]);
      ctx.closePath();
      const g = ctx.createLinearGradient(cx - w, 0, cx + w, 0);
      g.addColorStop(0, shade(color, -0.25));
      g.addColorStop(0.45, color);
      g.addColorStop(1, shade(color, -0.35));
      ctx.fillStyle = g;
      ctx.fill();
      for (let k = 0; k < 22; k++) {
        const idx = Math.floor(r() * (L.length - 1));
        const lx = L[idx][0], rx = R[idx][0], y = L[idx][1];
        ctx.fillStyle = hexA(moss, mossAlpha * (0.3 + r() * 0.7));
        ctx.beginPath();
        ctx.ellipse(lerp(lx, rx, r()), y, (rx - lx) * (0.15 + r() * 0.3), H * (0.01 + r() * 0.05), 0, 0, TAU);
        ctx.fill();
        if (r() < 0.4) leaf(ctx, r() < 0.5 ? lx : rx, y, H * 0.015, (r() < 0.5 ? Math.PI : 0) + (r() - 0.5), hexA(moss, mossAlpha));
      }
      tops.push([cx, w]);
    }
    ctx.strokeStyle = hexA(shade(color, -0.2), 0.8);
    for (let v = 0; v < vines; v++) {
      const a = pick(r, tops), b = pick(r, tops);
      const y1 = r() * H * 0.4, y2 = r() * H * 0.4;
      ctx.lineWidth = 1 + r() * 2.5;
      ctx.beginPath();
      ctx.moveTo(a[0], y1);
      ctx.quadraticCurveTo((a[0] + b[0]) / 2, Math.max(y1, y2) + H * (0.1 + r() * 0.3), b[0], y2);
      ctx.stroke();
    }
  },

  foliage(ctx, W, H, r, { y = 0.8, spread = 0.25, count = 400, size = 0.04, colors, x = [0, 1] }) {
    const items = [];
    for (let i = 0; i < count; i++) items.push({ x: lerp(x[0], x[1], r()) * W, y: (y + r() * spread) * H, s: size * H * (0.5 + r()), c: pick(r, colors), k: 4 + Math.floor(r() * 4) });
    items.sort((a, b) => a.y - b.y);
    for (const it of items) {
      for (let j = 0; j < it.k; j++) {
        const ang = -Math.PI / 2 + (j / (it.k - 1) - 0.5) * 2.6 + (r() - 0.5) * 0.3;
        leaf(ctx, it.x, it.y, it.s * (0.7 + r() * 0.5), ang, it.c);
      }
    }
  },

  water(ctx, W, H, r, { y, top, bottom, shimmer = '#ffffff', lines = 160, reflect }) {
    const y0 = y * H;
    const g = ctx.createLinearGradient(0, y0, 0, H);
    g.addColorStop(0, top);
    g.addColorStop(1, bottom);
    ctx.fillStyle = g;
    ctx.fillRect(0, y0, W, H - y0);
    ctx.lineCap = 'round';
    for (let i = 0; i < lines; i++) {
      const t = r() ** 1.6;
      const yy = y0 + t * (H - y0);
      const len = W * (0.02 + t * 0.12) * (0.3 + r());
      const x = r() * W;
      ctx.strokeStyle = hexA(shimmer, 0.04 + r() * 0.14);
      ctx.lineWidth = 1 + t * 2;
      ctx.beginPath();
      ctx.moveTo(x, yy);
      ctx.lineTo(x + len, yy);
      ctx.stroke();
    }
    if (reflect) {
      for (let i = 0; i < lines * 1.5; i++) {
        const t = r();
        const yy = y0 + t * (H - y0);
        const x = reflect.x * W + (r() - 0.5) * reflect.width * W * (0.4 + t * 1.4);
        const len = W * (0.008 + r() * 0.04) * (0.5 + t);
        ctx.strokeStyle = hexA(reflect.color, (0.15 + r() * 0.5) * (1 - t * 0.6));
        ctx.lineWidth = 1 + t * 2.5;
        ctx.beginPath();
        ctx.moveTo(x - len / 2, yy);
        ctx.lineTo(x + len / 2, yy);
        ctx.stroke();
      }
    }
  },

  aerial(ctx, W, H, r, {
    base = '#1d4320', crowns = ['#244f22', '#2f6a2a', '#3d7f30', '#4f8f36', '#62a03e'],
    river = ['#8fe0cc', '#46ab98'], bank = '#c2b98a', count = 3600,
  }) {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, W, H);
    const n = noise(r, 4), n2 = noise(r, 3);
    const cx = (y) => W * (0.56 + 0.3 * n((y / H) * 0.9));
    const hw = (y) => W * 0.04 * (0.75 + 0.5 * (n2((y / H) * 2) * 0.5 + 0.5)) * (0.6 + (0.7 * y) / H);
    const path = (pad) => {
      ctx.beginPath();
      for (let y = -20; y <= H + 20; y += 6) {
        const x = cx(y) - hw(y) - pad;
        y === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      for (let y = H + 20; y >= -20; y -= 6) ctx.lineTo(cx(y) + hw(y) + pad, y);
      ctx.closePath();
    };
    path(W * 0.006);
    ctx.fillStyle = bank;
    ctx.fill();
    path(0);
    const g = ctx.createLinearGradient(0, 0, W * 0.3, H);
    g.addColorStop(0, river[0]);
    g.addColorStop(1, river[1]);
    ctx.fillStyle = g;
    ctx.fill();
    const items = [];
    for (let i = 0; i < count; i++) {
      const x = r() * W, y = r() * H;
      const s = H * (0.008 + r() * 0.016) * (0.6 + (0.8 * y) / H);
      if (Math.abs(x - cx(y)) < hw(y) + s * 0.2) continue;
      items.push({ x, y, s });
    }
    items.sort((a, b) => a.y - b.y);
    for (const it of items) {
      const c = pick(r, crowns);
      ctx.fillStyle = shade(c, -0.4);
      circle(ctx, it.x + it.s * 0.15, it.y + it.s * 0.2, it.s);
      ctx.fillStyle = c;
      circle(ctx, it.x, it.y, it.s * 0.88);
      ctx.fillStyle = hexA('#d8f08a', 0.16);
      circle(ctx, it.x - it.s * 0.3, it.y - it.s * 0.3, it.s * 0.4);
    }
  },

  reeds(ctx, W, H, r, { count = 80, color, height = [0.15, 0.4], x = [0, 1] }) {
    ctx.fillStyle = color;
    for (let i = 0; i < count; i++) {
      const px = lerp(x[0], x[1], r()) * W;
      const h = lerp(height[0], height[1], r()) * H;
      const bend = (r() - 0.5) * 0.25 * h;
      const w = H * (0.003 + r() * 0.006);
      ctx.beginPath();
      ctx.moveTo(px - w, H);
      ctx.quadraticCurveTo(px, H - h * 0.6, px + bend, H - h);
      ctx.quadraticCurveTo(px + w * 0.4, H - h * 0.6, px + w, H);
      ctx.fill();
      if (r() < 0.12) {
        ctx.beginPath();
        ctx.ellipse(px + bend * 0.92, H - h * 0.95, w * 1.4, h * 0.06, bend / h, 0, TAU);
        ctx.fill();
      }
    }
  },

  bigLeaves(ctx, W, H, r, { items, colors }) {
    for (const [x, y, size, ang] of items) {
      const c = pick(r, colors);
      bigLeaf(ctx, x * W, y * H, size * H, ang, c, shade(c, 0.2));
    }
  },

  stalk(ctx, W, H, r, { x, w, color }) {
    const cx = x * W, ww = w * W;
    const g = ctx.createLinearGradient(cx - ww, 0, cx + ww, 0);
    g.addColorStop(0, shade(color, -0.3));
    g.addColorStop(0.4, shade(color, 0.25));
    g.addColorStop(1, shade(color, -0.4));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(cx - ww / 2, H);
    ctx.quadraticCurveTo(cx - ww * 0.8, H * 0.5, cx - ww * 0.2, 0);
    ctx.lineTo(cx + ww * 0.6, 0);
    ctx.quadraticCurveTo(cx + ww * 0.1, H * 0.5, cx + ww / 2, H);
    ctx.fill();
  },

  // An original, stylised tree frog resting on a leaf, facing right.
  frog(ctx, W, H, r, { x, y, s }) {
    const S = s * H;
    ctx.save();
    ctx.translate(x * W, y * H);

    ctx.strokeStyle = '#2f5a1f';
    ctx.lineWidth = S * 0.12;
    ctx.beginPath();
    ctx.moveTo(S * 2.4, S * 0.6);
    ctx.quadraticCurveTo(S * 3.4, S * 1.6, S * 3.6, S * 5);
    ctx.stroke();

    const lg = ctx.createLinearGradient(0, -S * 0.2, 0, S * 1.4);
    lg.addColorStop(0, '#7bbd45');
    lg.addColorStop(1, '#2d6a22');
    ctx.fillStyle = lg;
    ctx.beginPath();
    ctx.moveTo(-S * 2.8, S * 0.9);
    ctx.bezierCurveTo(-S * 1.4, -S * 0.05, S * 1.6, -S * 0.05, S * 2.8, S * 0.55);
    ctx.bezierCurveTo(S * 1.4, S * 1.4, -S * 1.2, S * 1.5, -S * 2.8, S * 0.9);
    ctx.fill();
    ctx.strokeStyle = hexA('#c8eb8a', 0.6);
    ctx.lineWidth = S * 0.03;
    ctx.beginPath();
    ctx.moveTo(-S * 2.7, S * 0.9);
    ctx.quadraticCurveTo(0, S * 0.5, S * 2.7, S * 0.58);
    ctx.stroke();
    for (let i = -4; i <= 4; i++) {
      const vx = i * S * 0.55;
      ctx.beginPath();
      ctx.moveTo(vx, S * 0.62);
      ctx.quadraticCurveTo(vx + S * 0.2, S * 0.4, vx + S * 0.45, S * 0.3);
      ctx.moveTo(vx, S * 0.62);
      ctx.quadraticCurveTo(vx + S * 0.2, S * 0.85, vx + S * 0.45, S * 1.0);
      ctx.stroke();
    }

    const body = '#6fd04a', dark = '#3c9a2c', toe = '#ff8a2a';
    const ell = (ex, ey, rx, ry, rot, fill) => { ctx.fillStyle = fill; ctx.beginPath(); ctx.ellipse(ex, ey, rx, ry, rot, 0, TAU); ctx.fill(); };

    ell(-S * 0.55, S * 0.3, S * 0.6, S * 0.28, -0.25, dark);
    ell(S * 0.38, -S * 0.5, S * 0.19, S * 0.19, 0, dark);
    ell(S * 0.38, -S * 0.5, S * 0.13, S * 0.13, 0, '#c8221a');

    const bg = ctx.createLinearGradient(0, -S * 0.6, 0, S * 0.5);
    bg.addColorStop(0, '#9be86a');
    bg.addColorStop(1, body);
    ell(0, 0, S * 0.85, S * 0.52, -0.12, bg);
    ell(S * 0.65, -S * 0.2, S * 0.5, S * 0.36, -0.1, bg);
    ell(S * 0.2, S * 0.28, S * 0.6, S * 0.2, -0.05, '#e9f5c8');
    ctx.strokeStyle = hexA('#2f7fd0', 0.55);
    ctx.lineWidth = S * 0.06;
    ctx.beginPath();
    ctx.moveTo(-S * 0.6, S * 0.12);
    ctx.quadraticCurveTo(-S * 0.1, S * 0.2, S * 0.3, S * 0.12);
    ctx.stroke();

    ell(-S * 0.25, S * 0.42, S * 0.4, S * 0.13, 0.2, body);
    ctx.fillStyle = toe;
    for (let k = 0; k < 3; k++) circle(ctx, S * (0.08 + k * 0.12), S * (0.55 + k * 0.02), S * 0.06);
    ell(S * 0.75, S * 0.28, S * 0.1, S * 0.26, -0.3, body);
    ctx.fillStyle = toe;
    for (let k = 0; k < 3; k++) circle(ctx, S * (0.78 + k * 0.12), S * (0.52 - k * 0.03), S * 0.06);

    ell(S * 0.75, -S * 0.5, S * 0.24, S * 0.24, 0, body);
    ell(S * 0.77, -S * 0.51, S * 0.18, S * 0.18, 0, '#e2281c');
    ell(S * 0.77, -S * 0.51, S * 0.035, S * 0.13, 0, '#0b0b0b');
    ell(S * 0.72, -S * 0.58, S * 0.04, S * 0.04, 0, '#ffffff');

    ctx.strokeStyle = hexA('#2d6a22', 0.7);
    ctx.lineWidth = S * 0.03;
    ctx.beginPath();
    ctx.moveTo(S * 0.75, -S * 0.08);
    ctx.quadraticCurveTo(S * 0.98, -S * 0.06, S * 1.12, -S * 0.2);
    ctx.stroke();
    ctx.restore();
  },
};

// ---------------------------------------------------------------- dynamic layers
function sprite(color, size = 128, falloff = [0, 0.4, 1]) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(falloff[0], hexA(color, 1));
  g.addColorStop(falloff[1], hexA(color, 0.35));
  g.addColorStop(falloff[2], hexA(color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

const DYN = {
  mist(r, { color = '#ffffff', alpha = 0.4, count = 7, y = [0.3, 0.8], size = [0.3, 0.6], speed = 0.005 }) {
    const img = sprite(color, 256);
    const items = Array.from({ length: count }, () => ({
      x: r() * 1.6, y: lerp(y[0], y[1], r()), s: lerp(size[0], size[1], r()),
      v: speed * (0.4 + r()) * (r() < 0.5 ? -1 : 1),
    }));
    return (ctx, W, H, t, ox, oy) => {
      ctx.globalAlpha = alpha;
      for (const it of items) {
        const x = ((((it.x + t * it.v) % 1.6) + 1.6) % 1.6 - 0.3) * W + ox;
        const w = it.s * W * 2, h = it.s * W * 0.7;
        ctx.drawImage(img, x - w / 2, it.y * H - h / 2 + oy, w, h);
      }
      ctx.globalAlpha = 1;
    };
  },

  particles(r, { type = 'mote', count = 60, color = '#ffffff', size = 1.4, area = [0, 0, 1, 1] }) {
    const glowImg = sprite(color, 64, [0, 0.15, 1]);
    const items = Array.from({ length: count }, () => ({
      x: lerp(area[0], area[2], r()), y: lerp(area[1], area[3], r()),
      s: size * (0.5 + r()), p: r() * TAU, f: 0.3 + r() * 1.2,
      vx: (r() - 0.5) * 0.004, vy: -0.002 - r() * 0.006,
    }));
    return (ctx, W, H, t, ox, oy) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const it of items) {
        let x, y, a;
        if (type === 'firefly') {
          x = it.x + Math.sin(t * it.f * 0.4 + it.p) * 0.03;
          y = it.y + Math.cos(t * it.f * 0.3 + it.p * 2) * 0.03;
          a = Math.max(0, Math.sin(t * it.f + it.p)) ** 3;
        } else {
          x = it.x + it.vx * t + Math.sin(t * it.f * 0.5 + it.p) * 0.01;
          y = ((((it.y + it.vy * t) % 1) + 1) % 1);
          x = ((x % 1) + 1) % 1;
          a = 0.25 + 0.6 * (Math.sin(t * it.f + it.p) * 0.5 + 0.5);
        }
        const px = x * W + ox, py = y * H + oy;
        const g = it.s * (type === 'firefly' ? 14 : 6);
        ctx.globalAlpha = a * (type === 'firefly' ? 0.9 : 0.5);
        ctx.drawImage(glowImg, px - g / 2, py - g / 2, g, g);
      }
      ctx.restore();
    };
  },

  birds(r, { count = 8, color = '#1a1020', y = [0.2, 0.5], size = 10 }) {
    const items = Array.from({ length: count }, () => ({
      x: r() * 1.3, y: lerp(y[0], y[1], r()), s: size * (0.6 + r() * 0.8),
      v: 0.008 + r() * 0.01, p: r() * TAU, f: 5 + r() * 3,
    }));
    return (ctx, W, H, t, ox, oy) => {
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
      for (const it of items) {
        const x = ((it.x + t * it.v) % 1.3 - 0.15) * W + ox;
        const y = (it.y + Math.sin(t * 0.4 + it.p) * 0.01) * H + oy;
        const wing = Math.sin(t * it.f + it.p);
        const s = it.s;
        ctx.lineWidth = Math.max(1, s * 0.16);
        ctx.beginPath();
        ctx.moveTo(x - s, y - wing * s * 0.6);
        ctx.quadraticCurveTo(x - s * 0.4, y - s * 0.25 * (1 + wing), x, y);
        ctx.quadraticCurveTo(x + s * 0.4, y - s * 0.25 * (1 + wing), x + s, y - wing * s * 0.6);
        ctx.stroke();
      }
    };
  },

  rays(r, { color = '#fffbe0', count = 5, alpha = 0.18 }) {
    const items = Array.from({ length: count }, () => ({ x: 0.2 + r() * 0.8, w: 0.03 + r() * 0.08, p: r() * TAU, f: 0.2 + r() * 0.3 }));
    return (ctx, W, H, t, ox) => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (const it of items) {
        const a = alpha * (0.4 + 0.6 * (Math.sin(t * it.f + it.p) * 0.5 + 0.5));
        const x = it.x * W + ox;
        const g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, hexA(color, a));
        g.addColorStop(1, hexA(color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(x, -10);
        ctx.lineTo(x + it.w * W, -10);
        ctx.lineTo(x + it.w * W * 2.5 - W * 0.35, H);
        ctx.lineTo(x - W * 0.35, H);
        ctx.fill();
      }
      ctx.restore();
    };
  },
};

// ---------------------------------------------------------------- blur
const FILTER_BLUR = (() => {
  try {
    const c = document.createElement('canvas');
    c.width = c.height = 12;
    const x = c.getContext('2d');
    x.filter = 'blur(2px)';
    x.fillStyle = '#fff';
    x.fillRect(5, 5, 2, 2);
    return x.getImageData(2, 5, 1, 1).data[3] > 0;
  } catch {
    return false;
  }
})();

function blurCanvas(c, radius) {
  const tmp = document.createElement('canvas');
  tmp.width = c.width;
  tmp.height = c.height;
  const t = tmp.getContext('2d');
  if (FILTER_BLUR) {
    t.filter = `blur(${radius}px)`;
    t.drawImage(c, 0, 0);
  } else {
    const f = Math.max(0.04, Math.min(1, 1.5 / radius));
    const s = document.createElement('canvas');
    s.width = Math.max(1, Math.round(c.width * f));
    s.height = Math.max(1, Math.round(c.height * f));
    const sx = s.getContext('2d');
    sx.imageSmoothingQuality = 'high';
    sx.drawImage(c, 0, 0, s.width, s.height);
    t.imageSmoothingQuality = 'high';
    t.drawImage(s, 0, 0, c.width, c.height);
  }
  const cx = c.getContext('2d');
  cx.setTransform(1, 0, 0, 1, 0, 0);
  cx.clearRect(0, 0, c.width, c.height);
  cx.drawImage(tmp, 0, 0);
}

// ---------------------------------------------------------------- Scene
export class Scene {
  constructor(layers, seed) {
    this.defs = layers;
    this.seed = seed;
    this.layers = null;
  }

  get stepCount() {
    return this.defs.length;
  }

  *build(W, H, dpr) {
    this.dispose();
    const layers = [];
    this.pending = layers;
    const LW = W * (1 + 2 * OVERSCAN), LH = H * (1 + 2 * OVERSCAN);
    for (let i = 0; i < this.defs.length; i++) {
      const def = this.defs[i];
      const r = rng(this.seed + i * 977);
      if (def.dyn) {
        layers.push({ depth: def.depth, draw: DYN[def.dyn](r, def) });
      } else {
        const res = (def.res ?? 1) * dpr;
        const c = document.createElement('canvas');
        c.width = Math.ceil(LW * res);
        c.height = Math.ceil(LH * res);
        const ctx = c.getContext('2d');
        ctx.scale(res, res);
        for (const [name, opts] of def.ops) P[name](ctx, LW, LH, r, W < H && opts.portrait ? { ...opts, ...opts.portrait } : opts);
        if (def.blur) blurCanvas(c, def.blur * res);
        layers.push({ depth: def.depth, canvas: c, LW, LH });
      }
      yield i;
      if (this.pending !== layers) return;
    }
    this.pending = null;
    this.layers = layers;
  }

  buildSync(W, H, dpr) {
    for (const _ of this.build(W, H, dpr));
  }

  dispose() {
    this.pending = null;
    if (!this.layers) return;
    for (const l of this.layers) if (l.canvas) l.canvas.width = l.canvas.height = 0;
    this.layers = null;
  }

  static offset(depth, mx, my, shift) {
    return [(-mx * MAX_PARALLAX + shift) * depth, -my * MAX_PARALLAX * 0.6 * depth];
  }

  // Screen position of a point given in layer coordinates.
  static project(W, H, [x, y], depth, mx, my, shift, zoom) {
    const [ox, oy] = Scene.offset(depth, mx, my, shift);
    const sx = (-OVERSCAN + x * (1 + 2 * OVERSCAN)) * W + ox;
    const sy = (-OVERSCAN + y * (1 + 2 * OVERSCAN)) * H + oy;
    return [W / 2 + (sx - W / 2) * zoom, H / 2 + (sy - H / 2) * zoom];
  }

  draw(ctx, W, H, dpr, t, mx, my, shift, zoom) {
    if (!this.layers) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.translate(W / 2, H / 2);
    ctx.scale(zoom, zoom);
    ctx.translate(-W / 2, -H / 2);
    for (const l of this.layers) {
      const [ox, oy] = Scene.offset(l.depth, mx, my, shift);
      if (l.canvas) ctx.drawImage(l.canvas, -OVERSCAN * W + ox, -OVERSCAN * H + oy, l.LW, l.LH);
      else l.draw(ctx, W, H, t, ox, oy);
    }
  }
}
