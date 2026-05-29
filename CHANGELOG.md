# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] — 2026-05-29

### Added
- `toSvg(text, options)` — zero-dependency SVG QR code generator
- ISO 18004 byte-mode, versions 1–40
- All 4 error correction levels: L, M, Q, H
- Single `<path>` SVG output using horizontal run-length encoding
- GF(256) Reed-Solomon error correction
- All 8 ISO masks evaluated; best mask selected by penalty score
- ESM + CommonJS dual export (`import` / `require`)
- TypeScript types (`index.d.ts`)
- Arc stdlib widget (`arc/qrcode.arc`)
- Color sanitization to prevent XSS via color options
