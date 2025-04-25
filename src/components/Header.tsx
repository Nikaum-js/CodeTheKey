"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full py-6 px-8 flex items-center justify-between border-b border-neutral-800">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Code The Key"
          width={32}
          height={32}
          style={{ width: 'auto', height: 'auto' }}
        />
        <span className="text-xl font-bold text-neutral-50">Code The Key</span>
      </Link>

      {status === "loading" ? (
        <div className="w-[180px] h-[42px] bg-neutral-800/80 rounded-lg animate-pulse" />
      ) : session ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || "Avatar"}
                width={36}
                height={36}
                className="rounded-full"
              />
            )}
            <span className="text-neutral-50 font-medium hidden sm:block">
              {session.user?.name}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`text-neutral-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl overflow-hidden z-[100]">
              <button
                onClick={() => signOut()}
                className="w-full flex items-center gap-3 px-4 py-3 text-neutral-100 hover:bg-neutral-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Sair</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => signIn("github")}
          className="flex items-center gap-3 bg-neutral-800/80 backdrop-blur-sm px-5 py-2.5 rounded-lg hover:bg-neutral-700/80 transition-all duration-200 border border-neutral-700/50 hover:border-neutral-600/50 shadow-lg hover:shadow-neutral-800/20 hover:-translate-y-0.5"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-neutral-50">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.203 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"></path>
          </svg>
          <span className="text-neutral-50 font-medium">Entrar com GitHub</span>
        </button>
      )}
    </header>
  );
}
