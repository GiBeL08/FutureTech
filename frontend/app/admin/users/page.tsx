'use client';
import { useEffect, useState } from 'react';

const API = 'http://localhost:3001/api';

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

  const changeRole = async (id: string, role: string) => {
    await fetch(`${API}/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ role }),
    });
    fetchUsers();
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Удалить пользователя?')) return;
    await fetch(`${API}/admin/users/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchUsers();
  };

  if (loading) return <div className="p-8 text-white">Загрузка...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Пользователи ({users.length})</h2>
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-gray-800">
            <tr className="text-gray-400 text-sm">
              <th className="text-left p-4">Пользователь</th>
              <th className="text-left p-4">Роль</th>
              <th className="text-left p-4">Посты</th>
              <th className="text-left p-4">Дата</th>
              <th className="text-left p-4">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="p-4">
                  <p className="text-white">{u.name || '—'}</p>
                  <p className="text-gray-400 text-xs">{u.email}</p>
                </td>
                <td className="p-4">
                  <select
                    value={u.role}
                    onChange={(e) => changeRole(u.id, e.target.value)}
                    className="bg-gray-800 text-white text-xs rounded px-2 py-1 border border-gray-700"
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="p-4 text-gray-400 text-sm">{u._count?.posts}</td>
                <td className="p-4 text-gray-400 text-xs">
                  {new Date(u.createdAt).toLocaleDateString('ru')}
                </td>
                <td className="p-4">
                  <button onClick={() => deleteUser(u.id)} className="text-red-400 hover:text-red-300 text-sm">
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
