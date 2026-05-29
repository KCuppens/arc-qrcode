export interface QRCodeOptions {
  /** Rendered pixel size. Default: 200 */
  size?: number
  /** Dark module color. Default: '#000000' */
  dark?: string
  /** Light (background) color. Default: '#ffffff' */
  light?: string
  /** Error correction level. Default: 'M' */
  level?: 'L' | 'M' | 'Q' | 'H'
}

/**
 * Generate a QR code as an inline SVG string.
 * Returns an empty string for empty input or if the text is too long for QR v40.
 */
export function toSvg(text: string, options?: QRCodeOptions): string
export default toSvg
