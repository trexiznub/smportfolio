# Ujwal Raj K. P — Portfolio

A single-page dark-themed portfolio site.

## Structure

```
portfolio/
├── index.html        Markup for every section
├── css/style.css      All styling, colors, layout, animations
├── js/main.js         Scroll reveals, counters, custom cursor, magnetic buttons
└── images/ujwal.webp  Background-removed headshot used in the hero
```

## Running it

No build step or dependencies needed.

- **Quickest:** open `index.html` directly in a browser.
- **Recommended (for the custom cursor / fonts to behave exactly like a real server):** install the VS Code extension "Live Server," right-click `index.html`, and choose "Open with Live Server."

## Editing

- Colors, fonts, and spacing are defined as CSS variables at the top of `css/style.css` (`:root { ... }`) — change them there to re-theme the whole site.
- Content (name, experience, projects, skills, etc.) lives directly in `index.html`.
- To swap the hero photo, replace `images/ujwal.webp` with another image (ideally with a transparent or removed background) and update the `src` in `index.html` if you rename the file.
