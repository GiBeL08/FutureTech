'use client';
import { useEffect, useState } from 'react';

const API = 'http://localhost:3001/api';

export default function AdminSettings() {
  const [stats, setStats] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<number | null>(null);
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
  };

  if (loading) return <div className="p-8 text-white">Загрузка...</div>;

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold text-white">Настройки сайта</h2>
      <div className="bg-[#1A1A1A] border border-[#393937] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Статистика на сайте</h3>
        <div className="space-y-3">
          {stats.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <input className="bg-[#1A1A1A] text-white text-sm rounded-lg px-3 py-2 border border-[#565652] w-32 focus:outline-none focus:border-[#7D7D03]"
                defaultValue={s.value} onBlur={(e) => updateStat(s.id, e.target.value, s.label)} />
              <input className="bg-[#1A1A1A] text-white text-sm rounded-lg px-3 py-2 border border-[#565652] flex-1 focus:outline-none focus:border-[#7D7D03]"
                defaultValue={s.label} onBlur={(e) => updateStat(s.id, s.value, e.target.value)} />
              <span className="text-xs text-gray-500 w-16">{s.page}</span>
              {saving === s.id && <span className="text-blue-400 text-xs">Сохранение...</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#1A1A1A] border border-[#393937] rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Подписчики рассылки ({subscribers.length})</h3>
        <div className="max-h-64 overflow-y-auto space-y-2">
          {subscribers.map((s) => (
            <div key={s.id} className="flex justify-between items-center py-2 border-b border-[#7D7D03]">
              <span className="text-gray-300 text-sm">{s.email}</span>
              <span className="text-gray-500 text-xs">{new Date(s.createdAt).toLocaleDateString('ru')}</span>
            </div>
          ))}
          {subscribers.length === 0 && <p className="text-gray-500 text-sm">Подписчиков нет</p>}
        </div>
      </div>
    </div>
  );
}
