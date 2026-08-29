# Design Specification: The Quantum Scoreboard (Circuit & Execution Matrix)

## 1. Aesthetic Concept & Brand Identity
- **Direction**: Developer-First Quantum Execution Matrix & Telemetry Scoreboard.
- **Philosophy**: Rooted in actual quantum hardware control interfaces, OpenQASM 3.0 assembly representation, and cryogenic instrumentation. Emphasizes mechanical precision, discrete quantum state registers, high-density telemetry, and authentic autumnal accents (Fall telemetry amber).
- **Anti-Trope Commitment**: Absolutely zero generic blurry purple gradients, floaty spheres, or fake "AI glow" glassmorphism. Uses crisp 1px borders, monospace metric readouts, hardware bus status lines, real quantum state vector representations ($|\psi\rangle = \alpha|0\rangle + \beta|1\rangle$), and authentic IBM Plex type hierarchy.

---

## 2. Design Tokens & Color Palette

### 2.1 Core Palette
- **Background Deep Void**: `#090a0f` (Base canvas layer)
- **Surface Elevation 1 (Card Base)**: `#11141d` (Module surfaces)
- **Surface Elevation 2 (Elevated Panels)**: `#171b26` (Floating panels, control trays)
- **Surface Inset / Well**: `#0d0e15` (Terminals, circuit composer canvas)
- **Border Crisp / Grid Line**: `#232a3b` (Structural grid dividers)
- **Border Active / Focused**: `#4c5b7d` (Interactive item boundary)

### 2.2 Quantum Domain Tokens
- **Qiskit Core Violet**: `#6929c4` (Qiskit brand anchor)
- **Qiskit Violet Accent**: `#8a3ffc` (Interactive highlights, primary CTA)
- **Qiskit Violet Glow (Low alpha)**: `rgba(138, 63, 252, 0.15)`
- **Superposition Cyan**: `#00d2d3` (Phase & quantum state indicators, qubit 0 channel)
- **Superposition Cyan Glow**: `rgba(0, 210, 211, 0.18)`
- **Fall Telemetry Amber**: `#ff832b` (Autumn festival accent, warnings, gate pulses)
- **Fall Amber Accent**: `#f1c21b` (High-tier prize badges, active step indicators)
- **Cryo Status Emerald**: `#25a244` (QPU Online status, successful compilation)
- **Decoherence Rose**: `#da1e28` (Error states, quantum noise indicators)

### 2.3 Typography & Text Contrast
- **Font Stack Monospace (Code, Metrics, Circuit)**: `'IBM Plex Mono', 'JetBrains Mono', 'Fira Code', monospace`
- **Font Stack Sans-Serif (Body, Headers, UI)**: `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Text Primary**: `#f4f4f6` (High contrast, 15.5:1 ratio against `#090a0f`)
- **Text Secondary**: `#a2a9b7` (7.2:1 contrast ratio)
- **Text Muted / Hardware Annotation**: `#636e84` (4.6:1 contrast ratio, WCAG AA compliant)
- **Text Inverse**: `#090a0f`

### 2.4 Spacing & Grid System
- **Base Grid Unit**: `4px`
- **Scale**:
  - `space-1`: `4px`
  - `space-2`: `8px`
  - `space-3`: `12px`
  - `space-4`: `16px`
  - `space-6`: `24px`
  - `space-8`: `32px`
  - `space-12`: `48px`
  - `space-16`: `64px`
- **Radius**:
  - `radius-none`: `0px` (Strict technical elements, circuit gates)
  - `radius-sm`: `3px` (Badges, small buttons)
  - `radius-md`: `6px` (Cards, modal dialogs)
  - `radius-lg`: `10px` (Main panel enclosures)

---

## 3. Structural Wireframe & Component Architecture

### 3.1 Global Sticky Header (`<header class="qff-header">`)
- **Left**: QFF Brand Mark `QFF:2026 // FALL_FEST` with animated quantum pulse indicator.
- **Center Navigation Tabs**:
  - `[00:HOME]` → Interactive Circuit Composer, Hero Metrics, About QFF.
  - `[01:SCHEDULE]` → Timed Quantum Wire Pipeline ($t_0 \to t_n$).
  - `[02:HACKATHON]` → Challenge Tracks, Runtime Quotas, Prize Matrix.
  - `[03:COMMUNITY]` → Live Terminal Join Interface, Mentors, Discord/Slack Matrix.
- **Right Status Rig**: Hardware Telemetry Ribbon (`HERON_R2 // 133_QUBIT // 99.86% 2Q-FIDELITY // ONLINE`).

---

### 3.2 Tab 1: Home Section (`#tab-home`)
- **Interactive Quantum Circuit Composer Hero**:
  - 3-Qubit Execution Grid (`q[0]`, `q[1]`, `q[2]`) with interactive gate palette:
    - Hadamard Gate `[ H ]`
    - Pauli-X Gate `[ X ]`
    - Controlled-NOT `[ ⊕ / • ]`
    - Phase Rotation `[ Rz(θ) ]`
    - Measurement `[ ◰ ]`
  - **Live State Vector & Bloch Coordinate Visualizer**:
    - Probability histogram ($|000\rangle \dots |111\rangle$) updating in real time as gates are placed or toggled.
    - Entanglement state meter (`Bell State` detection, von Neumann entropy).
  - **QPU Telemetry Scoreboard**:
    - $T_1$ Relaxation: `248.4 μs`
    - $T_2$ Dephasing: `184.2 μs`
    - 2-Qubit Gate Error: `1.42 × 10⁻³`
    - Readout Fidelity: `99.12%`
- **About Qiskit Fall Fest (QFF)**:
  - Technical overview of global university & community festival.
  - Value propositions: Real QPU Hardware Access, IBM Quantum Mentorship, OpenQASM 3.0 toolchain mastery, Global Leaderboards.
- **Festival Stats Counter Grid**:
  - `100+` University Hubs worldwide
  - `15,000+` Quantum Hackers
  - `250,000+` QPU Circuit Shots Allocated
  - `$40,000` Global Prize & Cloud Credit Pool

---

### 3.3 Tab 2: Event Schedule Section (`#tab-schedule`)
- **Timed Circuit Pipeline Interface**:
  - Visual timeline styled like an OpenQASM pulse schedule.
  - Time slices ($t_0, t_1, t_2, \dots, t_5$) mapping keynote talks, quantum algorithm masterclasses, hardware hands-on, and submission milestones.
  - Filterable by track: `[All]`, `[Keynote]`, `[Algorithms]`, `[Hardware/QPU]`, `[Hackathon]`.
  - Detailed modal/expandable drawer with speaker credentials, prerequisites (e.g., `qiskit-ibm-runtime >= 0.28.0`), and calendar export (.ics).

---

### 3.4 Tab 3: Hackathon Details Section (`#tab-hackathon`)
- **Challenge Tracks Matrix**:
  1. **Track A: Fault-Tolerant & Error Mitigation (Qiskit Runtime)**
     - *Focus*: Zero-noise extrapolation (ZNE), Pauli twirling, and dynamical decoupling on noisy QPUs.
     - *Difficulty*: `Hard / Level 3`
     - *Compute Allowance*: 400 Runtime QPU Seconds
  2. **Track B: Quantum Optimization & Finance / Logistics**
     - *Focus*: QAOA and VQE formulations for discrete portfolio rebalancing & supply chain routing.
     - *Difficulty*: `Medium / Level 2`
     - *Compute Allowance*: 250 Runtime QPU Seconds
  3. **Track C: Quantum Machine Learning (QML) & Nature**
     - *Focus*: Quantum kernel estimation and variational classifiers for materials screening.
     - *Difficulty*: `Medium / Level 2`
     - *Compute Allowance*: 250 Runtime QPU Seconds
  4. **Track D: Open Science & Quantum Education Tools**
     - *Focus*: Interactive widgets, novel transpiler passes, or browser-based quantum simulators.
     - *Difficulty*: `Open / Level 1`
     - *Compute Allowance*: 150 Runtime QPU Seconds
- **Rules & Submission Guardrails**:
  - Open source repository requirement (Apache 2.0 or MIT).
  - Executable Jupyter notebooks with reproducibility seeds.
  - Real hardware execution verification receipts from IBM Quantum Platform.

---

### 3.5 Tab 4: Join Communication Channel Section (`#tab-community`)
- **Terminal-Style Interactive Onboarding Console**:
  - Live mock CLI emulator (`qff-cli`) where participants can test verification:
    - Commands: `qff help`, `qff join --discord`, `qff join --slack`, `qff status`, `qff claim-creds`, `qff mentor-queue`.
  - Direct integration cards for Discord, Slack, and Matrix/Element with real-time online participant counters.
  - **Mentor Office Hour Dispatcher**:
    - Live list of IBM Quantum researchers and community ambassadors on duty with active queue status and room links.

---

## 4. Interactive State Machine & Scripting Specifications

1. **Tab Navigation Controller**: Seamless single-page tab switching with URL hash sync (`#home`, `#schedule`, `#hackathon`, `#community`), maintaining active state indicator with subtle transition animations.
2. **Interactive Circuit Engine**:
   - Maintains a 3-qubit state register.
   - Evaluates state transitions using exact complex amplitude matrix multiplications ($2\times 2$ for single-qubit gates, $4\times 4$ for controlled gates).
   - Generates dynamic measurement probability bars with real-time SVG rendering.
3. **Hardware Execution Stream Simulation**:
   - Background ticker simulating job submissions (`JOB_ID: #qff-89412... STATUS: COMPLETED on ibm_heron`).
4. **Copy-to-Clipboard & Terminal Command Handler**:
   - Terminal accepts keyboard input with auto-scrolling and syntax highlighting.

---

## 5. Responsive Behavior & Accessibility
- **Breakpoints**:
  - Desktop / Ultra-Wide: `>= 1280px` (Multi-column telemetry + circuit composer side-by-side)
  - Laptop / Tablet Landscape: `960px - 1279px` (Stacked telemetry, full width circuit canvas)
  - Mobile: `< 960px` (Horizontally scrollable circuit canvas, stacked metric cards, condensed terminal)
- **Accessibility**:
  - Strict semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  - ARIA attributes on tab buttons (`role="tab"`, `aria-selected="true"`, `aria-controls`).
  - High-contrast text compliance (all text meets or exceeds WCAG AA 4.5:1).
  - Keyboard navigability for all interactive gates and buttons.
