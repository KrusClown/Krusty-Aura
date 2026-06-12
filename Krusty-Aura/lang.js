/* ═══════════════════════════════════════════
   KRUSTY AURA — Language Switcher
   File: lang.js
   ═══════════════════════════════════════════ */

const translations = {
  en: {
    flag:        '🇺🇸',
    label:       'EN',
    role:        'Crazy Programmer',
    description: 'Developer passionate about open-source, clean architecture, and building tools that make a difference. Always exploring new technologies and sharing knowledge with the community.',
    github:      'github.com/KrusClown',
    addPhoto:    'Add photo',
  },
  es: {
    flag:        '🇪🇸',
    label:       'ES',
    role:        'Programador Loco',
    description: 'Desarrollador apasionado por el código abierto, la arquitectura limpia y la creación de herramientas que marcan la diferencia. Siempre explorando nuevas tecnologías y compartiendo conocimiento con la comunidad.',
    github:      'github.com/KrusClown',
    addPhoto:    'Agregar foto',
  },
  pt: {
    flag:        '🇧🇷',
    label:       'PT',
    role:        'Programador Louco',
    description: 'Desenvolvedor apaixonado por código aberto, arquitetura limpa e construção de ferramentas que fazem a diferença. Sempre explorando novas tecnologias e compartilhando conhecimento com a comunidade.',
    github:      'github.com/KrusClown',
    addPhoto:    'Adicionar foto',
  },
  fr: {
    flag:        '🇫🇷',
    label:       'FR',
    role:        'Programmeur Fou',
    description: 'Développeur passionné par l\'open-source, l\'architecture propre et la création d\'outils qui font la différence. Toujours à explorer de nouvelles technologies et à partager ses connaissances avec la communauté.',
    github:      'github.com/KrusClown',
    addPhoto:    'Ajouter une photo',
  },
  ja: {
    flag:        '🇯🇵',
    label:       'JP',
    role:        'クレイジープログラマー',
    description: 'オープンソース、クリーンアーキテクチャ、そして違いを生むツールの構築に情熱を注ぐ開発者。常に新しいテクノロジーを探求し、コミュニティと知識を共有しています。',
    github:      'github.com/KrusClown',
    addPhoto:    '写真を追加',
  },
};

const langOrder = ['en', 'es', 'pt', 'fr', 'ja'];
let currentLang = 'en';
let dropdownOpen = false;

/* ── Build dropdown UI ── */
function buildLangSwitcher() {
  const wrapper = document.getElementById('lang-switcher');

  const trigger = document.createElement('button');
  trigger.id = 'lang-trigger';
  trigger.className = 'lang-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.innerHTML = `<span id="lang-flag">🇺🇸</span><span id="lang-label">EN</span><span class="lang-arrow">▾</span>`;

  const dropdown = document.createElement('ul');
  dropdown.id = 'lang-dropdown';
  dropdown.className = 'lang-dropdown';
  dropdown.setAttribute('role', 'listbox');
  dropdown.setAttribute('aria-label', 'Select language');

  langOrder.forEach(code => {
    const t = translations[code];
    const li = document.createElement('li');
    li.className = 'lang-option' + (code === 'en' ? ' active' : '');
    li.setAttribute('role', 'option');
    li.setAttribute('data-lang', code);
    li.setAttribute('aria-selected', code === 'en' ? 'true' : 'false');
    li.innerHTML = `<span class="lang-opt-flag">${t.flag}</span><span class="lang-opt-label">${t.label}</span>`;
    li.addEventListener('click', () => {
      applyLang(code);
      closeDropdown();
    });
    dropdown.appendChild(li);
  });

  wrapper.appendChild(trigger);
  wrapper.appendChild(dropdown);

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownOpen ? closeDropdown() : openDropdown();
  });

  document.addEventListener('click', closeDropdown);
}

function openDropdown() {
  dropdownOpen = true;
  document.getElementById('lang-dropdown').classList.add('open');
  document.getElementById('lang-trigger').setAttribute('aria-expanded', 'true');
}

function closeDropdown() {
  dropdownOpen = false;
  const dd = document.getElementById('lang-dropdown');
  if (dd) dd.classList.remove('open');
  const tr = document.getElementById('lang-trigger');
  if (tr) tr.setAttribute('aria-expanded', 'false');
}

/* ── Apply a language to the page ── */
function applyLang(code) {
  if (!translations[code]) return;
  currentLang = code;
  const t = translations[code];

  // Update card text
  document.querySelector('.role').textContent        = t.role;
  document.querySelector('.description').textContent = t.description;

  // Update trigger button
  document.getElementById('lang-flag').textContent  = t.flag;
  document.getElementById('lang-label').textContent = t.label;

  // Update active state in dropdown
  document.querySelectorAll('.lang-option').forEach(li => {
    const isActive = li.dataset.lang === code;
    li.classList.toggle('active', isActive);
    li.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  // Update html lang attribute
  document.documentElement.lang = code;

  // Persist
  try { localStorage.setItem('krusty-lang', code); } catch (_) {}
}

/* ── Init ── */
buildLangSwitcher();

try {
  const saved = localStorage.getItem('krusty-lang');
  if (saved && translations[saved]) applyLang(saved);
} catch (_) {}
