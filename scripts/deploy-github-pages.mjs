import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const origin = 'https://github.com/Zakirali765/zakir-digital-portfolio.git';
const git = (args, cwd = root) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
if (git(['remote', 'get-url', 'origin']) !== origin) {
  throw new Error('The origin must be the ZAKIR DIGITAL portfolio repository.');
}
await import('./build-github-pages.mjs');
mkdirSync(resolve(root, 'work'), { recursive: true });
const staging = mkdtempSync(resolve(root, 'work/pages-publish-'));
if (git(['ls-remote', '--heads', 'origin', 'gh-pages'])) {
  git(['clone', '--single-branch', '--branch', 'gh-pages', origin, staging]);
  git(['rm', '-r', '--ignore-unmatch', '.'], staging);
} else {
  git(['init', '-b', 'gh-pages'], staging);
  git(['remote', 'add', 'origin', origin], staging);
}
git(['config', 'user.name', 'Zakir Ali'], staging);
git(['config', 'user.email', 'Zakirali765@users.noreply.github.com'], staging);
cpSync(resolve(root, 'work/github-pages-dist'), staging, { recursive: true });
writeFileSync(resolve(staging, '.nojekyll'), '');
git(['add', '--', '.'], staging);
if (git(['status', '--porcelain'], staging)) {
  git(['commit', '-m', 'Publish ZAKIR DIGITAL portfolio'], staging);
  git(['push', '-u', 'origin', 'gh-pages'], staging);
}
console.log(JSON.stringify({
  url: 'https://zakirali765.github.io/zakir-digital-portfolio/',
  branch: 'gh-pages',
  commit: git(['rev-parse', 'HEAD'], staging),
}));
