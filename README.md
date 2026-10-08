# SCRATCHLZ. — System 001

Premium responsive fashion storefront based on the supplied SCRATCHLZ. identity system: void black, milk white, steel gray, ice blue, technical typography, and the cat-star signature mark.

## Run locally

```bash
npm ci
npm run dev
```

The development server runs on `http://localhost:5173` by default.

To preview from another device on the same Wi-Fi network:

```bash
npm run dev -- --hostname 0.0.0.0
```

## Production checks

```bash
npm run lint
npm run build
```

## Deploy to Vercel

Import the GitHub repository in Vercel and keep the detected framework as
**Next.js**. No custom build command or output directory is required.

## Project shape

- `app/` — page shell, metadata, and responsive visual system
- `components/scratchlz-store.tsx` — storefront, overlays, filters, search, cart, and interactions
- `public/brand/` — supplied identity boards and extracted campaign/product crops
- `scripts/extract-brand-assets.ps1` — repeatable extraction of web-ready crops from the source identity plates

The source material remains in `D:\Scratchlz\idenity`. Re-run the extraction script after replacing any of the original boards.
