# Portfolio with Draggable Lanyard Card

A responsive Next.js portfolio inspired by the supplied reference videos.

## Included features

- Multilingual greeting opening animation
- Hero identity card that drops in after the opening
- Draggable card with mouse and touch support
- Spring return, momentum, rotation, and swinging lanyard
- Keyboard support using the arrow keys
- Sticky glass navigation
- About, skills, experience, projects, awards, and contact sections
- English/Indonesian content toggle
- Responsive mobile layout
- Reduced-motion accessibility support
- No additional animation or physics dependency

## Run locally

1. Install Node.js 20 or newer.
2. Open this folder in VS Code.
3. Run:

```bash
npm install
npm run dev
```

4. Open `http://localhost:3000`.

## Personalize the content

Edit:

```text
data/portfolio.ts
```

Replace the name, email, location, social links, skills, experience, projects, and awards.

The interactive hero card is located at:

```text
components/DraggableLanyardCard.tsx
```

Its visual styling and mobile sizing are in:

```text
app/globals.css
```

## Show the opening again

The greeting is shown once per browser tab/session. To replay it, open DevTools and run:

```js
sessionStorage.removeItem("rr-intro-seen");
location.reload();
```

The flag is also read by a small inline script in `app/layout.tsx` before first
paint, so a returning visitor sees the page without waiting for React to
hydrate.

## Interaction

- Drag the identity card with a mouse or finger.
- Release it to let it swing back into place.
- Focus the card and use the arrow keys for keyboard interaction.
- Press `Home` or `Escape` to reset its position.

## Deployment

Deployed to Vercel with the default Next.js settings. Two things in this project
need a Node runtime, so a plain static host will not do:

- `next/image` optimises the hero portrait per screen size. Without a server it
  falls back to shipping the full 923&times;1416 file to every device.
- The `headers()` block in `next.config.ts` carries the Content-Security-Policy,
  `Permissions-Policy` and HSTS. On a static host those headers have to be moved
  into the host's own config instead.

Steps:

1. Import `byochiram/portfolio-v2` into Vercel. Framework detection picks up
   Next.js; no build settings need changing.
2. Add `kakros.id` under Project Settings &rarr; Domains, then point the domain's
   DNS at Vercel as instructed there.
3. Leave `NEXT_PUBLIC_SITE_URL` unset. `app/layout.tsx` already falls back to
   `https://kakros.id`, so Open Graph URLs are correct without it. Only set it if
   the domain changes, or to make previews advertise their own `vercel.app` URL.
4. After the first deploy, open the site and each of the four games once and
   check the console. The CSP also applies to the bundled game pages, and they
   register service workers.

`Strict-Transport-Security` is sent without `preload`. Add it only when you are
sure `kakros.id` will stay HTTPS-only, because preload lists are slow to undo.
