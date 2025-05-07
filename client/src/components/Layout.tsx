import React from 'react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <main className={cn("flex-1 overflow-y-auto pt-1", className)}>
        {children}
      </main>
      
      <footer className="py-1 border-t border-[#1a2742] bg-[#0d111d]">
        <div className="container mx-auto text-center">
          <p className="text-[10px] text-[#00e6ff]" style={{ textShadow: '0 0 3px rgba(0, 230, 255, 0.3)' }}>
            Chess Tutor © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
