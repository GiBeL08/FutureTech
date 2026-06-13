'use client';
import { useEffect, useState } from 'react';
import { Mail, Trash2, Reply, Phone, Clock, Inbox, User } from 'lucide-react';

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

  const getInitials = (first: string, last: string) =>
    `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase() || '?';

  if (loading) return <div className="p-8 text-white">Загрузка...</div>;

  return (
    <div className="p-8 h-screen flex flex-col">
      <h2 className="text-2xl font-bold text-white mb-6 shrink-0">
        Сообщения
        <span className="ml-2 text-base text-gray-500 font-normal">{messages.length}</span>
      </h2>

      <div className="flex gap-4 flex-1 min-h-0">

        {/* Список сообщений */}
        <div className="w-2/5 bg-[#1A1A1A] border border-[#393937] rounded-xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-[#393937] shrink-0 flex items-center gap-2">
            <Inbox size={15} className="text-[#FFD700]" />
            <span className="text-sm text-gray-400">Входящие</span>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-[#252525]">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                <Inbox size={28} className="mb-2 opacity-30" />
                <p className="text-sm">Сообщений нет</p>
              </div>
            ) : (
              messages.map((m) => {
                const isActive = selected?.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelected(m)}
                    className={`p-4 cursor-pointer transition-colors relative ${
                      isActive
                        ? 'bg-[#FFD700]/5 border-l-2 border-l-[#FFD700]'
                        : 'hover:bg-white/[0.03] border-l-2 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Аватар */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                        isActive ? 'bg-[#FFD700]/20 text-[#FFD700]' : 'bg-[#2A2A2A] text-gray-400'
                      }`}>
                        {getInitials(m.firstName, m.lastName)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <p className="text-white text-sm font-medium truncate">
                            {m.firstName} {m.lastName}
                          </p>
                          <span className="text-gray-600 text-xs shrink-0 ml-2">
                            {new Date(m.createdAt).toLocaleDateString('ru')}
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs truncate mb-1">{m.email}</p>
                        <p className="text-gray-600 text-xs truncate">{m.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Детали сообщения */}
        <div className="flex-1 bg-[#1A1A1A] border border-[#393937] rounded-xl flex flex-col overflow-hidden">
          {selected ? (
            <>
              {/* Шапка */}
              <div className="px-6 py-4 border-b border-[#393937] shrink-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center text-sm font-medium text-[#FFD700]">
                      {getInitials(selected.firstName, selected.lastName)}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">
                        {selected.firstName} {selected.lastName}
                      </h3>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-gray-500 text-xs">
                          <Mail size={10} /> {selected.email}
                        </span>
                        {selected.phone && (
                          <span className="flex items-center gap-1 text-gray-500 text-xs">
                            <Phone size={10} /> {selected.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-gray-600 text-xs">
                    <Clock size={11} />
                    {new Date(selected.createdAt).toLocaleString('ru')}
                  </span>
                </div>
              </div>

              {/* Тело сообщения */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Пузырь сообщения */}
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-7 h-7 rounded-full bg-[#2A2A2A] border border-[#393937] flex items-center justify-center shrink-0 mt-1">
                    <User size={12} className="text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-[#111] border border-[#393937] rounded-2xl rounded-tl-sm px-4 py-3 max-w-prose">
                      <p className="text-gray-200 text-sm leading-relaxed">{selected.message}</p>
                    </div>
                    <p className="text-gray-600 text-xs mt-1.5 ml-1">
                      {new Date(selected.createdAt).toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Действия */}
              <div className="px-6 py-4 border-t border-[#393937] shrink-0 flex items-center gap-3">
                <a
                  href={`mailto:${selected.email}`}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] hover:bg-[#FFD700]/90 text-black text-sm font-medium rounded-lg transition-colors"
                >
                  <Reply size={14} />
                  Ответить
                </a>
                <button
                  onClick={() => deleteMessage(selected.id)}
                  className="flex items-center gap-2 px-4 py-2 border border-[#393937] text-red-400 hover:text-red-300 hover:border-red-400/40 hover:bg-red-400/5 text-sm rounded-lg transition-all"
                >
                  <Trash2 size={14} />
                  Удалить
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-600 gap-3">
              <div className="w-14 h-14 rounded-full bg-[#2A2A2A] flex items-center justify-center">
                <Mail size={24} className="opacity-40" />
              </div>
              <p className="text-sm">Выберите сообщение</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}