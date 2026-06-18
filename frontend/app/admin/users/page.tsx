'use client';
import { useEffect, useState } from 'react';
import { Users, FileText, Trash2 } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchUsers = () => {
    fetch(`${API}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((res) => { setUsers(res.data); setLoading(false); });
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id: string) => {
    if (!confirm('Удалить пользователя?')) return;
    await fetch(`${API}/admin/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  const getInitials = (name: string, email: string) => {
    if (name && name !== '—') return name.slice(0, 2).toUpperCase();
    return email?.slice(0, 2).toUpperCase() ?? '??';
  };

  if (loading) return <div className="p-8 text-white">Загрузка...</div>;

  return (
    <div className="p-8 h-screen flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-6 shrink-0">
        Пользователи
        <span className="ml-2 text-base text-gray-500 font-normal">{users.length}</span>
      </h2>

      <div className="bg-[#1A1A1A] border border-[#393937] rounded-xl overflow-hidden flex flex-col min-h-0 flex-1">
        {/* Фиксированный заголовок */}
        <div className="shrink-0 border-b border-[#393937]">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-xs uppercase tracking-wide">
                <th className="text-left px-4 py-3 w-[35%]">Пользователь</th>
                <th className="text-left px-4 py-3 w-[15%]">Роль</th>
                <th className="text-left px-4 py-3 w-[10%]">Посты</th>
                <th className="text-left px-4 py-3 w-[15%]">Дата</th>
                <th className="text-left px-4 py-3 w-[25%]">Действия</th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Скроллируемое тело */}
        <div className="overflow-y-auto flex-1">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-gray-500">
              <Users size={32} className="mb-2 opacity-40" />
              <p className="text-sm">Пользователей пока нет</p>
            </div>
          ) : (
            <table className="w-full">
              <tbody className="divide-y divide-[#393937]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-white/[0.03] transition-colors group">

                    {/* Пользователь */}
                    <td className="px-4 py-3 w-[35%]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#2A2A2A] border border-[#393937] flex items-center justify-center text-xs font-medium text-gray-300 shrink-0">
                          {getInitials(u.name, u.email)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white text-sm truncate">{u.name || '—'}</p>
                          <p className="text-gray-500 text-xs truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Роль */}
                    <td className="px-4 py-3 w-[15%]">
                      <span
                        className={`text-xs rounded-full px-3 py-1 inline-block ${
                          u.role === 'admin'
                            ? 'bg-[#FFD700]/10 text-[#FFD700]'
                            : 'bg-[#2A2A2A] text-gray-300'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    {/* Посты */}
                    <td className="px-4 py-3 w-[10%]">
                      <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <FileText size={13} className="text-gray-500 shrink-0" />
                        {u._count?.posts ?? 0}
                      </span>
                    </td>

                    {/* Дата */}
                    <td className="px-4 py-3 w-[15%] text-gray-400 text-xs">
                      {new Date(u.createdAt).toLocaleDateString('ru')}
                    </td>

                    {/* Действия */}
                    <td className="px-4 py-3 w-[25%]">
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-[#393937] text-red-400 hover:text-red-300 hover:border-red-400/40 hover:bg-red-400/5 transition-all"
                      >
                        <Trash2 size={12} />
                        Удалить
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