import { fontSans } from '@/lib/fonts';
import { cx } from '@/lib/utils';
import './globals.css';

export const metadata = {
  title: 'supatodos',
  description: 'supa-powered todo lists',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cx(fontSans.variable, 'font-sans bg-neutral-bg text-neutral-text')}>{children}</body>
    </html>
  );
}
