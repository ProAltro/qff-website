// 3D WAVE INTERFERENCE MESH ENGINE (THREE.JS)

let waveScene, waveCamera, waveRenderer, planeMesh;
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;

function initWaveMesh() {
  const container = document.getElementById('wave-canvas-container');
  if (!container) return;

  const w = window.innerWidth;
  const h = window.innerHeight;

  waveScene = new THREE.Scene();
  waveCamera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
  waveCamera.position.set(0, -6, 8);
  waveCamera.lookAt(0, 0, 0);

  waveRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  waveRenderer.setSize(w, h);
  waveRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(waveRenderer.domElement);

  // Plane Geometry with high density vertices
  const geometry = new THREE.PlaneGeometry(28, 20, 70, 50);

  // Wireframe material with restrained Heron accent
  const material = new THREE.MeshBasicMaterial({
    color: 0x00F5D4,
    wireframe: true,
    transparent: true,
    opacity: 0.28
  });

  planeMesh = new THREE.Mesh(geometry, material);
  waveScene.add(planeMesh);

  // Mouse move & Touch listeners for wave disturbance
  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      targetMouseX = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
    }
  }, { passive: true });
  // Resize listener
  window.addEventListener('resize', () => {
    const nw = window.innerWidth;
    const nh = window.innerHeight;
    waveCamera.aspect = nw / nh;
    waveCamera.updateProjectionMatrix();
    waveRenderer.setSize(nw, nh);
  });

  animateWave();
}

let clock = new THREE.Clock();

function animateWave() {
  requestAnimationFrame(animateWave);

  const t = clock.getElapsedTime() * 1.5;

  // Smooth mouse lerping
  mouseX += (targetMouseX - mouseX) * 0.05;
  mouseY += (targetMouseY - mouseY) * 0.05;

  // Deform plane vertices based on sinusoidal wave + mouse distance
  const pos = planeMesh.geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);

    // Distance to cursor in 3D plane projection
    const dist = Math.sqrt((x - mouseX * 10) ** 2 + (y - mouseY * 8) ** 2);
    
    // Wave ripple formula
    const z = Math.sin(x * 0.5 + t) * 0.4 +
              Math.cos(y * 0.5 + t * 1.2) * 0.4 +
              Math.sin(dist * 0.8 - t * 2) * Math.max(0, (1.8 - dist * 0.15));

    pos.setZ(i, z);
  }
  pos.needsUpdate = true;

  // Subtle camera tilt
  waveCamera.position.x = mouseX * 1.2;
  waveCamera.position.y = -6 + mouseY * 0.8;
  waveCamera.lookAt(0, 0, 0);

  waveRenderer.render(waveScene, waveCamera);
}

// 3D Card Perspective Tilt
function tiltCard(event, card) {
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;

  const tiltX = (y / (rect.height / 2)) * -8;
  const tiltY = (x / (rect.width / 2)) * 8;

  card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
}

function resetCard(card) {
  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('menuToggle');
  if (nav && toggle) {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.classList.toggle('active');
  }
}

function closeMobileMenu() {
  const nav = document.getElementById('mainNav');
  const toggle = document.getElementById('menuToggle');
  if (nav && toggle) {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.classList.remove('active');
  }
}

// Tab Switching
function switchWaveTab(tabName) {
  closeMobileMenu();

  const links = document.querySelectorAll('.nav-link');
  links.forEach(l => l.classList.remove('active'));

  const tabNames = ['home', 'about', 'schedule', 'hackathon', 'community'];
  const index = tabNames.indexOf(tabName);
  if (index !== -1 && links[index]) {
    links[index].classList.add('active');
  }

  const tabs = document.querySelectorAll('.wave-tab');
  tabs.forEach(t => t.classList.remove('active'));

  const target = document.getElementById(`tab-${tabName}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// DYNAMIC QUANTUM HERO WORD CYCLER
const QUANTUM_WORDS = [
  'SUPERPOSITION',
  'ENTANGLEMENT',
  'INTERFERENCE'
];
// Every placeholder is one character wide, keeping the headline footprint stable while it cycles.
const GLITCH_CHARS = ['0', '1', 'Ψ', 'Φ', '⊗', 'Δ', 'Ω', 'Σ', 'ħ', 'ψ'];

let currentWordIndex = 0;
let isCycling = false;

function initQuantumWordCycler() {
  const el = document.getElementById('quantum-word');
  if (!el) return;

  setInterval(() => {
    if (isCycling) return;
    isCycling = true;
    currentWordIndex = (currentWordIndex + 1) % QUANTUM_WORDS.length;
    const targetWord = QUANTUM_WORDS[currentWordIndex];

    // Phase 1: Exit transition with blur & float upward
    el.classList.add('cycle-exit');

    setTimeout(() => {
      // Phase 2: Quantum state character scramble & resolve
      let frame = 0;
      const totalFrames = 9;
      el.classList.remove('cycle-exit');
      el.classList.add('cycle-enter', 'scramble');

      const scrambleInterval = setInterval(() => {
        frame++;
        if (frame >= totalFrames) {
          clearInterval(scrambleInterval);
          el.textContent = targetWord;
          el.classList.remove('cycle-enter', 'scramble');
          isCycling = false;
        } else {
          let scrambled = '';
          for (let i = 0; i < targetWord.length; i++) {
            if (i < (frame / totalFrames) * targetWord.length) {
              scrambled += targetWord[i];
            } else {
              scrambled += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            }
          }
          el.textContent = scrambled;
        }
      }, 35);
    }, 280);
  }, 3200);
}

// Registration
function handleWaveRegister() {
  const input = document.getElementById('waveEmail');
  const feedback = document.getElementById('waveFeedback');
  const val = input.value.trim();

  if (!val || !val.includes('@')) {
    feedback.style.display = 'block';
    feedback.style.color = '#FF6B6B';
    feedback.textContent = 'Please provide a valid institutional email address.';
    return;
  }

  feedback.style.display = 'block';
  feedback.style.color = '#00F5D4';
  feedback.textContent = 'Welcome! Invitation link and hardware credits sent to ' + val;
  input.value = '';
}

window.addEventListener('DOMContentLoaded', () => {
  initWaveMesh();
  initQuantumWordCycler();
});
