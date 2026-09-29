# Local validation — 29 September 2026

The homepage and `/work/egy-metro-guide/` are implemented and exported to `out/`. Public deployment was not performed.

## Build and functional checks

| Check | Result |
| --- | --- |
| TypeScript (`npm run typecheck`) | Passed |
| ESLint (`npm run lint`) | Passed, no warnings |
| Production static export | Passed, including Next.js TypeScript checking |
| Full Playwright suite | 22/22 passed |
| Homepage checks after final placeholder-spacing adjustment | 6/6 passed |
| axe WCAG A/AA checks | No violations on either page at 1280px and 390px |
| Responsive screenshots and document overflow | Both pages checked at 1440, 1280, 1024, 768, 390, and 360px |
| Internal links and structured data | 41 links checked; valid Person and CreativeWork JSON-LD |

Browser checks covered direct case-study loading and reloads, homepage and case-study anchors, mobile menu operation, keyboard focus containment, Escape dismissal and focus return, the skip link, the reading disclosure, reduced-motion styles, readable content without JavaScript, and intentional HTTP 404 handling. No browser page errors were recorded.

Visual and source review covered the heading hierarchy, focus visibility, contrast, screenshot labels, and diagram reading order. The architecture and app journey use ordered lists and become vertical on mobile. The hero's abstract SVG labels were checked at tablet and mobile sizes. A collision between the featured placeholder caption and its decorative footer label was corrected and rechecked at all six widths.

The full browser report is `test-results/results.json` (also retained in `.cache/full-browser-results.json`). Screenshots are in `test-results/screenshots/`; additional visual-review crops are in `.cache/review-latest/`.

## Lighthouse and environment limitation

Latest production-export audit, using Lighthouse 13.5.0 with mobile defaults and installed Brave / Chromium 154 on Windows:

| Page | Performance | Accessibility | Best Practices | SEO | LCP | Total blocking time | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | 62 | 100 | 100 | 100 | 3.68 s | 1,308 ms | 0 |
| Case study | 63 | 100 | 100 | 100 | 3.66 s | 1,538 ms | 0 |

**The 90+ Performance target is not verified.** Accessibility, Best Practices, and SEO exceed the 95+ targets. The audit command intentionally exits with a failure when any target is missed.

Local performance measurements varied substantially. The preceding audit measured 85/79 Performance and about 492/666 ms of blocking time. Lighthouse's host CPU benchmark fell from 1,132 in that run to 520 and 316 in the latest run, indicating materially different available CPU capacity. Next.js/React startup accounts for much of the measured scripting time. This variation limits conclusions about deployment performance; it does not establish that the target has been achieved.

Real optimizations already applied include self-hosted preloaded Manrope, static server-rendered content, gzip in the production preview, small navigation and motion enhancements, no animation dependency, no initial motion layout measurements, and reserved dimensions/lazy loading for future images. Verify Performance again on a stable environment and the chosen static host once configured. Do not treat a single favorable run as a guarantee.

HTML and JSON Lighthouse reports are saved under `test-results/lighthouse/`. Node.js 24 was used; the optional `NEXT_WORKER_THREADS=1` build setting avoids restricted child-process spawning without disabling type checking.

## Content and publication audit

- 250K+ is consistently labeled as downloads, not an active-user count. The unconfirmed 4.9/5 rating is omitted.
- Android and iOS availability are stated; missing store destinations are not clickable.
- The other explorations section was removed at the owner's request after the initial validation.
- App screenshot slots are explicitly labeled. No invented app captures, incidents, revenue, experiments, or performance gains were added.
- Missing social, email, and CV destinations do not produce empty links or fake downloads.
- No placeholder public domain, canonical URLs, sitemap entries, or absolute social image URLs are emitted without a configured real origin.

Before publication, supply genuine screenshots, contact/social destinations, store links, an optional real CV, the public domain, and confirmed examples for the three marked case-study editorial sections. See `README.md` for editing and static deployment instructions.
