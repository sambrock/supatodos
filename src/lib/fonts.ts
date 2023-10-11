import { Mulish as FontSans, Young_Serif as FontLogo } from 'next/font/google';

export const fontSans = FontSans({
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  subsets: ['latin'],
});

export const fontLogo = FontLogo({
  weight: ['400'],
  variable: '--font-logo',
  subsets: ['latin'],
})
