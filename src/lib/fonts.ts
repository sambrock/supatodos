import { Mulish as FontSans } from 'next/font/google';

export const fontSans = FontSans({
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  subsets: ['latin'],
});
