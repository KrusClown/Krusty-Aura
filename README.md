# Krusty-Aura
A personal biography page with a Matrix rain background, color themes, and multi-language support. No frameworks, no dependencies — pure HTML, CSS, and JavaScript.


# Project Structure
```text
Krusty-Aura/
├── index.html   — Page structure and layout
├── style.css    — All styles, themes, and animations
├── matrix.js    — Matrix rain canvas animation
├── theme.js     — Color theme switcher logic
└── lang.js      — Language switcher logic
```


# Features
A row of buttons at the bottom-center lets you switch the entire color scheme instantly. The Matrix rain, card glow, borders, and text all update together.

| Button | Description |
|-------------|----------|
| 🟢  | `Classic Matrix green (default)` |
| 🔴  | `Deep crimson glow` |
| 🟣  | `Neon violet` |
| 🔵  | `Cyan blue` |
| 🌈  | `Full rainbow cycling animation` |

Your chosen theme is saved in localStorage and restored on next visit.

# Language Switcher
A dropdown in the top-right corner switches the role and biography text between languages.
## 🌐 Languages

| Flag | Code | Language   |
|------|------|------------|
| 🇺🇸  | EN   | English    |
| 🇪🇸  | ES   | Spanish    |
| 🇧🇷  | PT   | Portuguese |
| 🇫🇷  | FR   | French     |
| 🇯🇵  | JP   | Japanese   |

Your chosen language is also saved in localStorage.


