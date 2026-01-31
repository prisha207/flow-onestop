import { ReactNode } from 'react';
import Header from './Header';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
