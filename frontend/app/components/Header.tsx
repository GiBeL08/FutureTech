'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button';
import { useAuth } from './AuthContext';
import { User } from '../lib/User';

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
        className="group flex items-center h-[48px] w-full lg:w-auto gap-2.5 rounded-[10px] border border-[#262626] bg-[#0F0F0F] px-4 hover:border-[#3a3a3a] hover:bg-[#161616] transition-all duration-200"
      >
        <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-[#1F1F1F] border border-[#333] flex items-center justify-center shrink-0">
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt={currentUser.name || 'Profile'} className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs font-bold text-white">{initial}</span>
          )}
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-[#0F0F0F]" />
        </div>
        <div className="flex flex-col leading-tight text-left">
          <span className="text-sm font-medium text-white max-w-[120px] truncate">
            {currentUser.name || 'Profile'}
          </span>
          <span className="text-[11px] text-[#555] group-hover:text-[#777] transition-colors">
            {currentUser.role === 'admin' ? 'Administrator' : 'My profile'}
          </span>
        </div>
        <svg className="w-3.5 h-3.5 text-[#444] group-hover:text-[#666] transition-colors ml-auto lg:ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-[24px] h-[48px] flex items-center justify-center rounded-[8px] text-base transition-all duration-300 ease-out border ${
                    isActive
                      ? 'bg-[#141414] text-white font-medium border-[#333333] shadow-sm'
                      : 'text-[#7E7E81] border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {(isLoggedIn && user) ? (
              <>
                {renderUserBadge(user)}
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="flex items-center justify-center h-[48px] px-6 bg-[#FFD700] text-black rounded-[10px] hover:bg-[#e6c200] font-semibold text-base transition-colors"
                  >
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/login" className="flex items-center justify-center h-[48px] px-6 text-[#7E7E81] hover:text-white rounded-[10px] border border-[#262626] bg-[#0F0F0F] text-base transition-colors">
                  Login
                </Link>
                <Link href="/register" className="flex items-center justify-center h-[48px] px-6 bg-[#FFD700] text-black font-semibold rounded-[10px] hover:bg-[#e6c200] text-base transition-colors">
                  Register
                </Link>
              </>
            )}
            <Link href="/contact" className="flex h-[48px] [&>*]:h-full">
              <Button />
            </Link>
          </div>

          <button 
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none z-50" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Мобильное меню с улучшенной плавной анимацией */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#1A1A1A] border-b border-[#262626] lg:hidden animate-in fade-in slide-in-from-top-2 duration-500 ease-in-out">
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-xl transition-colors ${pathname === link.href ? 'text-white font-bold' : 'text-[#7E7E81] hover:text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#262626] space-y-3">
                {user ? (
                  <>
                    {renderUserBadge(user, () => setIsMenuOpen(false))}
                    {user.role === 'admin' && (
                      <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center w-full h-[48px] px-6 bg-[#FFD700] text-black rounded-[10px] hover:bg-[#e6c200] font-semibold transition-colors text-base">
                        Admin
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center w-full h-[48px] px-6 text-[#7E7E81] bg-[#0F0F0F] border border-[#262626] rounded-[10px] transition-colors text-base">
                      Login
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center w-full h-[48px] px-6 bg-[#FFD700] text-black font-semibold rounded-[10px] hover:bg-[#e6c200] transition-colors text-base">
                      Register
                    </Link>
                  </>
                )}
                
                <Link 
                  href="/contact" 
                  onClick={() => setIsMenuOpen(false)} 
                  className="flex h-[48px] w-full [&>*]:w-full [&>*]:h-full [&>*]:flex [&>*]:items-center [&>*]:justify-center"
                >
                  <Button />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <div className="h-[89px] lg:h-[88px]" />
    </>
  );
}