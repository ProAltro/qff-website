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
   Each bird carries GHOSTS — alternate trajectories it could
   have flown, drawn faintly behind it. The pointer is a
   measurement gate: birds that pass through it collapse to a
   single path, which draws solid, then decohere back.
   ───────────────────────────────────────────────────────── */

const canvas = document.getElementById('flock');
const ctx = canvas.getContext('2d');

const INK      = '49, 19, 94';
const PURPLE   = '139, 63, 252';
const MAGENTA  = '238, 83, 150';

const N_BIRDS  = 22;
const N_GHOSTS = 3;
const TRAIL    = 58;
const GATE_R   = 140;

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

function makeGhost(b, spread) {
  return {
    x: b.x, y: b.y,
    vx: b.vx + (Math.random() - 0.5) * spread,
    vy: b.vy + (Math.random() - 0.5) * spread,
    trail: [],
    life: 0,
    span: 2800 + Math.random() * 2600,
    // a persistent curl, so each alternate path arcs away from the others
    curl: (Math.random() - 0.5) * 0.011,
  };
}

function seed() {
  birds = [];
  for (let i = 0; i < N_BIRDS; i++) {
    const b = {
      x: ((i * 197) % 100) / 100 * W + (Math.random() - 0.5) * 40,
      y: H * 0.05 + ((i * 61) % 100) / 100 * H * 0.55 + (Math.random() - 0.5) * 30,
      vx: 0.85 + Math.random() * 0.35,
      vy: (Math.random() - 0.5) * 0.25,
      z: 0.62 + Math.random() * 0.78,
      phase: Math.random() * Math.PI * 2,
      flap: 0.13 + Math.random() * 0.07,
      trail: [],
      measured: 0,
    };
    b.ghosts = Array.from({ length: N_GHOSTS }, () => makeGhost(b, 1.5));
    b.ghosts.forEach(g => { g.life = Math.random() * g.span; });
    birds.push(b);
  }
}

function wrap(p) {
  let jumped = false;
  if (p.x > W + 60)  { p.x = -60; jumped = true; }
  if (p.x < -60)     { p.x = W + 60; jumped = true; }
  if (p.y > H + 60)  { p.y = -60; jumped = true; }
  if (p.y < -60)     { p.y = H + 60; jumped = true; }
  return jumped;
}

function pushTrail(p, jumped) {
  p.trail.push({ x: p.x, y: p.y, cut: jumped });
  if (p.trail.length > TRAIL) p.trail.shift();
}

function flockForces(b) {
  let ax = 0, ay = 0, sx = 0, sy = 0, cx = 0, cy = 0, n = 0;
  const NEAR = 240, PERSONAL = 135;
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
      const f = (1 - d / PERSONAL) * 0.048;
      sx -= dx / d * f;
      sy -= dy / d * f;
    }
  }
  if (n) {
    cx = (cx / n - b.x) * 0.00016;
    cy = (cy / n - b.y) * 0.00030;
    ax = (ax / n - b.vx) * 0.022;
    ay = (ay / n - b.vy) * 0.022;
  }
  return { fx: cx + ax + sx, fy: cy + ay + sy };
}

function advance(p, fx, fy, t, wob, curl) {
  // a steady glide to the right, plus a slow thermal wander
  p.vx += fx + 0.009;
  p.vy += fy + Math.sin(t * 0.0004 + wob) * 0.005;
  // altitude preference: the flock rides the upper sky
  p.vy += (H * 0.30 - p.y) * 0.00004;

  if (curl) {
    const c = Math.cos(curl), sn = Math.sin(curl);
    const nvx = p.vx * c - p.vy * sn;
    p.vy = p.vx * sn + p.vy * c;
    p.vx = nvx;
  }

  const sp = Math.hypot(p.vx, p.vy) || 1;
  const eased = Math.min(Math.max(sp * 0.88 + 1.05 * 0.12, 0.8), 1.6);
  p.vx = p.vx / sp * eased;
  p.vy = p.vy / sp * eased;

  p.x += p.vx; p.y += p.vy;
  return wrap(p);
}

/* Legibility mask: the hero copy occupies the lower-left of the sky.
   Birds still fly through it — they just go quiet there. */
function clarity(p) {
  const right = W * 0.62, top = H * 0.24, soft = 110;
  const insideX = (right - p.x) / soft;
  const insideY = (p.y - top) / soft;
  const d = Math.min(insideX, insideY);
  if (d <= 0) return 1;
  if (d >= 1) return 0.10;
  return 1 - 0.90 * (d * d * (3 - 2 * d));
}

/* One stroke per fade band rather than one per segment: same taper,
   ~15x fewer draw calls, which matters with 22 birds x 3 ghost paths. */
const BANDS = 4;

function drawTrail(p, rgb, alpha, width) {
  const n = p.trail.length;
  if (n < 3 || alpha <= 0.004) return;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  const per = Math.ceil(n / BANDS);

  for (let band = 0; band < BANDS; band++) {
    const from = band * per;
    const to = Math.min(n - 1, from + per);
    if (to - from < 1) continue;

    const t = (band + 1) / BANDS;
    ctx.strokeStyle = `rgba(${rgb}, ${(alpha * t * t).toFixed(3)})`;
    ctx.lineWidth = width * (0.45 + 0.55 * t);
    ctx.beginPath();
    let open = false;
    for (let i = from; i <= to; i++) {
      const pt = p.trail[i];
      if (pt.cut) { open = false; continue; }
      if (!open) { ctx.moveTo(pt.x, pt.y); open = true; }
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.stroke();
  }
}

function drawBird(p, scale, rgb, alpha, spread) {
  const ang = Math.max(-0.62, Math.min(0.62, Math.atan2(p.vy, p.vx)));
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(ang);
  ctx.scale(scale, scale);
  ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
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
    // measurement gate
    const near = pointer.live &&
      Math.hypot(b.x - pointer.x, b.y - pointer.y) < GATE_R;
    b.measured += ((near ? 1 : 0) - b.measured) * (near ? 0.14 : 0.018);

    const { fx, fy } = flockForces(b);
    pushTrail(b, advance(b, fx, fy, t, b.phase));

    // ghosts: alternate paths, pulled home as measurement rises
    for (const g of b.ghosts) {
      g.life += dt;
      if (g.life > g.span) {
        Object.assign(g, makeGhost(b, 1.6));
      }
      const collapse = b.measured * 0.16;
      pushTrail(g, advance(
        g,
        fx + (g.x - b.x) * -collapse * 0.02,
        fy + (g.y - b.y) * -collapse * 0.02,
        t, g.span,
        g.curl * (1 - b.measured)
      ));
      if (b.measured > 0.02) {
        g.x += (b.x - g.x) * collapse;
        g.y += (b.y - g.y) * collapse;
      }
    }
  }

  // the paths it might have taken — drawn first, so the measured one reads on top
  for (const b of birds) {
    const ga = (1 - b.measured) * 0.40 * b.z * clarity(b);
    for (const g of b.ghosts) drawTrail(g, PURPLE, ga, 1.1);
  }

  for (const b of birds) {
    const flapSpread = 5.6 + Math.sin(t * b.flap * 0.012 + b.phase) * 3.4;
    const solid = b.measured;
    const cl = clarity(b);
    drawTrail(b, INK, 0.24 * cl, 1.3);
    if (solid > 0.02) drawTrail(b, MAGENTA, solid * 0.72 * cl, 2);
    drawBird(
      b,
      b.z * 2.5,
      solid > 0.5 ? MAGENTA : INK,
      ((0.50 + b.z * 0.20) * (1 - solid) + solid * 0.95) * cl,
      flapSpread
    );
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
