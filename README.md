# 101 Monroe Website

A single-page pre-leasing website for 101 Monroe boutique apartments in Brooklyn, Michigan.

## Project Structure

```
101monroe/
├── index.html          # Main page (single-page site)
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # Interactions (modal, lightbox, forms)
└── images/
    ├── hero.png        # Exterior rendering (hero)
    ├── bea.jpg         # Profile photo
    ├── brooklyn.png    # Brooklyn collage
    ├── renderings/     # Apartment renderings
    ├── before/         # Before photos
    └── progress/       # Construction progress photos
```

---

## Step 1: Set Up Formspree (5 minutes)

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Click **New Form** → name it "101 Monroe Interest"
3. Copy your form endpoint (looks like `https://formspree.io/f/xyzabcde`)
4. Open `index.html` and find/replace **both instances** of:
   ```
   YOUR_FORM_ID
   ```
   With your actual form ID (just the ID part, like `xyzabcde`)

**Example:** Change this:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" data-formspree>
```
To this:
```html
<form action="https://formspree.io/f/xyzabcde" method="POST" data-formspree>
```

---

## Step 2: Upload to GitHub (10 minutes)

### Option A: GitHub.com (easiest)

1. Go to [github.com](https://github.com) and log in
2. Click **+** → **New repository**
3. Name: `101monroe`
4. Click **Create repository**
5. Click **"uploading an existing file"**
6. Drag and drop ALL files/folders from your `101monroe` folder
7. Click **Commit changes**

### Option B: Git command line

```bash
cd 101monroe
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/101monroe.git
git push -u origin main
```

---

## Step 3: Deploy on Render (10 minutes)

1. Go to [render.com](https://render.com) and log in
2. Click **New +** → **Static Site**
3. Connect your GitHub account
4. Select your `101monroe` repository
5. Configure:
   - **Name:** `101monroe`
   - **Branch:** `main`
   - **Build Command:** (leave blank)
   - **Publish Directory:** `.`
6. Click **Create Static Site**
7. Wait 1-2 minutes for deployment

Your site will be live at: `https://101monroe.onrender.com`

---

## Step 4: Connect Your Cloudflare Domain (10 minutes)

### In Render:
1. Go to your site → **Settings** → **Custom Domains**
2. Click **Add Custom Domain**
3. Enter: `101monroe.com`
4. Also add: `www.101monroe.com`
5. Render will show you the required DNS records

### In Cloudflare:
1. Log in to [cloudflare.com](https://cloudflare.com)
2. Select your `101monroe.com` domain
3. Go to **DNS** → **Records**
4. Add the records Render provided:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | @ | `101monroe.onrender.com` | DNS only |
| CNAME | www | `101monroe.onrender.com` | DNS only |

**Note:** Set proxy status to "DNS only" (gray cloud) for Render to work properly.

5. Wait 5-30 minutes for DNS propagation
6. Your site will be live at `https://101monroe.com`

---

## Making Updates

### To update content:

1. Edit files locally or directly on GitHub
2. If editing locally:
   ```bash
   git add .
   git commit -m "Updated photos"
   git push
   ```
3. Render automatically redeploys (~1 minute)

### To add new photos:

1. Add images to the appropriate folder (`images/renderings/`, etc.)
2. Update `index.html` to reference them
3. Push to GitHub

### To update progress:

Edit the "Construction Progress" section in `index.html`:
- Change the date
- Update the bullet points
- Add new progress photos

---

## Image Sizes

For best performance:
- **Hero image:** 1920x1080px or larger
- **Gallery images:** 1200x900px
- **Progress photos:** 800x600px minimum
- **Profile photo:** 600x800px

Compress images at [tinypng.com](https://tinypng.com) before uploading.

---

## Checklist Before Launch

- [ ] Replaced `YOUR_FORM_ID` with real Formspree ID (2 places)
- [ ] Tested form submission
- [ ] All images loading correctly
- [ ] Mobile responsive working
- [ ] Domain connected and SSL working

---

## Support

- **Render docs:** https://render.com/docs
- **Formspree docs:** https://help.formspree.io
- **Cloudflare docs:** https://developers.cloudflare.com/dns

---

Built for 101 Monroe • Brooklyn, Michigan
