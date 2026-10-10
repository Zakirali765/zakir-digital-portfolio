import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
execFileSync(process.execPath, [resolve(root, 'node_modules/astro/bin/astro.mjs'), 'build'], {
  cwd: root,
  stdio: 'inherit',
  env: {
    ...process.env,
    SITE_URL: 'https://zakirali765.github.io',
    BASE_PATH: '/zakir-digital-portfolio/',
    BUILD_DIR: './work/github-pages-dist',
  },
});
