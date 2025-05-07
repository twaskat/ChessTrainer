import React from 'react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <main className={cn("flex-1 overflow-y-auto pt-2", className)}>
        {children}
      </main>
      
      <footer className="py-3 border-t bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            Chess Tutor © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
