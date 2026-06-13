'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  FileText,
  BookOpen,
  Newspaper,
  Mic,
  Mail,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

const navItems = [
  { href: '/admin',          label: 'Дашборд',      icon: <LayoutDashboard size={18} /> },
  { href: '/admin/users',    label: 'Пользователи', icon: <Users size={18} /> },
  { href: '/admin/posts',    label: 'Посты',         icon: <FileText size={18} /> },
  { href: '/admin/blogs',    label: 'Блоги',         icon: <BookOpen size={18} /> },
  { href: '/admin/news',     label: 'Новости',       icon: <Newspaper size={18} /> },
  { href: '/admin/podcasts', label: 'Подкасты',      icon: <Mic size={18} /> },
  { href: '/admin/messages', label: 'Сообщения',     icon: <Mail size={18} /> },
  { href: '/admin/settings', label: 'Настройки',     icon: <Settings size={18} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/login');
      return;
    }

    try {
      const parsed = JSON.parse(userData);
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
    <div className="min-h-screen bg-[#0F0F0F] flex">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? 'w-[60px]' : 'w-64'
        } bg-[#141414] border-r border-[#393937] flex flex-col transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className={`p-4 border-b border-[#393937] flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <h1 className="text-white text-base font-bold whitespace-nowrap">
              FutureTech <span className="text-[#FFD700]">Admin</span>
            </h1>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-[#313335]"
            title={collapsed ? 'Развернуть' : 'Свернуть'}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  collapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-[#FFD700] text-black'
                    : 'text-gray-400 hover:bg-[#313335] hover:text-white'
                }`}
              >
                {item.icon}
                {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-[#393937]">
          <button
            onClick={() => { localStorage.clear(); router.push('/login'); }}
            title={collapsed ? 'Выйти' : undefined}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#DC0416] rounded-lg transition-colors duration-300 ease-in-out ${
              collapsed ? 'justify-center' : 'justify-center'
            }`}
          >
            <LogOut size={16} />
            {!collapsed && <span>Выйти</span>}
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