export interface QRCodeOptions {
  /** Rendered pixel size. Default: `200` */
  size?: number
  /** Dark module color (any valid CSS color string). Default: `'#000000'` */
  dark?: string
  /** Light (background) color (any valid CSS color string). Default: `'#ffffff'` */
  light?: string
  /**
   * Error correction level:
   * - `'L'` — 7% data recovery
   * - `'M'` — 15% data recovery (default)
   * - `'Q'` — 25% data recovery
   * - `'H'` — 30% data recovery
   */
  level?: 'L' | 'M' | 'Q' | 'H'
}

/**
 * Generate a QR code as an inline SVG string.
 *
 * @param text - The text or URL to encode. Must be a non-empty string.
 * @param options - Optional rendering options (size, colors, EC level).
 * @returns An SVG string, or `""` if `text` is empty or exceeds QR v40 capacity.
 *
 * @example
 * ```ts
 * import { toSvg, type QRCodeOptions } from '@arc-lang/qrcode';
 *
 * const opts: QRCodeOptions = { size: 256, level: 'H', dark: '#1a1a2e' };
 * const svg: string = toSvg('https://arc.codes', opts);
 * document.getElementById('qr')!.innerHTML = svg;
 * ```
 */
export function toSvg(text: string, options?: QRCodeOptions): string

export default toSvg
