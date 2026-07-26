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
sessionStorage.removeItem("portfolio-intro-seen");
location.reload();
```

## Interaction

- Drag the identity card with a mouse or finger.
- Release it to let it swing back into place.
- Focus the card and use the arrow keys for keyboard interaction.
- Press `Home` or `Escape` to reset its position.

## Deployment

Push the folder to GitHub, import the repository into Vercel, and deploy with the default Next.js settings.
