/* ============================================================
   Qiskit Fall Fest 2026 — BITS Pilani edition
   ============================================================ */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── tabs ──────────────────────────────────────────────── */

const TABS = ['home', 'about', 'schedule', 'hackathon', 'join'];

function showTab(name, fromHash) {
  if (!TABS.includes(name)) name = 'home';
  if (!fromHash) {
    history.replaceState(null, '', name === 'home' ? '#' : '#' + name);
  }
  document.querySelectorAll('.tab-panel').forEach(p => {
    p.classList.toggle('is-active', p.id === 'tab-' + name);
  });
  document.querySelectorAll('.tab').forEach(t => {
    const on = t.dataset.tab === name;
    t.classList.toggle('is-active', on);
    t.setAttribute('aria-current', on ? 'page' : 'false');
  });
  document.getElementById('tabs').classList.remove('is-open');
  document.title = name === 'home'
    ? 'Qiskit Fall Fest 2026 — BITS Pilani, with IBM Quantum'
    : name.charAt(0).toUpperCase() + name.slice(1) +
      ' — Qiskit Fall Fest 2026, BITS Pilani';
  document.getElementById('menuToggle').setAttribute('aria-expanded', 'false');
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  flockRunning = (name === 'home');
  if (flockRunning && !reduceMotion) requestAnimationFrame(step);
}

function toggleMenu() {
  const tabs = document.getElementById('tabs');
  const btn = document.getElementById('menuToggle');
  const open = tabs.classList.toggle('is-open');
  btn.setAttribute('aria-expanded', String(open));
}

/* ── registration ──────────────────────────────────────── */

function register(e) {
  e.preventDefault();
  const input = document.getElementById('email');
  const note = document.getElementById('formNote');
  const value = input.value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    note.dataset.state = 'error';
    note.textContent = 'That does not look like an email address. Check and try again.';
    return false;
  }

  note.dataset.state = 'ok';
  note.textContent = 'Registered. Look for the Intro to Qiskit notebook before 21 October.';
  input.value = '';
  return false;
}

/* ── schedule ──────────────────────────────────────────────
   Source of truth: organiser timetable, 21–28 October 2026.
   `h` is teaching hours; bar widths are drawn against the
   heaviest day (6 h) so days are comparable to each other.
   ───────────────────────────────────────────────────────── */

const SCHEDULE = [
  { date: '21 Oct', day: 'Wed', sessions: [
    { name: 'Orientation',                     h: 0.75, kind: 'milestone' },
    { name: 'Intro to quantum computing I',    h: 2,    kind: 'lecture', short: 'Intro to QC I'   } ] },
  { date: '22 Oct', day: 'Thu', sessions: [
    { name: 'Intro to quantum computing II',   h: 1,    kind: 'lecture', short: 'Intro to QC II'  },
    { name: 'BITS faculty lecture',            h: 2,    kind: 'guest'     } ] },
  { date: '23 Oct', day: 'Fri', sessions: [
    { name: 'Intro to quantum computing III',  h: 3,    kind: 'lecture', short: 'Intro to QC III' } ] },
  { date: '24 Oct', day: 'Sat', sessions: [
    { name: 'Algorithms & variational circuits', h: 2,  kind: 'lecture', short: 'Algorithms & VQC' },
    { name: 'Intro to QML',                    h: 2,    kind: 'lecture'   },
    { name: 'Guest lecture',                   h: 2,    kind: 'guest'     } ] },
  { date: '25 Oct', day: 'Sun', sessions: [
    { name: 'QML workshop',                    h: 3,    kind: 'workshop'  },
    { name: 'Guest lecture',                   h: 1,    kind: 'guest'     },
    { name: 'Hackathon briefing',              h: 1,    kind: 'milestone' } ] },
  { date: '26 Oct', day: 'Mon', sessions: [
    { name: 'Intro to cryptography',           h: 1.5,  kind: 'lecture'   },
    { name: 'QKD workshop',                    h: 1.5,  kind: 'workshop'  } ] },
  { date: '27 Oct', day: 'Tue', sessions: [
    { name: 'Intro to photonics',              h: 1.5,  kind: 'lecture'   },
    { name: 'Guest lecture',                   h: 1.5,  kind: 'guest'     } ] },
  { date: '28 Oct', day: 'Wed', sessions: [
    { name: 'Wrap-up & results',               h: 1,    kind: 'milestone' } ] },
];

const SCALE_HOURS = Math.max(...SCHEDULE.map(d => d.sessions.reduce((s, x) => s + x.h, 0)));

function hoursLabel(h) {
  return h < 1 ? `${Math.round(h * 60)} min` : `${h} h`;
}

function renderSchedule() {
  const list = document.getElementById('days');
  if (!list) return;
  list.innerHTML = SCHEDULE.map((d, i) => `
    <li class="day">
      <span class="day-n">Day ${i + 1}</span>
      <span class="day-date"><b>${d.date}</b><span>${d.day}</span></span>
      <div class="day-bar">
        ${d.sessions.map(s => `
          <div class="block" data-kind="${s.kind}"
               style="flex: 0 1 ${(s.h / SCALE_HOURS * 100).toFixed(2)}%"
               title="${s.name} — ${hoursLabel(s.h)}">
            <span class="block-name">${s.short || s.name}</span>
            <span class="block-hrs">${hoursLabel(s.h)}</span>
          </div>`).join('')}
      </div>
    </li>`).join('');
}


/* ── the flock: a superposition of flight paths ─────────────
   A bird here is not one bird. Each carries BRANCHES paths it
   might be flying, and they breathe: converging to a single
   point, fanning apart, converging again — so the trails draw
   the branch point over and over. The pointer is a measurement
   gate: whichever path is nearest the cursor is the one that
   happened, so the others fold onto it and it draws solid.
   Move away and the bird decoheres back into a fan.
   ───────────────────────────────────────────────────────── */

const canvas = document.getElementById('flock');
const ctx = canvas.getContext('2d');

const INK     = '49, 19, 94';
const PURPLE  = '139, 63, 252';
const MAGENTA = '238, 83, 150';

const N_BIRDS  = 15;
const BRANCHES = 3;     // paths held in superposition per bird
const TRAIL    = 56;
const GATE_R   = 160;
const FAN_MAX  = 56;    // px of lateral spread at full divergence
const TRACK    = 0.14;  // how tightly a path tracks its target offset

let W = 0, H = 0, birds = [], flockRunning = true, last = 0;
const pointer = { x: -9999, y: -9999, live: false };

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  W = rect.width; H = rect.height;
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function seed() {
  birds = [];
  for (let i = 0; i < N_BIRDS; i++) {
    const b = {
      // the core is the bird's expectation value: it does the flocking,
      // and the branches hang off it.
      x: ((i * 173) % 100) / 100 * W + (Math.random() - 0.5) * 40,
      y: H * 0.05 + ((i * 57) % 100) / 100 * H * 0.55 + (Math.random() - 0.5) * 30,
      vx: 0.95 + Math.random() * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      z: 0.66 + Math.random() * 0.72,
      phase: Math.random() * Math.PI * 2,
      flap: 0.13 + Math.random() * 0.07,
      measured: 0,
      chosen: (BRANCHES - 1) >> 1,
      // each bird breathes on its own clock, so the flock never
      // converges in unison
      cyc: 0.00072 + Math.random() * 0.00058,
      cycP: Math.random() * Math.PI * 2,
      branches: [],
    };
    for (let k = 0; k < BRANCHES; k++) {
      b.branches.push({
        // a symmetric fan reads as alternatives; random scatter reads as noise
        fan: k - (BRANCHES - 1) / 2,
        x: b.x, y: b.y, px: b.x - b.vx, py: b.y - b.vy,
        trail: [],
        w: 0.00055 + Math.random() * 0.00045,
        p: Math.random() * Math.PI * 2,
      });
    }
    birds.push(b);
  }
}

function pushTrail(s, cut) {
  s.trail.push({ x: s.x, y: s.y, cut: !!cut });
  if (s.trail.length > TRAIL) s.trail.shift();
}

/* Wrapping moves the whole bird, branches included — otherwise one
   path crosses the edge and the fan tears across the sky. */
function wrapBird(b) {
  let ox = 0, oy = 0;
  if (b.x > W + 70) ox = -(W + 140);
  else if (b.x < -70) ox = W + 140;
  if (b.y > H + 70) oy = -(H + 140);
  else if (b.y < -70) oy = H + 140;
  if (!ox && !oy) return false;
  b.x += ox; b.y += oy;
  for (const s of b.branches) { s.x += ox; s.y += oy; s.px += ox; s.py += oy; }
  return true;   // caller marks the next trail point as a cut
}

function flockForces(b) {
  let ax = 0, ay = 0, sx = 0, sy = 0, cx = 0, cy = 0, n = 0;
  const NEAR = 250, PERSONAL = 155;
  for (const o of birds) {
    if (o === b) continue;
    const dx = o.x - b.x, dy = o.y - b.y;
    const d2 = dx * dx + dy * dy;
    if (d2 > NEAR * NEAR || d2 === 0) continue;
    const d = Math.sqrt(d2);
    n++;
    cx += o.x; cy += o.y;
    ax += o.vx; ay += o.vy;
    if (d < PERSONAL) {
      const f = (1 - d / PERSONAL) * 0.05;
      sx -= dx / d * f;
      sy -= dy / d * f;
    }
  }
  if (n) {
    cx = (cx / n - b.x) * 0.00016;
    cy = (cy / n - b.y) * 0.00030;
    ax = (ax / n - b.vx) * 0.020;
    ay = (ay / n - b.vy) * 0.020;
  }
  return { fx: cx + ax + sx, fy: cy + ay + sy };
}

function advanceCore(b, fx, fy, t) {
  // a steady glide to the right, plus a slow thermal wander
  b.vx += fx + 0.009;
  b.vy += fy + Math.sin(t * 0.0004 + b.phase) * 0.005;
  // altitude preference: the flock rides the upper sky
  b.vy += (H * 0.30 - b.y) * 0.00004;

  const sp = Math.hypot(b.vx, b.vy) || 1;
  const eased = Math.min(Math.max(sp * 0.88 + 0.126, 0.8), 1.6);
  b.vx = b.vx / sp * eased;
  b.vy = b.vy / sp * eased;

  b.x += b.vx; b.y += b.vy;
}

/* Legibility mask: the hero copy occupies the lower-left of the sky.
   Birds still fly through it — they just go quiet there. */
function clarity(b) {
  const right = W * 0.62, top = H * 0.24, soft = 110;
  const d = Math.min((right - b.x) / soft, (b.y - top) / soft);
  if (d <= 0) return 1;
  if (d >= 1) return 0.10;
  return 1 - 0.90 * (d * d * (3 - 2 * d));
}

/* One stroke per fade band rather than one per segment: same taper,
   far fewer draw calls, which matters with 15 birds x 3 paths. */
const BANDS = 4;

function drawTrail(s, rgb, alpha, width) {
  const n = s.trail.length;
  if (n < 3 || alpha <= 0.004) return;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const per = Math.ceil(n / BANDS);

  for (let band = 0; band < BANDS; band++) {
    const from = band * per;
    const to = Math.min(n - 1, from + per);
    if (to - from < 1) continue;
    const f = (band + 1) / BANDS;
    ctx.strokeStyle = `rgba(${rgb}, ${(alpha * f * f).toFixed(3)})`;
    ctx.lineWidth = width * (0.45 + 0.55 * f);
    ctx.beginPath();
    let open = false;
    for (let i = from; i <= to; i++) {
      const pt = s.trail[i];
      if (pt.cut) { open = false; continue; }
      if (!open) { ctx.moveTo(pt.x, pt.y); open = true; }
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();
  }
}

function drawBird(s, scale, rgb, alpha, spread) {
  if (alpha <= 0.012) return;
  const dx = s.x - s.px, dy = s.y - s.py;
  const ang = Math.max(-0.62, Math.min(0.62, Math.atan2(dy, dx)));
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.rotate(ang);
  ctx.scale(scale, scale);
  ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
  ctx.beginPath();
  ctx.moveTo(2.6, 0);
  ctx.quadraticCurveTo(0.4, -spread * 0.42, -5.6, -spread);
  ctx.quadraticCurveTo(-2.4, -spread * 0.26, -1.2, 0);
  ctx.quadraticCurveTo(-2.4, spread * 0.26, -5.6, spread);
  ctx.quadraticCurveTo(0.4, spread * 0.42, 2.6, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function frame(t, dt) {
  ctx.clearRect(0, 0, W, H);

  for (const b of birds) {
    const near = pointer.live &&
      Math.hypot(b.x - pointer.x, b.y - pointer.y) < GATE_R;

    // on the leading edge of measurement, the path nearest the cursor
    // is the one that turns out to have happened
    if (near && b.measured < 0.03) {
      let best = b.chosen, bd = Infinity;
      for (let k = 0; k < b.branches.length; k++) {
        const d = Math.hypot(b.branches[k].x - pointer.x,
                             b.branches[k].y - pointer.y);
        if (d < bd) { bd = d; best = k; }
      }
      b.chosen = best;
    }
    b.measured += ((near ? 1 : 0) - b.measured) * (near ? 0.09 : 0.012);

    const cut = wrapBird(b);
    const { fx, fy } = flockForces(b);
    advanceCore(b, fx, fy, t);

    // 0 = the paths are one, 1 = fully fanned. Passing through zero is
    // what draws the branch point.
    b.open = Math.pow(0.5 - 0.5 * Math.cos(t * b.cyc + b.cycP), 1.35);

    const sp = Math.hypot(b.vx, b.vy) || 1;
    const nx = -b.vy / sp, ny = b.vx / sp;   // unit normal to the heading
    const width = FAN_MAX * b.open;
    const m = b.measured;
    const winFan = b.branches[b.chosen].fan;

    for (const s of b.branches) {
      // a measured bird has one history: every path takes the winner's offset
      const fan = s.fan * (1 - m) + winFan * m;
      const wob = 1 + 0.14 * Math.sin(t * s.w + s.p);
      const lat = fan * width * wob;
      const lon = fan * width * 0.30;        // stagger the heads along the heading too

      // Ease onto the target offset rather than snapping to it. Snapping
      // makes the geometry visible as kinks in the trail; easing turns the
      // same motion into arcs.
      const tx = b.x + nx * lat + (b.vx / sp) * lon;
      const ty = b.y + ny * lat + (b.vy / sp) * lon;
      s.px = s.x; s.py = s.y;
      s.x += (tx - s.x) * TRACK;
      s.y += (ty - s.y) * TRACK;
      pushTrail(s, cut);
    }
  }

  // paths first, so a collapsed one reads on top of its alternatives
  for (const b of birds) {
    const cl = clarity(b), depth = 0.68 + b.z * 0.32;
    for (let k = 0; k < b.branches.length; k++) {
      const won = k === b.chosen;
      const a = won ? 0.24 + b.measured * 0.48 : 0.24 * (1 - b.measured);
      drawTrail(b.branches[k],
        won && b.measured > 0.35 ? MAGENTA : PURPLE,
        a * cl * depth, won ? 1.5 : 1);
    }
  }

  for (const b of birds) {
    const cl = clarity(b), depth = 0.7 + b.z * 0.3;
    const spread = 5.6 + Math.sin(t * b.flap * 0.012 + b.phase) * 3.4;
    for (let k = 0; k < b.branches.length; k++) {
      const won = k === b.chosen;
      // converged paths stack, so keep each one light enough that three
      // on top of each other read as a single bird
      const a = won ? 0.34 + b.measured * 0.60 : 0.34 * (1 - b.measured);
      drawBird(b.branches[k], b.z * 2.5 * (won ? 1 : 0.94),
        won && b.measured > 0.4 ? MAGENTA : INK,
        a * cl * depth, spread);
    }
  }
}


function step(now) {
  if (!flockRunning || reduceMotion) return;
  const dt = Math.min(now - last, 48) || 16;
  last = now;
  frame(now, dt);
  requestAnimationFrame(step);
}

/* ── pointer ───────────────────────────────────────────── */

function trackPointer(e) {
  const r = canvas.getBoundingClientRect();
  const src = e.touches ? e.touches[0] : e;
  pointer.x = src.clientX - r.left;
  pointer.y = src.clientY - r.top;
  pointer.live = pointer.x > 0 && pointer.x < r.width &&
                 pointer.y > 0 && pointer.y < r.height;
}

/* ── boot ──────────────────────────────────────────────── */

/* Run the simulation silently before the first paint, so the sky opens on a
   flock already in flight with trails behind it rather than a blank field. */
function warmUp(steps) {
  const saved = ctx.globalAlpha;
  ctx.globalAlpha = 0;
  for (let i = 0; i < steps; i++) frame(i * 16, 16);
  ctx.globalAlpha = saved;
  ctx.clearRect(0, 0, W, H);
}

function init() {
  renderSchedule();
  resize();
  seed();
  warmUp(150);

  const fromUrl = location.hash.replace('#', '');
  if (fromUrl && TABS.includes(fromUrl)) showTab(fromUrl, true);

  window.addEventListener('hashchange', () => {
    showTab(location.hash.replace('#', '') || 'home', true);
  });

  if (reduceMotion) {
    frame(0, 16);
  } else {
    requestAnimationFrame(step);
  }

  window.addEventListener('resize', () => {
    const prev = W;
    resize();
    if (Math.abs(W - prev) > 80) { seed(); warmUp(150); }
    if (reduceMotion) frame(0, 16);
  });

  window.addEventListener('pointermove', trackPointer, { passive: true });
  window.addEventListener('touchmove', trackPointer, { passive: true });
  window.addEventListener('pointerleave', () => { pointer.live = false; });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      flockRunning = false;
    } else if (document.getElementById('tab-home').classList.contains('is-active')) {
      flockRunning = true;
      last = performance.now();
      if (!reduceMotion) requestAnimationFrame(step);
    }
  });
}

init();
