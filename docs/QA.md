# Verification record

## Public GitHub Pages publication — 10 October 2026

Public source repository: https://github.com/Zakirali765/zakir-digital-portfolio

Live website: https://zakirali765.github.io/zakir-digital-portfolio/

The owner requested public source and a live site, superseding the earlier local-only/private instructions. GitHub confirmed that the repository is public, the default branch is `main`, and GitHub Pages serves the root of `gh-pages`. Its build finished with status `built`, no reported error, and deployment commit `4d010a145b4212477705007aa7647402aff13604`. No existing reference repository was changed.

The GitHub Pages build uses the real origin and `/zakir-digital-portfolio/` base. Source commits use the owner's GitHub noreply email. Generated files, dependencies, private env files, test output and working files remain excluded from `main`. The site privacy page now identifies GitHub Pages hosting and its security-related IP logging.

- Astro check: 38 files, zero errors, warnings or hints. Lint and the nine-page production build passed.
- Local and live publication checks each passed all eight normal routes, 95 internal links and 18 decoded images, including the case studies and fictional demonstrations.
- Live canonical URL, index/follow homepage metadata, robots exclusions for demos and sitemap URLs passed. Fictional demonstrations remain noindex and absent from the sitemap.
- Live homepage has no horizontal overflow at 360, 390, 768, 1024 and 1440 pixels. Mobile menu opening and Escape closing passed. Custom 404 returned HTTP 404 with the portfolio's content. The published hosting/privacy wording passed.
- No JavaScript runtime errors or unresolved resource failures were found. Chrome cancelled two superseded responsive image requests with `net::ERR_ABORTED` while the viewport changed; the selected images decoded and the separate route/image audit passed.
- Desktop and mobile screenshots were saved from the live site. The live site was opened and visually checked in the in-app browser.

The existing enquiry composer still opens editable email/WhatsApp drafts; publishing does not add a submission backend. GitHub Pages updates use `npm run deploy:pages`; pushing source to `main` alone does not publish a new compiled build. Publication checks did not send any enquiries. Previous Lighthouse results below describe the local UK revision, not a new live performance measurement.

## Local verification — 9 October 2026

Project: `C:\Users\Admin\Desktop\zakir-digital-portfolio`. Tests used the served production build at `http://127.0.0.1:4321/`, not only the development server. No publication was performed.

## UK copy revision

The owner's UK-focused SEO and page copy was applied on 9 October 2026. Navigation now includes Services, Sample Work, Pricing, Process, About and Contact. The hero/outline CTAs, service-sector list, three service offers, scoped pricing/inclusions/exclusions, eight-step process, founder text, FAQ and footer were updated. The actual plumbing, electrical and garage samples are explicitly demonstrations for fictional businesses, not paying clients; every homepage sample has a direct live-demo link.

The expanded local composer validates name, business name, email, town/service area, optional website and message. All identity/location fields are included in generated drafts and downloaded text. No direct Send enquiry endpoint was provided. The actions remain accurately labelled Open email draft/Open WhatsApp draft. The privacy description matches this implementation. No test enquiries are sent.

Build, type check and lint pass. The revised production build passes **16/16 browser tests**, including a new test for the UK title/navigation/scope, eight process steps, demonstration status and expanded email validation. All nine routes pass the 45 width/route combinations, 200% text enlargement and zoom-equivalent reflow checks, and no-JavaScript/reduced-motion checks. The 390×844 first viewport includes the new headline, useful outline action and actual work preview. All nine axe audits have zero violations. Runtime verification found zero page/console errors, failed requests or unsolicited external requests.

Fresh desktop/mobile captures of all nine pages and genuine demo screenshots were regenerated. The existing in-app browser tab was refreshed and the new UK title and hero were verified. A new isolated performance measurement is recorded below; the original figures further down are retained as the initial-build record.

UK revision Lighthouse 13.5.0, same installed Chrome/mobile throttling conditions as the initial run, with no other automated browser jobs running: **Performance 98, Accessibility 100, Best Practices 100, SEO 66**. LCP **1.5s**, TBT **0ms**, CLS **0.087**. The local SEO score remains reduced by intentional noindex/robots restrictions. This is the current revision's measurement; it replaces the initial 99 performance figure for the present version.

## Build and code checks

- `npm run build`: PASS; 9 static HTML pages plus robots.txt and sitemap.xml generated.
- `npm run check`: PASS; 0 errors, 0 warnings, 0 hints.
- `npm run lint`: PASS.
- Node 24.15.0, npm 11.12.1, Astro 7.3.8; dependency versions recorded in package-lock.json.
- An initial deprecated ESLint version/helper warning was fixed by using ESLint 10 and its supported defineConfig helper.

## Browser smoke coverage

`npm test`: 15/15 PASS on the complete production site (approximately 1.3–1.7 minutes across runs). After a final mobile navigation focus improvement, the 3 affected keyboard/menu/no-JavaScript checks were rerun and passed; the full 15-check suite also passed again after source formatting.

`node scripts/check-runtime.mjs`: all 9 routes passed with zero page/console errors, zero failed network requests and zero unsolicited external requests. The expected HTTP 404 for the custom error page is excluded from the console-error count.

Coverage includes all 9 routes, internal links and fragment targets, local image loading, custom 404 handling, mobile menu expanded state/initial focus/Escape/dismissal/link focus, FAQ opening, every assistant answer/reset, empty/malformed brief validation, clipboard success/denial fallback, actual downloaded text content, verified encoded email and WhatsApp draft destinations, edited draft text, missing contact config, local-only demo enquiry messages, skip navigation, focus styles, reduced motion and core no-JavaScript content. Draft links were intercepted during testing so no test enquiry was opened externally or sent.

All 9 routes were checked at 360, 390, 768, 1024 and 1440px widths: 45 route/viewport combinations, with no unintended horizontal overflow. The 390×844 first viewport contains the proposition, a useful CTA and part of the implemented project preview.

Every template also passed 200% root text enlargement at 1440px and a 200% zoom-equivalent reflow check (720 CSS px, device scale factor 2, representing a 1440px display). The browser toolbar zoom itself was not separately driven. No physical-device or Safari testing was performed.

With JavaScript disabled, the content and navigation remain readable; native details remain available. Brief fields are disabled and draft/tool actions hidden, with a direct-contact explanation. This prevents the browser from falling back to a GET form submission.

## Accessibility and visual repairs

axe-core WCAG 2 A/AA and WCAG 2.1 AA audits on all 9 distinctive pages: zero violations after repairs. Initial secondary metadata and some demo text colours had insufficient contrast; those colours were corrected. The final Lighthouse visible-label/name diagnostic was also addressed.

Desktop/mobile screenshots were captured for all 9 pages: 18 complete page captures. Representative homepage, case study, each demo identity, privacy and 404 layouts were inspected. Lazy images were scrolled into view and decoded before final full-page captures; the initial screenshot harness had otherwise left below-fold images unloaded. Final captures contain the actual images. No fake screenshots were created.

The automated accessibility audit is useful coverage, not a claim of legal certification or a substitute for a complete manual screen-reader audit.

## Root and subpath configuration

Root build: all tested internal routes and local assets resolve at the production preview.

Alternative build used BASE_PATH=/portfolio/, SITE_URL=http://127.0.0.1:4322, BUILD_DIR=./work/subpath-dist and a temporary local static server. `node scripts/check-subpath.mjs` passed 8 normal routes, 87 internal links, 18 image references, correct local canonical URLs, robots paths and sitemap entries. The temporary subpath server was stopped after checking; the primary preview remains running.

The normal local build has no invented canonical domain. It is deliberately noindex/nofollow with Disallow: / and an empty valid sitemap until the owner provides a real deployment origin. Fictional business demos remain noindex and outside the sitemap even when a public origin is configured.

## Performance measurements

Lighthouse 13.5.0, installed Google Chrome 154 on Windows, served local production homepage. Mobile emulation: 412×823 CSS px at 1.75 device scale factor, simulated network throttling (150ms RTT / about 1.6Mbps) and 4× CPU slowdown. Actual reports are saved under work/qa and the final report is included in the handover outputs.

Initial run: Performance 98, Accessibility 100, Best Practices 100, SEO 66; LCP 2.1s, CLS 0.035, TBT 30ms. A later measurement made concurrently with browser tests/screenshots returned Performance 88 (TBT 410ms), Accessibility 100 and Best Practices 100. The final isolated run is recorded below. Results depend on the host and measurement conditions; they are not guaranteed live-site scores.

Final isolated run of the final production build: **Performance 99, Accessibility 100, Best Practices 100, SEO 66**. LCP **1.7s**, CLS **0.035**, TBT **0ms**. No other automated browser or screenshot jobs ran during this final measurement. The homepage meets the requested Performance 90+ / Accessibility 95+ measurement aims under these conditions.

SEO’s local score is reduced by the intentional noindex/robots restriction. The actual publication origin is intentionally unset; this is not concealed behind an invented live address.

## Screenshot and reproduction commands

```powershell
npm run build
npm run preview
npm test
node scripts/capture-demos.mjs
node scripts/capture-review.mjs
$env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npx lighthouse http://127.0.0.1:4321/ --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo --output=json --output=html --output-path=work/qa/lighthouse-mobile-isolated --quiet
```

Final viewport screenshots and full-page versions are saved in the chat outputs folder. All template captures are also retained in the project’s work/qa folder. Demo screenshots used in the portfolio are under public/images. No performance report claims were fabricated.

## Owner prerequisites and verification limits

Genuine email and WhatsApp destinations were obtained and are configured. There is no missing-contact blocker. The owner must choose an actual publication target before configuring indexing and canonical URLs, and review the privacy description for that host. No deployment was requested or performed.

The support assistant is a complete deterministic interactive example; there is no connected Botpress service or paid integration. Email application handling and delivery/WhatsApp sending were not tested because sending was outside the authorized task. The generated destinations and message contents were tested locally. Keyboard/accessibility/performance evidence is from installed Chrome on this Windows machine.
