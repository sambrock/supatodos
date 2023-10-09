import { customAlphabet } from 'nanoid';
import { clsx, type ClassValue } from 'clsx';

import { PUBLIC_ID_ALPHABET, PUBLIC_ID_LENGTH } from './constants';

export const generatePublicId = () => {
  return customAlphabet(PUBLIC_ID_ALPHABET, PUBLIC_ID_LENGTH)();
};

export const cx = (...inputs: ClassValue[]) => {
  return clsx(...inputs);
};
