'use client';

import { useState } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react'; // Иконки для мобилки
import Button from "./Button"; 

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'News', href: '/news' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'Resources', href: '/resources' },
  ];

  return (
    <header className="relative bg-[#1A1A1A] text-white border-b border-[#262626] z-50">
      {/* Контейнер с адаптивными отступами: на мобилке 24px, на десктопе 162px */}
      <div className="flex items-center justify-between px-6 py-5 lg:px-[80px] lg:py-[24px]">
        
        {/* Логотип */}
        <Link href="/" className="flex-shrink-0">
          <img src="/icons/Logo.svg" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* ДЕСТОПНАЯ НАВИГАЦИЯ (скрыта на мобилке: hidden, видна на планшете/ПК: lg:flex) */}
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

        {/* Кнопка Contact (скрыта на мобилке) */}
        <div className="hidden lg:flex items-center">
          <Link href="/contact">
            <Button />
          </Link>
        </div>

        {/* КНОПКА-БУРГЕР (видна только на мобилке) */}
        <button 
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* МОБИЛЬНОЕ МЕНЮ (выпадает при клике) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#1A1A1A] border-b border-[#262626] lg:hidden animate-in fade-in slide-in-from-top-5">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-xl ${pathname === link.href ? 'text-white font-bold' : 'text-[#7E7E81]'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#262626]">
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                <Button />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}