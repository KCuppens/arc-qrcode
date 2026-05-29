# @arc-lang/qrcode

Zero-dependency QR code generator. Produces inline SVG with a **single `<path>` element** using horizontal run-length encoding. ISO 18004 byte-mode, versions 1–40. Works in Node.js, browsers, and Arc.

## Install

```bash
npm install @arc-lang/qrcode
```

## Usage

### ESM (Node.js / bundlers)

```js
import { toSvg } from '@arc-lang/qrcode';

const svg = toSvg('https://arc.codes');
document.getElementById('qr').innerHTML = svg;
```

### CommonJS

```js
const { toSvg } = require('@arc-lang/qrcode');

const svg = toSvg('Hello, world!', { size: 300, level: 'H' });
```

### Browser (script tag)

```html
<script type="module">
  import { toSvg } from 'https://cdn.jsdelivr.net/npm/@arc-lang/qrcode/src/index.js';
  document.getElementById('qr').innerHTML = toSvg('https://arc.codes', { size: 256 });
</script>
```

### Arc

```arc
import QRCode from "../../stdlib/qrcode"

QRCode value="https://arc.codes"
QRCode value="https://arc.codes" size=300 level="H"
QRCode value="https://arc.codes" dark="#1a1a2e" light="#eef"
```

## API

### `toSvg(text, options?): string`

Generates a QR code SVG string.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | `string` | — | The text to encode |
| `options.size` | `number` | `200` | Rendered width and height in pixels |
| `options.dark` | `string` | `'#000000'` | Dark module color (any valid CSS color) |
| `options.light` | `string` | `'#ffffff'` | Light (background) color |
| `options.level` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | Error correction level |

Returns an SVG string on success, or an empty string `""` if:
- `text` is empty
- `text` is too long to encode in QR version 40

**Error correction levels:**
- `L` — 7% data recovery
- `M` — 15% data recovery (default)
- `Q` — 25% data recovery
- `H` — 30% data recovery

## Performance

Unlike naive implementations that emit N² individual `<rect>` elements (one per module), this library emits a **single `<path>` element** using horizontal run-length encoding. Consecutive dark modules in each row become one horizontal path segment (`Mх,yhrunv1h-runz`), dramatically reducing DOM node count and improving render performance for complex codes.

For a version 40 QR code (177×177 = 31,329 modules), a naive `<rect>` approach emits thousands of elements. This library emits exactly **one `<path>`**.

## How it works

1. **Encode** — UTF-8 bytes are packed into QR byte-mode codewords with the chosen error correction level.
2. **Reed-Solomon** — EC codewords are generated using GF(256) arithmetic and interleaved per the ISO 18004 spec.
3. **Matrix** — Finder patterns, timing patterns, alignment patterns, format/version info, and data bits are placed on the grid.
4. **Mask selection** — All 8 masks are evaluated using the ISO 18004 penalty scoring rules; the best mask is applied.
5. **SVG path** — The matrix is scanned row by row; consecutive dark runs are emitted as a single horizontal path segment.

## License

MIT — see [LICENSE](./LICENSE)
