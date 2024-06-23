import { HEXInputValue, HEXInputOptions, RGBInput, RGBColor } from './types';

import { isValidHex, isValidRgb, parseRGBColor, toHexFormat } from './utils';

export function hexToRgb(value: HEXInputValue, options?: Partial<HEXInputOptions>): RGBColor | string {
  if (!value) {
    throw new Error(`Value is missing.`);
  }
  const opts: HEXInputOptions = { format: 'object', ...options };

  if (!isValidHex(value)) {
    throw new Error(`${value} is invalid HEX value.`);
  }

  const hex = value.replace(/^#/, '');

  const result: RGBColor = {
    red: Number.parseInt(hex.length === 3 ? hex.charAt(0).repeat(2) : hex.slice(0, 2), 16),
    green: Number.parseInt(hex.length === 3 ? hex.charAt(1).repeat(2) : hex.slice(2, 4), 16),
    blue: Number.parseInt(hex.length === 3 ? hex.charAt(2).repeat(2) : hex.slice(4, 6), 16),
    alpha: hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) : 0,
  };

  if (opts.format === 'rgb') {
    return `rgb(${result.red}, ${result.green}, ${result.blue})`;
  }

  if (opts.format === 'rgba') {
    return `rgba(${result.red}, ${result.green}, ${result.blue}, ${result.alpha})`;
  }

  return result;
}

export function rgbToHex(value: RGBInput): string {
  if (!value) {
    throw new Error(`Value is missing.`);
  }
  let red: number;
  let green: number;
  let blue: number;
  let alpha: number;

  if (typeof value === 'string') {
    const parsed = parseRGBColor(value);
    red = parsed.red;
    green = parsed.green;
    blue = parsed.blue;
    alpha = parsed.alpha;
  } else {
    red = typeof value.red === 'string' ? Number(value.red) : value.red;
    green = typeof value.green === 'string' ? Number(value.green) : value.green;
    blue = typeof value.blue === 'string' ? Number(value.blue) : value.blue;
    alpha = typeof value.alpha === 'string' ? Number(value.alpha) : value.alpha ?? 0;
  }

  if (!isValidRgb(red, green, blue, alpha)) {
    throw new Error(`Invalid RGB/RGBA color format: ${typeof value === 'string' ? value : JSON.stringify(value)}`);
  }

  return toHexFormat(red, green, blue, alpha);
}
