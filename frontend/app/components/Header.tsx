'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import Button from "./Button"; 

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'News', href: '/news' },
    { name: 'Podcasts', href: '/podcasts' },
    { name: 'Resources', href: '/resources' },
  ];

  return (
    <header className="bg-[#1A1A1A] text-white p-4 flex items-center justify-between border-b border-[#262626] px-[162px] py-[24px]">
      <div>
        <img src="/icons/Logo.svg" alt="Logo"  />
      </div>

      <nav className="flex gap-4 bg-[#1A1A1A] p-1.5 rounded-[12px]">
        {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-6 py-3 rounded-[10px] text-lg transition-all duration-200 ${
              isActive
                ? 'bg-[#141414] text-white border border-[#333]' // Обводка ТОЛЬКО тут
                : 'text-[#7E7E81] hover:text-white border border-transparent' // У остальных бордера нет
            }`}
          >
            {link.name}
          </Link>
          );
        })}
      </nav>

      <div className="flex items-center">
        <Link href="/contact">
          <Button />
        </Link>
      </div>
    </header>
  );
}