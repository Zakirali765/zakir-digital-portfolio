# ZAKIR DIGITAL portfolio

Complete local-only Astro/TypeScript portfolio. Created at `C:\Users\Admin\Desktop\zakir-digital-portfolio`. No deployment or external submission was performed.

The current revision uses the owner's UK-focused copy: UK local businesses, three clearly labelled fictional demonstrations, separate redesign/new-website/optional-assistant offers, scoped pricing and an eight-step process. The bracketed sample suggestions were replaced with accurate descriptions of the implemented plumbing, electrical and garage demos. No clinic demo or client relationship is claimed.

The enquiry composer now includes name, business name, email, town/service area, optional current website, service interest and message. It opens editable email/WhatsApp drafts and supports copying/downloading. A real Send enquiry service was not supplied; direct submission is not connected, and no sent-success message is shown.

## Run locally

Requirements: Node.js 22.12+ (this build uses Node 24.15.0), npm. Versions are pinned by package-lock.json.

```powershell
cd C:\Users\Admin\Desktop\zakir-digital-portfolio
npm ci
npm run dev
```

Production build and preview:

```powershell
npm run check
npm run lint
npm run build
npm run preview
```

The production preview uses `http://127.0.0.1:4321/`. The preview remains running at handover. To restart it, use `npm run preview`; stop a managed Astro preview with `npx astro preview stop` if required. Development normally uses the same port when the preview is stopped.

```powershell
npm test
```

Tests use installed Google Chrome through Playwright. If Chrome is unavailable, install Playwright Chromium with `npx playwright install chromium`, then change `channel: 'chrome'` in playwright.config.ts and capture scripts to the default Chromium launcher. The download was not required on this machine because Google Chrome was available.

## Content and contacts

- `src/data/site.ts`: business facts, navigation, verified contacts, support answers and FAQ.
- `src/data/projects.ts`: three fictional project identities, services, briefs, features and design decisions.
- `src/pages/index.astro`: finished homepage copy and section composition.
- `src/styles/global.css`: portfolio design tokens, typography, layout, responsive behaviour and focus states.
- `src/styles/uk-revision.css`: UK revision layouts, pricing scope, service-sector list and process timeline.
- `src/styles/demos.css`: individual demo identities.
- `src/scripts/brief.ts`: local composer and draft/copy/download logic. No server submission or browser persistence.

Source files are formatted for owner editing. `npm run format` applies the included Prettier/Astro formatter.

Contact destinations were verified on 9 October 2026 from the existing reference’s compiled JavaScript: `zakirdigitalco@gmail.com` and `https://wa.me/923140217680`. Source: https://zakirali765.github.io/zakir-digital/assets/index-w-M9ryN0.js. Opening an email/WhatsApp draft is not sending an enquiry. WhatsApp draft content is passed to WhatsApp in its URL when the owner/visitor chooses that action. The tests prevent these external links from opening.

If contacts are removed from the central config, corresponding draft buttons disappear. Copy/download remain functional and explain that contact destinations are unavailable. No guessed destinations are substituted.

## Routes

Homepage `/`; case studies `/work/hearth-and-pipe/`, `/work/current-electrical/`, `/work/shift-motorworks/`; complete demos at the same slugs under `/demos/`; `/privacy/`; and generated `/404.html` for the hosting provider’s 404 handler. Astro preview shows the custom 404 on unknown paths. No concepts are described as clients.

To add a project, extend projects.ts, provide verified metadata and an appropriate implemented demo. Add its desktop/mobile captures and responsive image variants. Preserve visible status beside its title. Do not introduce private real-business work into public pages without authorization.

## Images and screenshots

All runtime images/fonts are local. Supplied portrait and logo are optimized; photos are illustrative licensed stock. Ownership/source records are in `docs/ASSETS.md`, and font licences are in public/fonts. The complex supplied logo appears in the founder section; the header uses an original typographic wordmark and the favicon uses ZD.

`node scripts/capture-demos.mjs` records actual local demos at 1440×1000 and 390×844, saves WebP screenshots and 720/1080px desktop variants. `node scripts/capture-review.mjs` captures all nine desktop/mobile page templates. Both require a running local preview. `scripts/optimize-assets.mjs` preserves the original input paths used in this session; update them when replacing assets on another computer. Existing optimized assets are already included, so that script is not required to build.

The social card is a genuine screenshot of the implemented homepage. No generated interface screenshots or fake evidence are used.

## Publication preparation (owner action, not performed)

The deployment origin is intentionally unset. The local build has no canonical URL, uses noindex/nofollow and disallows crawlers. Its sitemap is an empty valid urlset. Once the owner chooses a genuine target, set SITE_URL to its actual origin. BASE_PATH defaults to `/`; use a trailing slash for a subpath. In PowerShell:

```powershell
$env:SITE_URL = 'YOUR_ACTUAL_ORIGIN'
$env:BASE_PATH = '/'
npm run build
```

For subfolder hosting, set BASE_PATH to the actual folder (for example, the locally tested `/portfolio/`). SITE_URL should be the origin; canonical paths, image/script URLs and sitemap entries include BASE_PATH. Build output is `dist/`; serve its contents at the configured base. BUILD_DIR can redirect verification builds without changing the normal production folder. A subpath build was served locally at `http://127.0.0.1:4322/portfolio/` and checked; it was not published.

Configured public builds permit indexing of portfolio/case-study/privacy pages. All fictional business demos retain noindex/nofollow and are excluded from the sitemap and robots crawl paths. Review the privacy wording for the selected host before publication, and configure the host’s custom 404 mapping to 404.html.

No connected Botpress embed was installed. The optional assistant is clearly labelled Interactive demo and uses deterministic verified service answers. A future real integration needs the owner’s verified configuration and a privacy review reflecting its actual behaviour.

## Verification

See `docs/QA.md` for actual command results, measurement conditions, screenshot review, repair notes and limits. `docs/BUILD-CHECKLIST.md` records completion. Production code is complete; choosing the publication address/host remains an owner decision.
