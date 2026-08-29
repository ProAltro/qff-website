# Direction 2 Design Tokens & Layer Map: "State Vector // Wave Interference"

## 1. Executive Aesthetic & Concept
- **Concept Name:** State Vector // Wave Interference
- **Design Philosophy:** Continuous, physics-centric, poetic, luminescent optical physics. Grounded in quantum wave-particle duality, Young's double-slit interference fringes, quantum state superposition $|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$, and 3D Bloch sphere projections.
- **Canvas Dimension:** 1440px wide desktop standard per artboard (4 master artboards side-by-side on a 6060px master vector canvas).

---

## 2. Design System Color Tokens

| Token Name | CSS / Figma Variable | Hex Code | Purpose / Application |
|---|---|---|---|
| **Obsidian Vacuum** | `--bg-obsidian` | `#07090E` | Base cosmic dark background, tinted with deep navy/black |
| **Obsidian Surface** | `--bg-surface` | `rgba(13, 17, 27, 0.75)` | Refractive glass card surface with backdrop blur |
| **Obsidian Border** | `--border-glass` | `rgba(255, 255, 255, 0.08)` | Subtle optical reflection boundary edge |
| **Luminescent Indigo** | `--accent-indigo` | `#4F46E5` | Coherent laser frequency, primary wave energy |
| **Aurora Teal** | `--accent-teal` | `#00F2FE` | High-frequency quantum phase, constructive interference |
| **Sunset Paprika** | `--accent-paprika` | `#FF5E3A` | Autumnal dusk spectral line, ground state excitation |
| **Phase Gold** | `--accent-gold` | `#FBBF24` | Coherence marker, QPU calibration highlight |
| **Spectral Violet** | `--accent-violet` | `#8B5CF6` | Superposition phase shift, state vector rotation |
| **Text Primary** | `--text-primary` | `#F1F5F9` | Crisp optical white (95% luminance) |
| **Text Secondary** | `--text-secondary` | `#94A3B8` | Diffused Rayleigh scattering slate |
| **Text Muted** | `--text-muted` | `#64748B` | Background phase noise tone |

---

## 3. Typography Scale & Hierarchy

| Hierarchy Level | Font Family | Size | Weight | Tracking | Purpose |
|---|---|---|---|---|---|
| **Hero Title** | Syne | 52px | 800 (ExtraBold) | -0.03em | Primary emotional hook & brand statements |
| **Section Header (H2)** | Syne | 44px / 36px | 800 | -0.02em | Artboard titles & section dividing headers |
| **Subsection Header (H3)** | Syne / Space Grotesk | 22px - 26px | 700 (Bold) | -0.01em | Card titles, track names |
| **Card Subheads** | Space Grotesk | 14px - 16px | 600 (SemiBold) | 0.00em | Key metadata, speaker titles |
| **Math & Dirac Code** | JetBrains Mono / Fira Code | 11px - 13px | 500 / 600 | +0.02em | State formulas $|\psi\rangle$, phase angles $\phi$, QPU status |
| **Body Paragraphs** | Inter | 13px - 15px | 400 (Regular) | 0.00em | Descriptions, rules, explanatory copy |
| **Micro Overlines / Chips** | JetBrains Mono | 10px - 12px | 600 (SemiBold) | +0.08em | Category tags, hardware labels |

---

## 4. Artboard Structure & Component Mapping

### Artboard 1: `Artboard-Tab1-Home` (x: 0, w: 1440, h: 1800)
1. **Floating Navigation Dock (`#Navbar`):** Refractive glass pill dock (`#0D111B`, 80% opacity) with active indicator gradient pill, logo glyph, and real-time 127-Qubit QPU status indicator.
2. **Hero Section (`#Hero-Section`):**
   - Coherence Status Badge: `STATE VECTOR SUPERPOSITION // QFF.2026`
   - Headline: "Where Superposition Meets Autumn Brilliance."
   - Theoretical Derivation Math Strip: $|\psi(t)\rangle = e^{-i\hat{H}t/\hbar}(\alpha|0\rangle + \beta|1\rangle)$
   - Dual CTAs: "Register for Fest →" (Sunset Paprika/Indigo gradient glow) & "Explore Bloch Sphere" (optical stroke).
3. **3D Bloch Sphere Simulator:** Orthogonal $(X, Y, Z)$ axes, state vector $|\psi\rangle$ with $(\theta=48^\circ, \phi=38^\circ)$, precession trajectory arc, and probability density readout.
4. **Continuous Wave Interference Ribbon:** Multi-spectral superimposed sine/cosine wave ribbons.
5. **Quantum State Metrics (4 Glass Cards):** Circuits Executed (1.4M+), Global Hubs (85+), QPU Secs (10,000+), Prize Pool ($45,000).
6. **Superposition Principles (3 Optical Cards):**
   - 01 // Coherent Hardware Access
   - 02 // Slit Track Mentorship
   - 03 // Zero-Noise Transpilation
7. **Bottom Call-to-Action Banner:** Registration gateway pass for IBM Quantum lab credentials.

### Artboard 2: `Artboard-Tab2-Schedule` (x: 1540, w: 1440, h: 1800)
1. **Header & Continuum Filter Pills:** All Phases, Keynotes, Workshops, Hardware Labs, Hackathon Nodes.
2. **Diffraction Slit Vertical Laser Beam Spine:** Continuous vertical optical gradient beam.
3. **Phase-Node Timeline Cards (5 Distinct Nodes):**
   - $\phi = 0.00\pi$: Opening Keynote — "Quantum Utility in the NISQ and Fault-Tolerant Horizon"
   - $\phi = 0.50\pi$: Hands-On Workshop — "Mastering Qiskit Runtime Primitives: Sampler & Estimator V2"
   - $\phi = 1.00\pi$: Pulse Control Lab — "Direct Pulse-Level Control & Qubit Hamiltonian Characterization"
   - $\phi = 1.50\pi$: Hackathon Kickoff — "Global Hackathon Challenge Reveal & Team Formation"
   - $\phi = 2.00\pi$: Synchronization — "Global Finalists Demo & Award Ceremony"

### Artboard 3: `Artboard-Tab3-Hackathon` (x: 3080, w: 1440, h: 1800)
1. **Header & Context:** Quantum Computation Competition context & tracks.
2. **3 Main Challenge Tracks (Side-by-Side Glass Columns):**
   - Track A: Quantum Algorithms & Circuit Synthesis ($18,000 Pool)
   - Track B: Error Suppression & Noise Characterization ($15,000 Pool)
   - Track C: Interactive Visualization & Education ($12,000 Pool)
3. **Dedicated QPU Hardware Allocation Banner:**
   - IBM Heron // 133 Qubits (Tunable Couplers, 2,500s/team)
   - IBM Eagle // 127 Qubits (OpenPulse Microwave Control, 5,000s/team)
   - GPU Aer Matrix Simulator (NVIDIA cuQuantum MPS Cluster, Unlimited)
4. **Rules of Coherence & Global Prize Purse ($45,000 Allocation):**
   - Rules: Team size 1-4, Apache 2.0 open source, Qiskit 1.x compliance, reproducible notebooks.
   - Prizes: 1st Place Grand Champion ($15,000 + residency), Track winners ($7,500 / $7,500 / $5,000).
5. **Team Registration CTA:** Instant GitHub workspace linking.

### Artboard 4: `Artboard-Tab4-Community` (x: 4620, w: 1440, h: 1800)
1. **Community Gateway Header:** Global quantum research network.
2. **Discord / Terminal Client Simulation:** Multi-channel quantum mesh (`#announcements`, `#track-a-algorithms`, `#track-b-error-mit`, `#qpu-hardware-helpdesk`), simulated chat stream with IBM fellows & mentors, and terminal auto-join command.
3. **Live Community Resonance Card:** 4,280 active researchers online, 140+ verified mentors, one-click Discord/Slack launch.
4. **Quantum Expert Mentor Roster:** 1-on-1 office hours booking with Dr. Alistair Vance, Prof. Elena Rostova, and Kai-Lin Chen.
5. **Global University Chapter Hubs (85+ Universities):** North America (32 hubs), Europe & UK (26 hubs), Asia-Pacific (20 hubs), Latin America & MEA (12 hubs).

---

## 5. Figma Import Instructions
1. Open Figma.
2. Drag and drop `design/figma-export/direction-2-interference.svg` directly onto the canvas, or copy the SVG code and press `Cmd+V` / `Ctrl+V`.
3. The file will automatically unpack into 4 distinct 1440x1800 Artboard Frames (`Artboard-Tab1-Home`, `Artboard-Tab2-Schedule`, `Artboard-Tab3-Hackathon`, `Artboard-Tab4-Community`) with fully preserved layers, typography styles, and vector gradients.
