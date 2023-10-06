import { customAlphabet } from 'nanoid';

import { PUBLIC_ID_ALPHABET, PUBLIC_ID_LENGTH } from './constants';

export const generatePublicId = () => {
  return customAlphabet(PUBLIC_ID_ALPHABET, PUBLIC_ID_LENGTH)();
};
