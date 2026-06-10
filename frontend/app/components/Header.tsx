'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogOut } from 'lucide-react';
import Button from './Button';
import { useAuth } from './AuthContext';

type User = {
  name?: string;
  avatar?: string;
  role?: string;
};

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const syncUser = () => {
      const userStr = localStorage.getItem('user');
      setUser(userStr ? JSON.parse(userStr) : null);
    };

    syncUser();

    window.addEventListener('storage', syncUser);
    window.addEventListener('auth-changed', syncUser as EventListener);

    return () => {
      window.removeEventListener('storage', syncUser);
      window.removeEventListener('auth-changed', syncUser as EventListener);
    };
  }, []);

  useEffect(() => {
    const syncUser = () => {
      const userStr = localStorage.getItem('user');
      setUser(userStr ? JSON.parse(userStr) : null);
    };

    syncUser();
  }, [isLoggedIn]);

  const notifyAuthChange = () => {
    window.dispatchEvent(new Event('auth-changed'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsMenuOpen(false);
    notifyAuthChange();
    setIsLoggedIn(false);
    router.push('/');
  };

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
        className="flex items-center gap-3 rounded-full border border-[#262626] bg-[#101010] px-3 py-2 hover:bg-[#171717] transition-colors"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#262626] border border-[#3a3a3a] flex items-center justify-center shrink-0">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name || 'Profile'}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-white">{initial}</span>
          )}
        </div>
        <span className="text-sm font-medium text-white max-w-[160px] truncate">
          {currentUser.name || 'Profile'}
        </span>
      </Link>
    );
  };

  return (
    <header className="relative bg-[#1A1A1A] text-white border-b border-[#262626] z-50">
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
          {user ? (
            <>
              {renderUserBadge(user)}
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white hover:text-red-400 flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-[#FFD700] hover:bg-[#1A1A1C] rounded"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#d5b300]"
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
                      className="block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-white hover:text-red-400 flex items-center gap-2 justify-center"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-center text-[#00FF00] hover:bg-[#1A1A1C] rounded"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 text-center bg-[#00FF00] text-black font-semibold rounded hover:bg-[#00CC00]"
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
  );
}
