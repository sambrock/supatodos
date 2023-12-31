export const BASE_URL = 'http://localhost:3000';

export const PUBLIC_ID_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';
export const PUBLIC_ID_LENGTH = 12;

export const PRIORITY_LEVELS = new Map([
  [1, { label: 'Low', shorthand: '' }],
  [2, { label: 'Medium', shorthand: '!' }],
  [3, { label: 'High', shorthand: '!!' }],
] as const);

export const TAG_COLORS = new Map([['neutral', { hex: '#ffffff' }]] as const);
