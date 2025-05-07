import React from 'react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">Chess Tutor</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Tutorials</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          </nav>
        </div>
      </header>
      
      <main className={cn("flex-1 overflow-y-auto", className)}>
        {children}
      </main>
      
      <footer className="py-6 border-t bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Chess Tutor - Learn chess with interactive tutorials © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
