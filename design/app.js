// BRUTALIST TERMINAL INTERACTIVE ENGINE

function switchTermTab(tabId) {
  const tabs = document.querySelectorAll('.term-tab');
  tabs.forEach(tab => tab.classList.remove('active'));

  const tabMap = ['home', 'schedule', 'hackathon', 'comm'];
  const index = tabMap.indexOf(tabId);
  if (index !== -1 && tabs[index]) {
    tabs[index].classList.add('active');
  }

  const panels = document.querySelectorAll('.term-panel');
  panels.forEach(p => p.classList.remove('active'));

  const target = document.getElementById(`tab-${tabId}`);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Keyboard shortcuts: 1, 2, 3, 4
window.addEventListener('keydown', (e) => {
  if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
  if (e.key === '1') switchTermTab('home');
  if (e.key === '2') switchTermTab('schedule');
  if (e.key === '3') switchTermTab('hackathon');
  if (e.key === '4') switchTermTab('comm');
});

// Gate toggle simulation
let termGates = { H: true, X: false, Rz: false };

function toggleTermGate(gate) {
  if (gate === 'H') termGates.H = !termGates.H;
  if (gate === 'X') termGates.X = !termGates.X;
  if (gate === 'Rz') termGates.Rz = !termGates.Rz;

  const buttons = document.querySelectorAll('.gate-btn');
  buttons.forEach(btn => {
    if (btn.textContent.includes('H')) btn.classList.toggle('active', termGates.H);
    if (btn.textContent.includes('X')) btn.classList.toggle('active', termGates.X);
    if (btn.textContent.includes('Rz')) btn.classList.toggle('active', termGates.Rz);
  });

  const stateEl = document.getElementById('term-state');
  if (termGates.H && !termGates.X) {
    stateEl.textContent = '|ψ⟩ = 1/√2 |00⟩ + 1/√2 |11⟩ (BELL_PHI_PLUS)';
  } else if (!termGates.H && termGates.X) {
    stateEl.textContent = '|ψ⟩ = |01⟩ (COMPUTATIONAL_BASIS)';
  } else if (termGates.H && termGates.X) {
    stateEl.textContent = '|ψ⟩ = 1/√2 |01⟩ + 1/√2 |10⟩ (BELL_PSI_PLUS)';
  } else {
    stateEl.textContent = '|ψ⟩ = |00⟩ (GROUND_STATE)';
  }
}

// Schedule filtering
function filterTermSchedule(type) {
  const btns = document.querySelectorAll('.cron-btn');
  btns.forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  const rows = document.querySelectorAll('.cron-table tbody tr');
  rows.forEach(r => {
    if (type === 'ALL' || r.getAttribute('data-type') === type) {
      r.style.display = '';
    } else {
      r.style.display = 'none';
    }
  });
}

// Terminal IRC Input
function handleTermInput(event) {
  if (event.key === 'Enter') {
    submitTermInput();
  }
}

function submitTermInput() {
  const input = document.getElementById('term-input');
  const log = document.getElementById('irc-output');
  const val = input.value.trim();

  if (!val) return;

  const userRow = document.createElement('div');
  userRow.className = 'log-row';
  userRow.innerHTML = `<span class="log-time">[${new Date().toISOString().substring(11, 19)}]</span> <span class="log-user">&lt;YOU&gt;</span> ${val}`;
  log.appendChild(userRow);

  const botRow = document.createElement('div');
  botRow.className = 'log-row';
  
  if (val.includes('@')) {
    botRow.innerHTML = `<span class="log-time">[${new Date().toISOString().substring(11, 19)}]</span> <span class="log-bot">&lt;QFF_BOT&gt;</span> Verification token generated for [${val}]. Discord invite: <strong>https://discord.gg/qff-2026-auth</strong>. Welcome to the cluster.`;
  } else {
    botRow.innerHTML = `<span class="log-time">[${new Date().toISOString().substring(11, 19)}]</span> <span class="log-bot">&lt;QFF_BOT&gt;</span> Command received: '${val}'. To receive guild invite, provide your university email.`;
  }
  
  log.appendChild(botRow);
  log.scrollTop = log.scrollHeight;
  input.value = '';
}
