import { readFileSync, writeFileSync, mkdirSync } from 'fs';

let src;
try {
  src = readFileSync('src/index.js', 'utf8');
} catch (err) {
  console.error('build: failed to read src/index.js:', err.message);
  process.exit(1);
}

const cjs = src
  .replace(/^export function /gm, 'function ')
  .replace(/^export default toSvg$/m, '')
  + '\nmodule.exports = { toSvg };\nmodule.exports.default = toSvg;\n';

try {
  mkdirSync('dist', { recursive: true });
  writeFileSync('dist/index.cjs', cjs);
} catch (err) {
  console.error('build: failed to write dist/index.cjs:', err.message);
  process.exit(1);
}

console.log('Built dist/index.cjs');
