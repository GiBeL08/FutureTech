'use client';
import { useEffect, useState } from 'react';

const API = 'http://localhost:3001/api';

export default function AdminMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  const fetchMessages = () => {
    fetch(`${API}/admin/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((res) => { setMessages(res.data); setLoading(false); });
  };

  useEffect(() => { fetchMessages(); }, []);

  const deleteMessage = async (id: string) => {
    if (!confirm('Удалить сообщение?')) return;
    await fetch(`${API}/admin/messages`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    setSelected(null);
    fetchMessages();
  };

  if (loading) return <div className="p-8 text-white">Загрузка...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Сообщения ({messages.length})</h2>
      <div className="flex gap-6">
        <div className="w-1/2 bg-[#1A1A1A] border border-[#393937] rounded-xl overflow-hidden">
          <div className="divide-y divide-[#7D7D03]">
            {messages.map((m) => (
              <div key={m.id} onClick={() => setSelected(m)}
                className={`p-4 cursor-pointer hover:bg-[#3D3F42]/50 transition-colors ${selected?.id === m.id ? 'bg-[#3D3F42]' : ''}`}>
                <div className="flex justify-between items-start">
                  <p className="text-white text-sm font-medium">{m.firstName} {m.lastName}</p>
                  <span className="text-gray-500 text-xs">{new Date(m.createdAt).toLocaleDateString('ru')}</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">{m.email}</p>
                <p className="text-gray-500 text-xs mt-1 truncate">{m.message}</p>
              </div>
            ))}
            {messages.length === 0 && <p className="p-6 text-gray-500 text-center">Сообщений нет</p>}
          </div>
        </div>
        <div className="w-1/2 bg-[#1A1A1A] border border-[#393937] rounded-xl p-6">
          {selected ? (
            <>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-white font-semibold text-lg">{selected.firstName} {selected.lastName}</h3>
                  <p className="text-gray-400 text-sm">{selected.email}</p>
                  {selected.phone && <p className="text-gray-400 text-sm">{selected.phone}</p>}
                </div>
                <span className="text-gray-500 text-xs">{new Date(selected.createdAt).toLocaleString('ru')}</span>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm leading-relaxed">{selected.message}</p>
              </div>
              <div className="flex gap-3">
                <a href={`mailto:${selected.email}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">Ответить</a>
                <button onClick={() => deleteMessage(selected.id)} className="px-4 py-2 bg-red-900/50 hover:bg-red-900 text-red-400 text-sm rounded-lg transition-colors">Удалить</button>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">Выберите сообщение</div>
          )}
        </div>
      </div>
    </div>
  );
}
