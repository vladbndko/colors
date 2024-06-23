import { expect, test } from 'vitest';
import { hexToRgb, rgbToHex } from '../src';

const exampleColors = [
  {
    hex: '#ffffff',
    value: { red: 255, green: 255, blue: 255, alpha: 0 },
    rgb: 'rgb(255, 255, 255)',
    rgba: 'rgba(255, 255, 255, 0)',
  },
  {
    hex: '#0c4a6e',
    value: { red: 12, green: 74, blue: 110, alpha: 0 },
    rgb: 'rgb(12, 74, 110)',
    rgba: 'rgba(12, 74, 110, 0)',
  },
  {
    hex: '#7c3aed12',
    value: { red: 124, green: 58, blue: 237, alpha: 18 },
    rgb: 'rgb(124, 58, 237)',
    rgba: 'rgba(124, 58, 237, 18)',
  },
];

test('hexToRgb', () => {
  for (const exampleColor of exampleColors) {
    const { value, hex, rgb, rgba } = exampleColor;

    expect(hexToRgb(hex)).toStrictEqual(value);
    expect(hexToRgb(hex, { format: 'rgb' })).toStrictEqual(rgb);
    expect(hexToRgb(hex, { format: 'rgba' })).toStrictEqual(rgba);

    expect(() => hexToRgb('')).toThrow();
    expect(() => hexToRgb('#WWW')).toThrow();
    expect(() => hexToRgb('eeeeex')).toThrow();
  }
});

test('rgbToHex', () => {
  for (const exampleColor of exampleColors) {
    const { value, rgb, rgba } = exampleColor;

    expect(rgbToHex(value)).toBe(exampleColor.hex);
    expect(rgbToHex(rgb)).toBe(exampleColor.hex.slice(0, 7));
    expect(rgbToHex(rgba)).toBe(exampleColor.hex);

    expect(() => rgbToHex('rgb(')).toThrow();
    expect(() => rgbToHex({ red: -100, green: 20, blue: 124 })).toThrow();
    expect(() => rgbToHex({ red: 100, green: 20, blue: 256 })).toThrow();
    expect(() => rgbToHex(' rgb(-1,256,255) ')).toThrow();
  }
});
