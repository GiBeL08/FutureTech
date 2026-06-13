'use client';
import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Trash2, FileText } from 'lucide-react';

const API = 'http://localhost:3001/api';

export default function AdminPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchPosts = () => {
    fetch(`${API}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((res) => { setPosts(res.data); setLoading(false); });
  };

  useEffect(() => { fetchPosts(); }, []);

  const deletePost = async (id: string) => {
    if (!confirm('Удалить пост?')) return;
    await fetch(`${API}/posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPosts();
  };

  if (loading) return <div className="p-8 text-white">Загрузка...</div>;

  return (
    <div className="p-8 h-screen flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-6 shrink-0">
        Посты
        <span className="ml-2 text-base text-gray-500 font-normal">{posts.length}</span>
      </h2>

      <div className="bg-[#1A1A1A] border border-[#393937] rounded-xl overflow-hidden flex flex-col min-h-0 flex-1">
        {/* Фиксированный заголовок таблицы */}
        <div className="shrink-0 border-b border-[#393937]">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wide">
                <th className="text-left px-4 py-3 w-[35%]">Заголовок</th>
                <th className="text-left px-4 py-3 w-[20%]">Автор</th>
                <th className="text-left px-4 py-3 w-[10%]">Лайки</th>
                <th className="text-left px-4 py-3 w-[10%]">Коммент.</th>
                <th className="text-left px-4 py-3 w-[15%]">Дата</th>
                <th className="text-left px-4 py-3 w-[10%]">Действия</th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Скроллируемое тело */}
        <div className="overflow-y-auto flex-1">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <FileText size={32} className="mb-2 opacity-40" />
              <p className="text-sm">Постов пока нет</p>
            </div>
          ) : (
            <table className="w-full">
              <tbody className="divide-y divide-[#393937]">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="px-4 py-3 w-[35%]">
                      <p className="text-white text-sm max-w-[250px] truncate">{p.title}</p>
                    </td>
                    <td className="px-4 py-3 w-[20%]">
                      <p className="text-gray-300 text-sm">{p.author?.name || '—'}</p>
                      <p className="text-gray-500 text-xs truncate max-w-[150px]">{p.author?.email}</p>
                    </td>
                    <td className="px-4 py-3 w-[10%]">
                      <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <Heart size={13} className="text-red-400 shrink-0" />
                        {p.likesCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 w-[10%]">
                      <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <MessageCircle size={13} className="text-blue-400 shrink-0" />
                        {p.commentsCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 w-[15%] text-gray-400 text-xs">
                      {new Date(p.createdAt).toLocaleDateString('ru')}
                    </td>
                    <td className="px-4 py-3 w-[10%]">
                      <button
                        onClick={() => deletePost(p.id)}
                        className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm transition-colors group"
                      >
                        <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
                        <span>Удалить</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}