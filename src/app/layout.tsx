import { fontLogo, fontMono, fontSans } from '@/lib/fonts';
import { cx } from '@/lib/utils';
import './globals.css';

export const metadata = {
  title: 'supatodos',
  description: 'supa-powered todo lists',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cx(fontSans.variable, fontLogo.variable, fontMono.variable, 'font-sans bg-neutral-900 text-neutral-200')}
      >
        {children}
      </body>
    </html>
  );
}
