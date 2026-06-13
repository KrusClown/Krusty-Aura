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
  },
  es: {
    flag:        '🇪🇸',
    label:       'ES',
    role:        'Programador Loco',
    description: 'Desarrollador apasionado por el código abierto, la arquitectura limpia y la creación de herramientas que marcan la diferencia. Siempre explorando nuevas tecnologías y compartiendo conocimiento con la comunidad.',
  },
  pt: {
    flag:        '🇧🇷',
    label:       'PT',
    role:        'Programador Louco',
    description: 'Desenvolvedor apaixonado por código aberto, arquitetura limpa e construção de ferramentas que fazem a diferença. Sempre explorando novas tecnologias e compartilhando conhecimento com a comunidade.',
  },
  fr: {
    flag:        '🇫🇷',
    label:       'FR',
    role:        'Programmeur Fou',
    description: "Développeur passionné par l'open-source, l'architecture propre et la création d'outils qui font la différence. Toujours à explorer de nouvelles technologies et à partager ses connaissances avec la communauté.",
  },
  ja: {
    flag:        '🇯🇵',
    label:       'JP',
    role:        'クレイジープログラマー',
    description: 'オープンソース、クリーンアーキテクチャ、そして違いを生むツールの構築に情熱を注ぐ開発者。常に新しいテクノロジーを探求し、コミュニティと知識を共有しています。',
  },
  ar: {
    flag:        '🇸🇦',
    label:       'AR',
    role:        'مبرمج مجنون',
    description: 'مطوّر شغوف بالمصادر المفتوحة والبنية النظيفة وبناء الأدوات التي تُحدث فارقاً. يستكشف دائماً تقنيات جديدة ويتشارك المعرفة مع المجتمع.',
  },
  zh: {
    flag:        '🇨🇳',
    label:       'ZH',
    role:        '疯狂程序员',
    description: '热衷于开源、简洁架构和构建有意义工具的开发者。始终探索新技术，并与社区分享知识。',
  },
};

const langOrder  = ['en', 'es', 'pt', 'fr', 'ja', 'ar', 'zh'];
let currentLang  = 'en';
let dropdownOpen = false;

/* ── Build the switcher into #lang-switcher ── */
function buildLangSwitcher() {
  const wrapper = document.getElementById('lang-switcher');
  if (!wrapper) return;

  /* Trigger button */
  const trigger = document.createElement('button');
  trigger.id        = 'lang-trigger';
  trigger.className = 'lang-trigger';
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.innerHTML =
    '<span id="lang-flag">🇺🇸</span>' +
    '<span id="lang-label">EN</span>' +
    '<span class="lang-arrow">▾</span>';

  /* Dropdown */
  const dropdown = document.createElement('ul');
  dropdown.id        = 'lang-dropdown';
  dropdown.className = 'lang-dropdown';
  dropdown.setAttribute('role', 'listbox');

  langOrder.forEach(function(code) {
    var t  = translations[code];
    var li = document.createElement('li');
    li.className = 'lang-option' + (code === 'en' ? ' active' : '');
    li.setAttribute('role', 'option');
    li.setAttribute('data-lang', code);
    li.setAttribute('aria-selected', code === 'en' ? 'true' : 'false');
    li.innerHTML =
      '<span class="lang-opt-flag">' + t.flag + '</span>' +
      '<span class="lang-opt-label">' + t.label + '</span>';
    li.addEventListener('click', function() {
      applyLang(code);
      closeDropdown();
    });
    dropdown.appendChild(li);
  });

  wrapper.appendChild(trigger);
  wrapper.appendChild(dropdown);

  trigger.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownOpen ? closeDropdown() : openDropdown();
  });

  document.addEventListener('click', function() {
    if (dropdownOpen) closeDropdown();
  });
}

function openDropdown() {
  dropdownOpen = true;
  document.getElementById('lang-dropdown').classList.add('open');
  document.getElementById('lang-trigger').setAttribute('aria-expanded', 'true');
}

function closeDropdown() {
  dropdownOpen = false;
  var dd = document.getElementById('lang-dropdown');
  var tr = document.getElementById('lang-trigger');
  if (dd) dd.classList.remove('open');
  if (tr) tr.setAttribute('aria-expanded', 'false');
}

/* ── Apply a language ── */
function applyLang(code) {
  if (!translations[code]) return;
  currentLang = code;
  var t = translations[code];

  document.querySelector('.role').textContent        = t.role;
  document.querySelector('.description').textContent = t.description;
  document.getElementById('lang-flag').textContent   = t.flag;
  document.getElementById('lang-label').textContent  = t.label;
  document.documentElement.lang                      = code;

  /* RTL for Arabic */
  document.querySelector('.card').style.direction =
    code === 'ar' ? 'rtl' : 'ltr';
  /* GitHub link always LTR */
  var gh = document.querySelector('.github-link');
  if (gh) gh.style.direction = 'ltr';

  document.querySelectorAll('.lang-option').forEach(function(li) {
    var active = li.getAttribute('data-lang') === code;
    li.classList.toggle('active', active);
    li.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  try { localStorage.setItem('krusty-lang', code); } catch(e) {}
}

/* ── Init ── */
buildLangSwitcher();

try {
  var saved = localStorage.getItem('krusty-lang');
  if (saved && translations[saved]) applyLang(saved);
} catch(e) {}
