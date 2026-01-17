'use client';

import { usePathname } from 'next/navigation';

interface NavbarProps {
  onHomeClick: () => void;
  onHelpClick: () => void;
}

export default function Navbar({ onHomeClick, onHelpClick }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center">
        <button
          onClick={onHomeClick}
          disabled={isHome}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
            isHome
              ? 'text-gray-400 cursor-default'
              : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span className="font-medium">Home</span>
        </button>
        <div className="flex-1" />
        <span className="text-sm text-gray-500">Ralph PRD Generator</span>
        <button
          onClick={onHelpClick}
          className="ml-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
          aria-label="Help"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">Help</span>
        </button>
      </div>
    </nav>
  );
}
