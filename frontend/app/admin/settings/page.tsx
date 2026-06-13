'use client';
import { useEffect, useState } from 'react';
import { Save, Check, BarChart2, Mail, Calendar } from 'lucide-react';

const API = 'http://localhost:3001/api';

export default function AdminSettings() {
  const [stats, setStats] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
  const [saved, setSaved] = useState<number | null>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';

  useEffect(() => {
    fetch(`${API}/admin/settings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((res) => {
        setStats(res.data.stats);
        setSubscribers(res.data.subscribers);
        setLoading(false);
      });
  }, []);

  const updateStat = async (id: number, value: string, label: string) => {
    setSaving(id);
    await fetch(`${API}/admin/settings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, value, label }),
    });
    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  if (loading) return <div className="p-8 text-white">Загрузка...</div>;

  return (
    <div className="p-8 h-screen flex flex-col gap-6 overflow-y-auto">
      <h2 className="text-2xl font-bold text-white shrink-0">Настройки сайта</h2>

      {/* Статистика */}
      <div className="bg-[#1A1A1A] border border-[#393937] rounded-xl overflow-hidden shrink-0">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-[#393937]">
          <BarChart2 size={16} className="text-[#FFD700]" />
          <h3 className="text-white font-semibold">Статистика на сайте</h3>
        </div>

        <div className="p-4 space-y-2">
          {/* Подписи колонок */}
          <div className="flex items-center gap-3 px-2 mb-1">
            <span className="text-gray-500 text-xs w-32">Значение</span>
            <span className="text-gray-500 text-xs flex-1">Подпись</span>
            <span className="text-gray-500 text-xs w-20">Страница</span>
            <span className="text-gray-500 text-xs w-24 text-right">Статус</span>
          </div>

          {stats.map((s) => (
            <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-colors group">
              <input
                className="bg-[#111] text-white text-sm rounded-lg px-3 py-2 border border-[#393937] w-32 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                defaultValue={s.value}
                onBlur={(e) => updateStat(s.id, e.target.value, s.label)}
              />
              <input
                className="bg-[#111] text-white text-sm rounded-lg px-3 py-2 border border-[#393937] flex-1 focus:outline-none focus:border-[#FFD700]/50 transition-colors"
                defaultValue={s.label}
                onBlur={(e) => updateStat(s.id, s.value, e.target.value)}
              />
              <span className="text-xs text-gray-500 w-20 truncate">{s.page}</span>
              <div className="w-24 flex justify-end">
                {saving === s.id && (
                  <span className="flex items-center gap-1 text-xs text-blue-400">
                    <Save size={11} className="animate-pulse" /> Сохранение...
                  </span>
                )}
                {saved === s.id && (
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <Check size={11} /> Сохранено
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Подписчики */}
      <div className="bg-[#1A1A1A] border border-[#393937] rounded-xl overflow-hidden flex flex-col min-h-0" style={{ maxHeight: '420px' }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#393937] shrink-0">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-[#FFD700]" />
            <h3 className="text-white font-semibold">Подписчики рассылки</h3>
          </div>
          <span className="text-xs text-gray-500 bg-[#2A2A2A] px-2.5 py-1 rounded-full border border-[#393937]">
            {subscribers.length}
          </span>
        </div>

        <div className="overflow-y-auto flex-1">
          {subscribers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <Mail size={28} className="mb-2 opacity-30" />
              <p className="text-sm">Подписчиков пока нет</p>
            </div>
          ) : (
            <table className="w-full">
              <tbody className="divide-y divide-[#393937]">
                {subscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#2A2A2A] border border-[#393937] flex items-center justify-center shrink-0">
                          <Mail size={10} className="text-gray-500" />
                        </div>
                        <span className="text-gray-300 text-sm">{s.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className="flex items-center justify-end gap-1.5 text-gray-500 text-xs">
                        <Calendar size={11} />
                        {new Date(s.createdAt).toLocaleDateString('ru')}
                      </span>
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