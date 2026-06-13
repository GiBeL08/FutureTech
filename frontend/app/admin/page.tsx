'use client';
import { useEffect, useState } from 'react';
import {
  Users,
  FileText,
  MessageCircle,
  BookOpen,
  Newspaper,
  UserCheck,
  Mic,
  Mail,
  Heart,
} from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((res) => { setData(res.data); setLoading(false); });
  }, []);

  if (loading) return <div className="p-8 text-white">Загрузка...</div>;
  if (!data) return <div className="p-8 text-red-400">Ошибка загрузки</div>;

  const { stats, recentUsers, recentPosts } = data;

  const cards = [
    { label: 'Пользователи', value: stats.totalUsers,       icon: <Users size={22} className="text-blue-400" /> },
    { label: 'Посты',         value: stats.totalPosts,       icon: <FileText size={22} className="text-green-400" /> },
    { label: 'Комментарии',  value: stats.totalComments,    icon: <MessageCircle size={22} className="text-yellow-400" /> },
    { label: 'Блоги',         value: stats.totalBlogs,       icon: <BookOpen size={22} className="text-purple-400" /> },
    { label: 'Новости',       value: stats.totalNews,        icon: <Newspaper size={22} className="text-red-400" /> },
    { label: 'Подписчики',   value: stats.totalSubscribers, icon: <UserCheck size={22} className="text-teal-400" /> },
    { label: 'Подкасты',     value: stats.totalPodcasts,    icon: <Mic size={22} className="text-orange-400" /> },
    { label: 'Сообщения',    value: stats.totalMessages,    icon: <Mail size={22} className="text-pink-400" /> },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Дашборд</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-[#1A1A1A] border border-[#393937] rounded-xl p-5">
            <div className="mb-2">{card.icon}</div>
            <div className="text-3xl font-bold text-white">{card.value}</div>
            <div className="text-gray-400 text-sm mt-1">{card.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Новые пользователи */}
        <div className="bg-[#1A1A1A] border border-[#393937] rounded-xl p-6 flex flex-col">
          <h3 className="text-white font-semibold mb-4 shrink-0">
            Новые пользователи
            <span className="ml-2 text-xs text-gray-500 font-normal">{recentUsers.length}</span>
          </h3>
          <div className="overflow-y-auto max-h-72 space-y-3 pr-1 scrollbar-thin scrollbar-thumb-[#393937] scrollbar-track-transparent">
            {recentUsers.map((u: any) => (
              <div key={u.id} className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm">{u.name || 'Без имени'}</p>
                  <p className="text-gray-400 text-xs">{u.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full shrink-0 ml-2 ${
                  u.role === 'admin' ? 'bg-[#FFD700] text-black' : 'bg-[#3D3F42] text-gray-200'
                }`}>{u.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Последние посты */}
        <div className="bg-[#1A1A1A] border border-[#393937] rounded-xl p-6 flex flex-col">
          <h3 className="text-white font-semibold mb-4 shrink-0">
            Последние посты
            <span className="ml-2 text-xs text-gray-500 font-normal">{recentPosts.length}</span>
          </h3>
          <div className="overflow-y-auto max-h-72 space-y-3 pr-1 scrollbar-thin scrollbar-thumb-[#393937] scrollbar-track-transparent">
            {recentPosts.map((p: any) => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="min-w-0 mr-3">
                  <p className="text-white text-sm truncate">{p.title}</p>
                  <p className="text-gray-400 text-xs">{p.author?.name}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0">
                  <span className="flex items-center gap-1">
                    <Heart size={12} className="text-red-400" /> {p._count?.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={12} className="text-gray-400" /> {p._count?.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}