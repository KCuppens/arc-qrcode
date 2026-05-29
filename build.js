import { readFileSync, writeFileSync, mkdirSync } from 'fs';
const src = readFileSync('src/index.js', 'utf8');
// Convert ESM exports to CJS
const cjs = src
  .replace(/^export function /gm, 'function ')
  .replace(/^export default toSvg$/m, '')
  + '\nmodule.exports = { toSvg };\nmodule.exports.default = toSvg;\n';
mkdirSync('dist', { recursive: true });
writeFileSync('dist/index.cjs', cjs);
console.log('Built dist/index.cjs');
