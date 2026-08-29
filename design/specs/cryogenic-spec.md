# Direction 3 Design Specification: "Cryogenic Dilution // The Quantum Fridge"
**Qiskit Fall Fest (QFF) — Laboratory Hardware & Sub-Kelvin Physical Computing Edition**

---

## 1. Aesthetic Philosophy & Narrative Core

Unlike generic web3/AI "dark mode" landing pages adorned with purple blur spheres, the **Cryogenic Dilution** direction treats the Qiskit Fall Fest interface as an **interactive dilution refrigerator monitoring terminal and physical quantum lab command console**.

The visual language draws directly from the physical reality of superconducting transmon quantum computers (such as the 133-qubit IBM Quantum Heron):
- **Thermal Stratification:** The UI is structured into thermal plates ranging from **300K (Room Ambient / User Entry)** at the top down through **50K (Thermal Flange)**, **4K (Pulse Generator Stage)**, **800 mK (Still Plate)**, **100 mK (Cold Plate)**, and ultimately **15 mK (Sub-Kelvin Mixing Chamber / QPU Execution Stage)**.
- **Physical Metallurgy & Wiring:** Braided gold-plated semi-rigid coaxial SMA cables, oxygen-free high-conductivity (OFHC) copper plates, polished gold radiation shields, and niobium-titanium superconducting flex lines inform borders, bus lines, and circuit accents.
- **Vacuum Telemetry:** Live sub-Kelvin telemetry widgets, high-vacuum Pirani/Penning gauge readouts, cryostat pressure metrics ($1.2 \times 10^{-7}\text{ mbar}$), and active microwave pulse signal monitors.
- **Autumn Convergence:** Autumn leaves and thermal dissipation are rendered as ambient gold/amber phonon heat dissipation diagrams and quantum noise mitigation artifacts.

---

## 2. Design System & Design Tokens

### 2.1 Color Palette (Exact Hex & CSS Custom Properties)

```css
:root {
  /* Cryostat Structural Neutrals (Vacuum Chamber & Shielding) */
  --cryo-bg-darkest: #07090D;        /* Deep vacuum chamber black-blue */
  --cryo-bg-base: #0B0F15;           /* Primary laboratory chassis charcoal */
  --cryo-bg-surface: #121820;        /* Flange & instrumentation panel */
  --cryo-bg-elevated: #18222E;       /* Elevated rack unit / card surface */
  --cryo-border-subtle: #222F3E;     /* Panel seams & structural bolts */
  --cryo-border-medium: #34485D;     /* Active rack perimeter lines */

  /* Thermal Stage Gold & OFHC Copper (Cryogenic Chandelier) */
  --gold-chandelier: #F3C969;        /* 15mK Mixing chamber gold plating */
  --gold-warm: #E5B246;              /* Semi-rigid SMA coaxial cable gold */
  --gold-glow: rgba(243, 201, 105, 0.25);
  --copper-thermal: #D97746;         /* Oxygen-Free High-Conductivity Copper */
  --copper-ambient: #BD5B2D;         /* 300K room temperature ambient */
  --copper-glow: rgba(217, 119, 70, 0.2);

  /* Supercooled Microwave & Cryo-Blue (Sub-Kelvin Superconduction) */
  --blue-supercooled: #4FACFE;       /* Sub-Kelvin microwave readout tone */
  --blue-cryo-bright: #00F2FE;       /* Josephson junction plasma resonance */
  --blue-glow: rgba(0, 242, 254, 0.2);
  --cyan-telemetry: #38EF7D;         /* Vacuum OK / Cryo-pump stable green */
  --laser-crimson: #FF4B4B;          /* Quench alert / High-thermal warning */

  /* Scientific Typography Hierarchy Colors */
  --text-primary: #F0F4F8;          /* Polished nickel / readout text */
  --text-secondary: #9BAEC1;        /* Instrument label & bus annotation */
  --text-muted: #5C7085;            /* Inactive stage readout / telemetry trace */
  --text-accent: #F3C969;           /* Active setpoint gold */
}
```

### 2.2 Typography Scale

- **Headings & Telemetry (Display & Monospace):**
  - Font: `'Space Mono', 'JetBrains Mono', 'Fira Code', monospace`
  - Weights: `400 (Regular)`, `700 (Bold)`
- **Body & Instrumentation Labels (Sans-Serif):**
  - Font: `'General Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`
  - Weights: `400 (Book)`, `500 (Medium)`, `600 (Semibold)`

| Role | Font Family | Size | Weight | Line Height | Tracking |
|---|---|---|---|---|---|
| Chandelier Mega Title | Space Mono | 44px / 2.75rem | 700 | 1.1 | -0.03em |
| Section Flange Header | Space Mono | 28px / 1.75rem | 700 | 1.2 | -0.02em |
| Stage Metric Value | Space Mono | 32px / 2.0rem | 700 | 1.0 | -0.04em |
| Rack Unit Title | General Sans | 20px / 1.25rem | 600 | 1.3 | 0 |
| Body Text | General Sans | 15px / 0.9375rem | 400 | 1.6 | +0.01em |
| Instrument Sub-label | Space Mono | 11px / 0.6875rem | 700 | 1.4 | +0.08em (Uppercase) |

### 2.3 Metallic Gradients & Shaders

```css
--grad-gold-chandelier: linear-gradient(135deg, #FFF0B8 0%, #F3C969 50%, #B8860B 100%);
--grad-copper-plate: linear-gradient(135deg, #FFB28A 0%, #D97746 50%, #8A3B14 100%);
--grad-supercooled-ice: linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%);
--grad-cryo-stage-bg: linear-gradient(180deg, rgba(18, 24, 32, 0.8) 0%, rgba(11, 15, 21, 0.95) 100%);
--grad-coax-line: linear-gradient(180deg, rgba(243, 201, 105, 0.8), rgba(0, 242, 254, 0.8));
```

---

## 3. Navigation & Laboratory Instrumentation Header

The header represents the **Cryostat Top-Flange (Room-Temperature Interface)** with integrated telemetry bus:
1. **Lab Status Ticker:**
   - Real-time oscillation of Dilution Unit Pressure: `P_still: 0.12 mbar | P_mix: 1.1e-7 mbar`
   - Active Mixing Chamber Temp: `T_MC: 14.88 mK [SUPERCOOLED STABLE]`
   - Hardware Target: `IBM Quantum Heron (133 Qubits) | Pulse Gate Fidelity: 99.92%`
2. **Navigation Tabs (4 Required Core Sections):**
   - `[01 // HOME_TELEMETRY]` → Overview, Chandelier Cryo Stages, Hardware Specs, Value Props
   - `[02 // STAGE_TIMELINE]` → Event Schedule categorized by Cryo Stage (300K → 15mK)
   - `[03 // QPU_HACKATHON]` → Hackathon Tracks, Pulse Control Challenges, Rules, Scoring Matrix
   - `[04 // RF_COMMS_CONSOLE]` → Secure Join Channels, Discord, Slack, Mentor RF Frequency Bands

---

## 4. Tab Component Blueprints

### Tab 1: Home (`#tab-home`)
- **Cryostat Chandelier Hero Graphic:** Multi-stage vector SVG illustrating the physical plates of a dilution refrigerator with running coaxial gold cables.
- **Stage Temperature Readouts:**
  - 300K: Room Temperature / Registration & Welcome
  - 50K: Thermal Shield / Quantum Fundamentals
  - 4K: Pulse Generator Flange / Qiskit SDK & Algorithms
  - 15 mK: Superconducting QPU Mixing Chamber / 133-Qubit Quantum Execution
- **Quantum Hardware Spec Banner:** Detailed physical attributes of the IBM Quantum Heron processor (Heavy-Hex topology, Tunable Couplers, Dynamic Circuit Support, Sub-microsecond coherence $T_1/T_2$).
- **Autumn Fest Hardware Highlights:** Four physical instrumentation cards detailing "Sub-Kelvin Hackathons", "Direct Microwave Pulse Synthesis", "Global Quantum Community", and "Academic & Industry Hardware Access".

### Tab 2: Event Schedule (`#tab-schedule`)
- Interactive Stage Selector / Filter:
  - `Stage 01: 300K Room Ambient` (Keynotes & Orientation)
  - `Stage 02: 4K Pulse Control` (Hands-on Workshops & Circuit Optimization)
  - `Stage 03: 15mK Quantum Execution` (Hardware Hackathon Sprint & Live Runs)
- Each schedule entry styled as a **Calibration Run Log** with timestamp, speaker RF identifier, room designation, and circuit depth tag.

### Tab 3: Hackathon Details (`#tab-hackathon`)
- **Interactive Track Rack Units:**
  - Track A: *Pulse-Level Control & Qubit Hamiltonian Engineering* (OpenPulse, Qiskit Dynamics)
  - Track B: *Quantum Algorithms & Scalable Heavy-Hex Optimization* (QAOA, VQE, Error Suppression)
  - Track C: *Quantum Autumn Applications & Real-World Utility* (Logistics, Chemistry, Finance)
- **QPU Hardware Access Specs & Protocol:** Instructions for accessing IBM Quantum Platform, API keys, quota allocation, and job queue priorities.
- **Scoring Telemetry:** Breakdown of evaluation weights (Technical Rigor 40%, Hardware Utilization 25%, Algorithmic Novelty 20%, Presentation 15%).
- **Prize Podium:** Cryogenic gold, copper, and supercooled blue badges with compute credits, mentorship, and physical hardware wafer trophies.

### Tab 4: Join Communication Channel (`#tab-comms`)
- **RF Subspace Comms Terminal:**
  - Discord Quantum Hub (`142.85 MHz Channel // Direct Onboarding`)
  - Slack Laboratory Matrix (`Qiskit Fall Fest Workspace`)
  - Team Matchmaking Frequency (`Find teammates by qubit specialization`)
  - Live Mentor Dispatch Request System with simulated RF channel status.

---

## 5. Responsive Behavior & Micro-Interactions

- **Hover States:** Coaxial gold cables illuminate with moving particle pulses; buttons emit brass/gold metallic edge glow.
- **Tab Switching:** Instant zero-lag transition with thermal stage status feedback (`STAGE_SWITCH_ACK: T-15mK READY`).
- **Mobile Responsive:** Collapses into a vertical instrumentation panel with horizontal scrolling telemetry tickers and modular card stacks.
