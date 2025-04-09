import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition-colors">
          XR Tools For Ed
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href="/submit" className="hover:text-gray-300 transition-colors">
            Submit Tool
          </Link>
          <Link href="/blog" className="hover:text-gray-300 transition-colors">
            Blog
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
