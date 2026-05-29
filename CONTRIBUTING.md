# Contributing

## Setup

```bash
git clone https://github.com/KCuppens/arc-qrcode.git
cd arc-qrcode
npm install
```

## Running tests

```bash
npm test
```

## Building the CJS bundle

```bash
npm run build
```

## Guidelines

- **Zero dependencies** — the package must remain dependency-free. Do not add runtime dependencies.
- **Single `<path>` output** — the SVG renderer must continue emitting one path element, not individual `<rect>` elements.
- **ISO 18004 compliance** — all changes to encoding, error correction, or matrix placement must remain spec-compliant.
- **Tests** — add tests for any new behavior. All 19 tests must pass before submitting a PR.

## Submitting a PR

1. Fork the repo and create a branch from `master`
2. Make your changes
3. Run `npm test` — all tests must pass
4. Run `npm run build` — `dist/index.cjs` must rebuild without errors
5. Open a pull request with a clear description of the change

## Reporting bugs

Open an issue at https://github.com/KCuppens/arc-qrcode/issues with:
- The input text and options you used
- The output you received
- The output you expected
