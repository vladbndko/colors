export function isValidHex(value: string): boolean {
  const hexColorRegExp = /^#?([\dA-Fa-f]{3}|[\dA-Fa-f]{6}|[\dA-Fa-f]{8})$/;
  return hexColorRegExp.test(value);
}

export function isValidRgb(red: number, green: number, blue: number, alpha?: number): boolean {
  const isValidValue = (value: number) => !Number.isNaN(value) && value >= 0 && value <= 255;
  return (alpha ? isValidValue(alpha) : true) && isValidValue(red) && isValidValue(green) && isValidValue(blue);
}

export function parseRGBColor(input: string) {
  const [red, green, blue, alpha] = input
    .trim()
    .replace(/^(rgb|rgba)?\(/, '')
    .replace(/\)$/, '')
    .split(',')
    .map((part) => Number(part.trim()));

  return { red, green, blue, alpha: alpha ?? 0 };
}

const componentToHex = (component: number) => {
  const hex = component.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

export function toHexFormat(red: number, green: number, blue: number, alpha?: number) {
  return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}${alpha ? componentToHex(alpha) : ''}`;
}
