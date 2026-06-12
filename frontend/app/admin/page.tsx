'use client';
import { useEffect, useState } from 'react';

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
    { label: 'Пользователи', value: stats.totalUsers, icon: '👥' },
    { label: 'Посты', value: stats.totalPosts, icon: '📝' },
    { label: 'Комментарии', value: stats.totalComments, icon: '💬' },
    { label: 'Блоги', value: stats.totalBlogs, icon: '📰' },
    { label: 'Новости', value: stats.totalNews, icon: '🗞️' },
    { label: 'Подписчики', value: stats.totalSubscribers, icon: '📧' },
    { label: 'Подкасты', value: stats.totalPodcasts, icon: '🎙️' },
    { label: 'Сообщения', value: stats.totalMessages, icon: '✉️' },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Дашборд</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="text-3xl font-bold text-white">{card.value}</div>
            <div className="text-gray-400 text-sm mt-1">{card.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Новые пользователи</h3>
          <div className="space-y-3">
            {recentUsers.map((u: any) => (
              <div key={u.id} className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm">{u.name || 'Без имени'}</p>
                  <p className="text-gray-400 text-xs">{u.email}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  u.role === 'admin' ? 'bg-blue-900 text-blue-300' : 'bg-gray-800 text-gray-400'
                }`}>{u.role}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-white font-semibold mb-4">Последние посты</h3>
          <div className="space-y-3">
            {recentPosts.map((p: any) => (
              <div key={p.id} className="flex items-center justify-between">
                <div>
                  <p className="text-white text-sm truncate max-w-[200px]">{p.title}</p>
                  <p className="text-gray-400 text-xs">{p.author?.name}</p>
                </div>
                <div className="text-xs text-gray-500">
                  ❤️ {p._count?.likes} · 💬 {p._count?.comments}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
