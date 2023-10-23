import { customAlphabet } from 'nanoid';
import { clsx, type ClassValue } from 'clsx';
import ms from 'ms';

import { PUBLIC_ID_ALPHABET, PUBLIC_ID_LENGTH } from './constants';

export const generatePublicId = () => {
  return customAlphabet(PUBLIC_ID_ALPHABET, PUBLIC_ID_LENGTH)();
};

export const cx = (...inputs: ClassValue[]) => {
  return clsx(...inputs);
};

export const timeAgo = (timestamp: Date, timeOnly?: boolean): string => {
  return `${ms(Date.now() - new Date(timestamp).getTime())}${timeOnly ? '' : ' ago'}`;
};

type QueryParams = { [key: string]: string | number | boolean | undefined };

export const buildQueryString = (params: QueryParams): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
    .join('&');
  return query ? `?${query}` : '';
};
