import React, { ReactNode } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { GithubIcon } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">FontScope</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              aria-label="GitHub repository"
            >
              <GithubIcon size={20} />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>FontScope - A beautiful way to preview and explore Google Fonts</p>
        </div>
      </footer>
    </div>
  );
};