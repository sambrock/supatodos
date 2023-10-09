import { Fragment } from 'react';
import { UserHeader } from '@/components/layout/UserHeader';

export const metadata = {
  title: 'supatodos',
  description: 'supa-powered todo lists',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <UserHeader />
      {children}
    </Fragment>
  );
}
