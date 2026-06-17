'use client';

import { useEffect, useState } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AdminNews() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API}/admin/news`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((res) => {
        setNews(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) return;
    
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API}/admin/news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNews(news.filter((n) => n.id !== id));
    } catch (err) {
      console.error('Error deleting news:', err);
    }
  };

  if (loading) return <div className="p-8 text-white">Загрузка...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Управление Новостями</h2>
        <button className="flex items-center gap-2 bg-[#FFD700] text-black px-4 py-2 rounded-lg hover:bg-[#e6c200] font-semibold">
          <Plus size={18} />
          Добавить новость
        </button>
      </div>

      <div className="bg-[#1A1A1A] border border-[#393937] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#393937] bg-[#141414]">
              <th className="px-6 py-4 text-left text-white font-semibold">Заголовок</th>
              <th className="px-6 py-4 text-left text-white font-semibold">Автор</th>
              <th className="px-6 py-4 text-left text-white font-semibold">Дата публикации</th>
              <th className="px-6 py-4 text-left text-white font-semibold">Действия</th>
            </tr>
          </thead>
          <tbody>
            {news.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                  Нет новостей
                </td>
              </tr>
            ) : (
              news.map((article) => (
                <tr key={article.id} className="border-b border-[#393937] hover:bg-[#1F1F1F]">
                  <td className="px-6 py-4 text-white">{article.title}</td>
                  <td className="px-6 py-4 text-gray-400">{article.author?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="p-2 hover:bg-[#2A2A2A] rounded-lg text-blue-400">
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-2 hover:bg-[#2A2A2A] rounded-lg text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}