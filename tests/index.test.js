import { test } from 'node:test';
import assert from 'node:assert/strict';
import { toSvg } from '../src/index.js';

test('short string produces valid SVG', () => {
  const svg = toSvg('Hello');
  assert.ok(svg.startsWith('<svg'), 'should start with <svg');
  assert.ok(svg.includes('<path'), 'should contain <path');
  assert.ok(svg.includes('</svg>'), 'should end with </svg>');
});

test('URL produces valid SVG', () => {
  const svg = toSvg('https://arc.codes');
  assert.ok(svg.startsWith('<svg'));
  assert.ok(svg.includes('<path'));
});

test('empty string returns empty string', () => {
  assert.strictEqual(toSvg(''), '');
  assert.strictEqual(toSvg(null), '');
  assert.strictEqual(toSvg(undefined), '');
});

test('error correction level L', () => {
  const svg = toSvg('test', { level: 'L' });
  assert.ok(svg.startsWith('<svg'));
  assert.ok(svg.includes('<path'));
});

test('error correction level M (default)', () => {
  const svg = toSvg('test', { level: 'M' });
  assert.ok(svg.startsWith('<svg'));
});

test('error correction level Q', () => {
  const svg = toSvg('test', { level: 'Q' });
  assert.ok(svg.startsWith('<svg'));
});

test('error correction level H', () => {
  const svg = toSvg('test', { level: 'H' });
  assert.ok(svg.startsWith('<svg'));
});

test('custom size is reflected in SVG attributes', () => {
  const svg = toSvg('test', { size: 512 });
  assert.ok(svg.includes('width="512"'), 'width should be 512');
  assert.ok(svg.includes('height="512"'), 'height should be 512');
});

test('custom dark and light colors', () => {
  const svg = toSvg('test', { dark: '#ff0000', light: '#0000ff' });
  assert.ok(svg.includes('fill="#ff0000"'), 'should contain dark color');
  assert.ok(svg.includes('fill="#0000ff"'), 'should contain light color');
});

test('unicode text produces valid SVG', () => {
  const svg = toSvg('こんにちは世界 🌍');
  assert.ok(svg.startsWith('<svg'));
  assert.ok(svg.includes('<path'));
});

test('long text (near version 40 limit) produces valid SVG or empty string', () => {
  const text = 'A'.repeat(2000);
  const svg = toSvg(text);
  // Either encodes successfully or gracefully returns ''
  assert.ok(svg === '' || svg.startsWith('<svg'), 'should be SVG or empty string');
});

test('default options produce valid SVG', () => {
  const svg = toSvg('default options test');
  assert.ok(svg.startsWith('<svg'));
  assert.ok(svg.includes('width="200"'), 'default size should be 200');
  assert.ok(svg.includes('shape-rendering="crispEdges"'));
});

test('SVG contains viewBox', () => {
  const svg = toSvg('viewbox test');
  assert.ok(svg.includes('viewBox="0 0'), 'should have viewBox attribute');
});

test('path uses run-length horizontal encoding format', () => {
  const svg = toSvg('rle');
  // RLE path segments look like: M5,4h3v1h-3z
  assert.match(svg, /d="M\d+,\d+h\d+v1h-\d+z/);
});
