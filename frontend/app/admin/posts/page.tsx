'use client';
import { useEffect, useState } from 'react';

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
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Посты ({posts.length})</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-800">
            <tr className="text-gray-400 text-sm">
              <th className="text-left p-4">Заголовок</th>
              <th className="text-left p-4">Автор</th>
              <th className="text-left p-4">Лайки</th>
              <th className="text-left p-4">Комментарии</th>
              <th className="text-left p-4">Дата</th>
              <th className="text-left p-4">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="p-4"><p className="text-white max-w-[250px] truncate">{p.title}</p></td>
                <td className="p-4">
                  <p className="text-gray-300 text-sm">{p.author?.name || '—'}</p>
                  <p className="text-gray-500 text-xs">{p.author?.email}</p>
                </td>
                <td className="p-4 text-gray-400 text-sm">❤️ {p.likesCount}</td>
                <td className="p-4 text-gray-400 text-sm">💬 {p.commentsCount}</td>
                <td className="p-4 text-gray-400 text-xs">{new Date(p.createdAt).toLocaleDateString('ru')}</td>
                <td className="p-4">
                  <button onClick={() => deletePost(p.id)} className="text-red-400 hover:text-red-300 text-sm">
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
