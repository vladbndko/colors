export type RGBInput =
  | { red: string | number; green: string | number; blue: string | number; alpha?: string | number }
  | string;

export type RGBColor = { red: number; green: number; blue: number; alpha: number };

export type HEXInputValue = string;

export type HEXInputOptions = {
  format: 'object' | 'rgb' | 'rgba';
};
