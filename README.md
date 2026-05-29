# Monroe Residences Website

A single-page leasing website for Monroe Residences boutique apartments in Brooklyn, Michigan.

## Project Structure

```
101monroe/
├── index.html          # Main page (single-page site)
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # Interactions (lightbox, showcase switcher)
└── images/
    ├── hero.png        # Exterior rendering (hero)
    ├── IMG_4280.JPG    # Leasing team photo
    ├── brokerage-house-logo.jpg  # The Brokerage House logo
    ├── 3d/             # 3D apartment renderings
    ├── floorplans/     # 2D floor plans
    ├── renderings/     # Interior renderings
    ├── before/         # Before photos
    ├── progress/       # Construction progress photos
    └── commute/        # Commute route maps
```

---

## Leasing Team

Tours and applications are handled by The Brokerage House:

- **Lillian Wooster** — 517-745-4574 — lillywooster@gmail.com
- **Jenifer Scanlon** — 734-664-6789 — jeniferscanlon@gmail.com

The "Schedule a Tour" CTA throughout the site opens a prefilled mailto to both agents.

---

## Deployment

The site is hosted as a static site on Render and auto-deploys from the `main` branch on GitHub.

### To make updates:

1. Edit files locally (or directly on GitHub)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Describe your change"
   git push
   ```
3. Render automatically redeploys (~1 minute)

### Domain

The site is served from `https://101monroe.com` (DNS managed in Cloudflare; CNAME points at `101monroe.onrender.com` with DNS-only proxy).

---

## Common edits

### Update pricing or availability

Pricing appears in two places per unit and needs to stay in sync:

1. The apartment showcase (`.showcase__thumb` `data-specs` attribute) in `index.html`
2. The floor plan card (`.unit-card__price` span) in `index.html`
3. The structured data block (JSON-LD `offers.price`) at the bottom of `index.html`

### Update construction progress

Edit the "Construction Progress" section in `index.html`:
- Change the date in `.progress-update__date`
- Update the bullet points in `.progress-update__list`
- Add new progress photos under `images/progress/`

---

## Image Sizes

For best performance:
- **Hero image:** 1920x1080px or larger
- **Gallery / rendering images:** 1200x900px
- **Progress photos:** 800x600px minimum
- **Profile / team photo:** 800x1000px

Compress images at [tinypng.com](https://tinypng.com) before uploading.

---

Built for Monroe Residences • Brooklyn, Michigan
