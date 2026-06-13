'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import { useAuth } from './AuthContext';
import { User } from '../lib/user';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'News', href: '/news' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'Resources', href: '/resources' },
  ];

  const renderUserBadge = (currentUser: User, onClick?: () => void) => {
    const initial = currentUser.name?.[0]?.toUpperCase() || 'U';

    return (
      <Link
        href="/profile"
        onClick={onClick}
        className="group flex items-center gap-2.5 rounded-xl border border-[#2E2E2E] bg-[#111] px-2 py-1.5 hover:border-[#3a3a3a] hover:bg-[#161616] transition-all duration-200"
      >
        {/* Аватар */}
        <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-[#1F1F1F] border border-[#333] flex items-center justify-center shrink-0">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name || 'Profile'}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs font-bold text-white">{initial}</span>
          )}
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-[#111]" />
        </div>

        {/* Имя + подпись */}
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium text-white max-w-[120px] truncate">
            {currentUser.name || 'Profile'}
          </span>
          <span className="text-[11px] text-[#555] group-hover:text-[#777] transition-colors">
            {currentUser.role === 'admin' ? 'Administrator' : 'My profile'}
          </span>
        </div>

        {/* Стрелка */}
        <svg className="w-3.5 h-3.5 text-[#444] group-hover:text-[#666] transition-colors ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    );
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-[#1A1A1A] text-white border-b border-[#262626] z-50">
        <div className="flex items-center justify-between px-6 py-5 lg:px-[80px] lg:py-[24px]">
          <Link href="/" className="flex-shrink-0">
            <img src="/icons/Logo.svg" alt="Logo" className="h-10 w-auto" />
          </Link>

          <nav className="hidden lg:flex gap-1 bg-[#0F0F0F] p-1 rounded-[12px] border border-[#262626]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-6 py-3 rounded-[10px] text-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-[#141414] text-white border border-[#262626]'
                      : 'text-[#7E7E81] hover:text-white border border-transparent'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {(isLoggedIn && user) ? (
              <>
                {renderUserBadge(user)}
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#d5b300] font-semibold transition-colors"
                  >
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-[#FFD700] hover:bg-[#1A1A1C] rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-[#d5b300] transition-colors"
                >
                  Register
                </Link>
              </>
            )}
            <Link href="/contact">
              <Button />
            </Link>
          </div>

          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#1A1A1A] border-b border-[#262626] lg:hidden animate-in fade-in slide-in-from-top-5">
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-xl ${
                    pathname === link.href ? 'text-white font-bold' : 'text-[#7E7E81]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#262626] space-y-2">
                {user ? (
                  <>
                    {renderUserBadge(user, () => setIsMenuOpen(false))}
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#d5b300] text-center font-semibold transition-colors"
                      >
                        Admin
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-center text-[#FFD700] hover:bg-[#1A1A1C] rounded-lg transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-center bg-[#FFD700] text-black font-semibold rounded-lg hover:bg-[#d5b300] transition-colors"
                    >
                      Register
                    </Link>
                  </>
                )}
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Отступ под фиксированную шапку */}
      <div className="h-[89px] lg:h-[88px]" />
    </>
  );
}