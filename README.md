# Osama Hamdy — Product Builder Portfolio

A statically generated Next.js portfolio with an editorial homepage and a dedicated Egy Metro Guide case study. Built with TypeScript, Tailwind CSS, locally served Manrope, and small progressive motion enhancements.

## Run locally

Requires Node.js 22.19 or newer (Node.js 24 LTS recommended) and npm. The Lighthouse development tool requires at least Node.js 22.19.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:3000. To inspect the actual static export:

```sh
npm run build
npm run preview
```

The preview server serves `out/`, including direct routes and a real 404 page. It is a local verification tool, not a production hosting service.

In environments that restrict child processes, set `NEXT_WORKER_THREADS=1` before building to use Next.js worker threads without skipping TypeScript checks.

## Edit content

`src/content/portfolio.ts` holds personal details, links, education, project facts, screenshot slots, features, architecture labels, skills, books, and journey milestones. The two page components contain their surrounding editorial narrative.

- Set `person.links[].href` to real LinkedIn/GitHub URLs, a `mailto:` email address, and a same-origin CV path such as `/osama-hamdy-cv.pdf`. Add the actual PDF to `public/`. Missing links stay hidden.
- Set `metro.storeLinks[].href` to the correct app listings. Do not invent destinations.
- Put genuine, compressed app screenshots under `public/images/`. Set each screenshot's `src`, descriptive `alt`, and real pixel `width` and `height`. Supply a crop with the intended phone-screen aspect ratio. The renderer reserves the dimensions and lazy-loads the images. Next.js image optimization is disabled because this is a portable static export; optimize files before adding them.
- `metro.rating` intentionally remains `null` and is not displayed. A confirmed platform and value are required before adding a visible rating. Downloads must not be relabeled as active users.
- Replace the three case-study editorial prompts with confirmed accounts of a product decision, an engineering tradeoff, and a production lesson. Update their labels when the placeholder is replaced; do not present prompts as completed case-study evidence.

Colors, typography, component styling, and responsive layouts live in `src/app/globals.css`. Reusable components are in `src/components/`.

Manrope is self-hosted under the SIL Open Font License. Its copyright and license notice are included in `public/licenses/Manrope-OFL.txt` and travel with the static export.

## Metadata and deployment

Set `NEXT_PUBLIC_SITE_URL` to the real public HTTPS origin, for example through your hosting environment or a local `.env.local`, then rebuild. The configured origin enables canonical links, absolute Open Graph/Twitter images, and sitemap entries. No placeholder domain is emitted by default; the local sitemap has no entries.

`public/og.png` is the original 1200 × 630 social image; `public/og.svg` is its editable source. Regenerate both with `npm run social-image` after changing the script. No app screenshots are generated.

Deploy the contents of `out/` to a static host. Preserve directory-index routing so `/work/egy-metro-guide/` serves its `index.html`. Configure the host to serve `404.html` for missing pages. No Node.js server or secrets are needed in production. Enable gzip or Brotli compression, use long immutable caching for `/_next/static/` assets, and revalidate HTML when a deployment changes. The local preview server includes gzip compression for representative transfer sizes.

Before publication, add the real contact destinations, store links, CV if desired, screenshot assets, and confirmed case-study examples. The site deliberately keeps those gaps visible or unpublished.

## Validation

See [VALIDATION.md](VALIDATION.md) for recorded results and the outstanding local Lighthouse Performance limitation.

```sh
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm test
```

Browser tests run against the static build, cover both routes at 1440/1280/1024/768/390/360px, run axe accessibility checks, and verify keyboard navigation, the mobile dialog, internal navigation, direct reloads, reduced motion, no-JavaScript content, and 404 handling. Full-page captures are written to `test-results/screenshots/`. If using an already installed Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable.

With `npm run preview` running in another terminal:

```sh
npm run audit
```

The Lighthouse script checks both pages with mobile defaults and writes HTML/JSON reports to `test-results/lighthouse/`. Its targets are 90+ Performance and 95+ Accessibility, Best Practices, and SEO. Review automated reports alongside visual and keyboard checks.

No analytics, third-party tracking, backend, contact submission service, or theme switcher is included.
