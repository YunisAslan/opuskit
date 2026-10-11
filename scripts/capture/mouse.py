# Moves the real macOS pointer like a hand, so hover is real and Cap records the Mac's own cursor.
# python mouse.py '{"points": [[x, y], ...], "seconds": 3, "press": "click" | "drag"}'   — one move; or, with no
# argument, one such JSON per line on stdin, answering "ok" after each (no start-up pause between moves).
# Points are screen points. A long hop between two points is one quick aimed move (fast start, slow landing, a slight
# arc, a small overshoot it corrects); runs of short hops are one continuous glide through them. `seconds` is only a
# hint for a glide; a hand sets its own pace (Fitts). press "click": a click where the path ends; "drag": the button
# held down for the whole path. Needs Accessibility for the terminal (System Settings → Privacy & Security).
# A robotic pointer (even speed, straight lines, every stop dead still) read as fake (the user, 2026-10-10).
import json, math, random, sys, time
import Quartz as Q

HZ = 120
move_kind, slow = Q.kCGEventMouseMoved, 1.0

def post(kind, x, y):
    Q.CGEventPost(Q.kCGHIDEventTap, Q.CGEventCreateMouseEvent(None, kind, (x, y), Q.kCGMouseButtonLeft))

# A hand's small unsteadiness: two slow waves per axis, under a point.
ph = [random.uniform(0, 6.3) for _ in range(4)]
def tremor(t):
    return (0.45 * math.sin(7.1 * t + ph[0]) + 0.25 * math.sin(13.3 * t + ph[1]), 0.45 * math.sin(6.3 * t + ph[2]) + 0.25 * math.sin(11.7 * t + ph[3]))

def run(path, duration):
    """path(u) for u in 0…1 is walked over `duration` seconds, minimum-jerk in time (how arms move)."""
    n = max(2, int(duration * HZ))
    t0 = time.perf_counter()
    for k in range(n + 1):
        u = k / n
        u = u ** 3 * (10 - 15 * u + 6 * u * u)
        x, y = path(u)
        jx, jy = tremor(time.perf_counter())
        post(move_kind, x + jx, y + jy)
        target = t0 + duration * k / n
        while time.perf_counter() < target: time.sleep(0.0004)

def fitts(d):
    return (0.16 + 0.1 * math.log2(1 + d / 10)) * slow * random.uniform(0.92, 1.08)

def aimed(a, b):
    """One aimed move: a slight arc to one side, landing a few points past the target, then the correction."""
    d = math.dist(a, b)
    nx, ny = (-(b[1] - a[1]) / d, (b[0] - a[0]) / d) if d else (0, 0)
    bend = random.uniform(0.05, 0.12) * d * random.choice((-1, 1))
    over = random.uniform(0.02, 0.05) * d if d > 160 else 0
    land = (b[0] + (b[0] - a[0]) / d * over, b[1] + (b[1] - a[1]) / d * over) if over else b
    c = ((a[0] + land[0]) / 2 + nx * bend, (a[1] + land[1]) / 2 + ny * bend)
    run(lambda u: ((1 - u) ** 2 * a[0] + 2 * (1 - u) * u * c[0] + u * u * land[0], (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * c[1] + u * u * land[1]), fitts(d))
    if over:
        run(lambda u: (land[0] + (b[0] - land[0]) * u, land[1] + (b[1] - land[1]) * u), random.uniform(0.11, 0.16))

def cr(p0, p1, p2, p3, t):
    return tuple(0.5 * ((2 * p1[i]) + (-p0[i] + p2[i]) * t + (2 * p0[i] - 5 * p1[i] + 4 * p2[i] - p3[i]) * t * t + (-p0[i] + 3 * p1[i] - 3 * p2[i] + p3[i]) * t ** 3) for i in range(2))

def glide(run_pts, hint):
    """Short hops as one smooth stroke through them (Catmull-Rom), at a hand's speed for its length."""
    P = [run_pts[0]] + run_pts + [run_pts[-1]]
    segs = len(run_pts) - 1
    def at(u):
        s = min(segs - 1, int(u * segs)); t = u * segs - s
        return cr(P[s], P[s + 1], P[s + 2], P[s + 3], t)
    length = sum(math.dist(run_pts[i], run_pts[i + 1]) for i in range(segs))
    run(at, max(0.35, min(hint, length / 420)) * slow)

def gesture(spec):
    global move_kind, slow
    pts, secs, press = [tuple(p) for p in spec['points']], spec.get('seconds', 1), spec.get('press')
    # From wherever the pointer is: a hand never jumps.
    here = Q.CGEventGetLocation(Q.CGEventCreate(None)); here = (here.x, here.y)
    if math.dist(here, pts[0]) > 2 and press != 'drag': pts = [here] + pts
    move_kind = Q.kCGEventLeftMouseDragged if press == 'drag' else Q.kCGEventMouseMoved
    slow = 1.35 if press == 'drag' else 1.0  # a held button moves more carefully
    if press == 'drag':
        post(Q.kCGEventLeftMouseDown, *pts[0]); time.sleep(random.uniform(0.12, 0.18))
    if len(pts) == 1 or all(p == pts[0] for p in pts):
        time.sleep(min(secs, 0.3))
    else:
        # Split the path: hops longer than LONG are aimed moves, the rest glide.
        LONG = 150
        i, legs = 0, []
        while i < len(pts) - 1:
            if math.dist(pts[i], pts[i + 1]) > LONG:
                legs.append(('aim', [pts[i], pts[i + 1]])); i += 1
            else:
                j = i + 1
                while j < len(pts) - 1 and math.dist(pts[j], pts[j + 1]) <= LONG: j += 1
                legs.append(('glide', pts[i:j + 1])); i = j
        glides = sum(1 for k, _ in legs if k == 'glide') or 1
        for k, leg in legs:
            aimed(*leg) if k == 'aim' else glide(leg, secs / glides)
            if k == 'aim' and leg is not legs[-1][1]: time.sleep(random.uniform(0.04, 0.1))
    if press == 'drag':
        time.sleep(random.uniform(0.08, 0.14)); post(Q.kCGEventLeftMouseUp, *pts[-1])
    if press == 'click':
        time.sleep(random.uniform(0.1, 0.2)); post(Q.kCGEventLeftMouseDown, *pts[-1]); time.sleep(random.uniform(0.07, 0.11)); post(Q.kCGEventLeftMouseUp, *pts[-1])

if len(sys.argv) > 1:
    gesture(json.loads(sys.argv[1]))
else:
    for line in sys.stdin:
        if line.strip(): gesture(json.loads(line)); print('ok', flush=True)
