'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/admin', label: 'Дашборд', icon: '📊' },
  { href: '/admin/users', label: 'Пользователи', icon: '👥' },
  { href: '/admin/posts', label: 'Посты', icon: '📝' },
  { href: '/admin/blogs', label: 'Блоги', icon: '📰' },
  { href: '/admin/news', label: 'Новости', icon: '🗞️' },
  { href: '/admin/podcasts', label: 'Подкасты', icon: '🎙️' },
  { href: '/admin/messages', label: 'Сообщения', icon: '✉️' },
  { href: '/admin/settings', label: 'Настройки', icon: '⚙️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');

  console.log('token:', token);        // добавь для дебага
  console.log('userData:', userData);  // добавь для дебага

  if (!token || !userData) {
    router.push('/login');
    return;
  }

  try {
    const parsed = JSON.parse(userData);
    console.log('role:', parsed.role); // добавь для дебага
    if (parsed.role !== 'admin') {
      router.push('/');
      return;
    }
    setUser(parsed);
  } catch {
    router.push('/login');
  }
}, []);

  if (!user) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-white text-xl">Загрузка...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-white text-xl font-bold">FutureTech Admin</h1>
          <p className="text-gray-400 text-sm mt-1">{user.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => { localStorage.clear(); router.push('/login'); }}
            className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            🚪 Выйти
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}