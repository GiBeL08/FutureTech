'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Heart, MessageCircle, Trash2, Plus, LogOut,
  Camera, User, FileText, Calendar,
  Edit3, X, Check, Image, AlignLeft, Type,
  Shield, ChevronRight, Share2
} from 'lucide-react';
import { useAuth } from '../components/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function ProfilePage() {
  const router = useRouter();
  const { logout, updateUser } = useAuth(); // ✅ ДОБАВЛЕН updateUser

  const [profile, setProfile] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [postStep, setPostStep] = useState<1 | 2>(1);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const [editForm, setEditForm] = useState({ name: '', avatar: '', bio: '' });
  const [postForm, setPostForm] = useState({ title: '', content: '', image: '' });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const tokenStr = localStorage.getItem('token');
    if (!userStr || !tokenStr) { router.push('/login'); return; }
    setToken(tokenStr);
    fetchProfile(tokenStr);
  }, []);

  const fetchProfile = async (authToken: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      setProfile(data.data);
      setEditForm({ name: data.data.name || '', avatar: data.data.avatar || '', bio: data.data.bio || '' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      setProfile(data.data);
      localStorage.setItem('user', JSON.stringify(data.data));
      updateUser(data.data); // ✅ ДОБАВЛЕНА ЭТА СТРОКА
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaving(true);
    try {
      await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(postForm),
      });
      await fetchProfile(token);
      setPostForm({ title: '', content: '', image: '' });
      setIsCreatingPost(false);
      setPostStep(1);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!token || !confirm('Удалить пост?')) return;
    await fetch(`${API_URL}/posts/${postId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchProfile(token);
  };

  const handleLike = async (postId: string) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/posts/${postId}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const isNowLiked = data.liked;
      setLikedPosts((prev) => {
        const next = new Set(prev);
        isNowLiked ? next.add(postId) : next.delete(postId);
        return next;
      });
      setProfile((prev: any) => ({
        ...prev,
        posts: prev.posts.map((p: any) =>
          p.id === postId
            ? { ...p, likesCount: isNowLiked ? (p.likesCount ?? 0) + 1 : (p.likesCount ?? 1) - 1 }
            : p
        ),
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logout();
    router.push('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <div className="text-gray-400 text-sm">Загрузка...</div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <div className="text-red-400">Профиль не найден</div>
    </div>
  );

  const initial = profile.name?.[0]?.toUpperCase() || 'U';

  const totalLikes = profile.posts?.reduce((acc: number, p: any) => acc + (p.likesCount ?? 0), 0) ?? 0;
  const totalComments = profile.posts?.reduce((acc: number, p: any) => acc + (p.commentsCount ?? 0), 0) ?? 0;
  const totalShares = profile.posts?.reduce((acc: number, p: any) => acc + (p.shares ?? 0), 0) ?? 0;

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* ── Карточка профиля ── */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden mb-6">

          {/* Баннер */}
          <div className="h-24 relative overflow-hidden" style={{ background: '#111' }}>
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(ellipse 60% 80% at 15% 50%, rgba(255,215,0,0.12) 0%, transparent 70%)',
            }} />
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(ellipse 40% 60% at 85% 50%, rgba(255,215,0,0.06) 0%, transparent 70%)',
            }} />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />
          </div>

          <div className="px-6 pb-6">
            {/* Аватар */}
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl border-4 border-[#1A1A1A] bg-[#FFD700]/10 overflow-hidden flex items-center justify-center">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-[#FFD700]">{initial}</span>
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1A1A1A]" />
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#333] text-gray-400 hover:text-white hover:border-[#444] rounded-lg text-sm transition-all"
                >
                  {isEditing ? <><X size={13} /> Отмена</> : <><Edit3 size={13} /> Изменить</>}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#333] text-red-400 hover:text-red-300 hover:border-red-400/40 hover:bg-red-400/5 rounded-lg text-sm transition-all"
                >
                  <LogOut size={13} />
                  Выйти
                </button>
              </div>
            </div>

            {/* Имя и роль */}
            <div className="mb-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{profile.name || 'Без имени'}</h1>
                {profile.role === 'admin' && (
                  <span className="flex items-center gap-1 text-[10px] bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20 px-2 py-0.5 rounded-full">
                    <Shield size={9} /> Admin
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm">{profile.email}</p>
            </div>

            {profile.bio && !isEditing && (
              <p className="text-gray-400 text-sm mt-2 leading-relaxed">{profile.bio}</p>
            )}

            {/* Статистика */}
            {!isEditing && (
              <div className="flex gap-4 mt-4 pt-4 border-t border-[#2A2A2A]">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{profile.posts?.length ?? 0}</p>
                  <p className="text-xs text-gray-500">Постов</p>
                </div>
                <div className="w-px bg-[#2A2A2A]" />
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{totalLikes}</p>
                  <p className="text-xs text-gray-500">Лайков</p>
                </div>
                <div className="w-px bg-[#2A2A2A]" />
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{totalComments}</p>
                  <p className="text-xs text-gray-500">Комментариев</p>
                </div>
                <div className="w-px bg-[#2A2A2A]" />
                <div className="text-center">
                  <p className="text-lg font-bold text-white">{totalShares}</p>
                  <p className="text-xs text-gray-500">Репостов</p>
                </div>
                <div className="w-px bg-[#2A2A2A]" />
                <div className="text-center">
                  <p className="text-lg font-bold text-white">
                    {new Date(profile.createdAt).toLocaleDateString('ru', { month: 'short', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-gray-500">Регистрация</p>
                </div>
              </div>
            )}

            {/* Форма редактирования */}
            {isEditing && (
              <form onSubmit={handleUpdateProfile} className="mt-4 pt-4 border-t border-[#2A2A2A] space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 flex items-center gap-1"><User size={11} /> Имя</label>
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD700]/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Camera size={11} /> Avatar URL</label>
                    <input
                      value={editForm.avatar}
                      onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD700]/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 flex items-center gap-1"><AlignLeft size={11} /> Bio</label>
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    rows={2}
                    placeholder="Расскажи о себе..."
                    className="w-full px-3 py-2 bg-[#111] border border-[#333] rounded-lg text-sm text-white focus:outline-none focus:border-[#FFD700]/50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-black text-sm font-semibold rounded-lg hover:bg-[#d5b300] transition-colors disabled:opacity-50"
                >
                  <Check size={14} />
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Создание поста ── */}
        {isCreatingPost ? (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden mb-6">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-white">Новый пост</span>
                <div className="flex items-center gap-1">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${postStep >= 1 ? 'bg-[#FFD700] text-black' : 'bg-[#2A2A2A] text-gray-500'}`}>1</span>
                  <div className={`w-8 h-px ${postStep >= 2 ? 'bg-[#FFD700]' : 'bg-[#2A2A2A]'}`} />
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${postStep >= 2 ? 'bg-[#FFD700] text-black' : 'bg-[#2A2A2A] text-gray-500'}`}>2</span>
                </div>
                <span className="text-xs text-gray-500">{postStep === 1 ? 'Основное' : 'Детали'}</span>
              </div>
              <button onClick={() => { setIsCreatingPost(false); setPostStep(1); setPostForm({ title: '', content: '', image: '' }); }}
                className="text-gray-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6">
              {postStep === 1 ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1"><Type size={11} /> Заголовок</label>
                    <input
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      required
                      placeholder="Придумайте заголовок..."
                      className="w-full px-4 py-3 bg-[#111] border border-[#333] rounded-xl text-white text-lg font-medium placeholder-gray-600 focus:outline-none focus:border-[#FFD700]/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1"><FileText size={11} /> Содержание</label>
                    <textarea
                      value={postForm.content}
                      onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      required
                      rows={6}
                      placeholder="Напишите текст поста..."
                      className="w-full px-4 py-3 bg-[#111] border border-[#333] rounded-xl text-white text-sm leading-relaxed placeholder-gray-600 focus:outline-none focus:border-[#FFD700]/50 resize-none"
                    />
                    <p className="text-xs text-gray-600 mt-1 text-right">{postForm.content.length} символов</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPostStep(2)}
                    disabled={!postForm.title || !postForm.content}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#FFD700] text-black font-semibold rounded-xl text-sm hover:bg-[#d5b300] transition-colors disabled:opacity-40"
                  >
                    Далее <ChevronRight size={15} />
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1"><Image size={11} /> Изображение (необязательно)</label>
                    <input
                      value={postForm.image}
                      onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 bg-[#111] border border-[#333] rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#FFD700]/50"
                    />
                  </div>
                  {postForm.image && (
                    <div className="rounded-xl overflow-hidden border border-[#333]">
                      <img src={postForm.image} alt="preview" className="w-full h-40 object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                  )}
                  <div className="bg-[#111] border border-[#2A2A2A] rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-2">Предпросмотр</p>
                    <h3 className="font-bold text-white mb-1">{postForm.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3">{postForm.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setPostStep(1)}
                      className="px-4 py-2.5 border border-[#333] text-gray-400 hover:text-white rounded-xl text-sm transition-colors">
                      ← Назад
                    </button>
                    <button type="submit" disabled={saving}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#FFD700] text-black font-semibold rounded-xl text-sm hover:bg-[#d5b300] transition-colors disabled:opacity-50">
                      <Check size={14} />
                      {saving ? 'Публикация...' : 'Опубликовать'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          <button
            onClick={() => setIsCreatingPost(true)}
            className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-[#333] text-gray-500 hover:text-white hover:border-[#FFD700]/30 hover:bg-[#FFD700]/5 rounded-2xl text-sm transition-all mb-6"
          >
            <Plus size={16} /> Написать пост
          </button>
        )}

        {/* ── Посты ── */}
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest">
            Посты · {profile.posts?.length ?? 0}
          </h2>

          {profile.posts?.length > 0 ? profile.posts.map((post: any) => {
            const isLiked = likedPosts.has(post.id);
            return (
              <div key={post.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#333] transition-colors group">
                {post.image && (
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-white text-lg leading-tight">{post.title}</h3>
                    <button onClick={() => handleDeletePost(post.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all ml-2 shrink-0">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">{post.content}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
                    <div className="flex items-center gap-4 text-sm">
                      {/* Like */}
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1.5 transition-colors duration-200 group/like"
                      >
                        <Heart
                          size={15}
                          className={`transition-colors duration-200 ${
                            isLiked
                              ? 'text-red-500 fill-red-500'
                              : 'text-gray-600 group-hover/like:text-red-400'
                          }`}
                        />
                        <span className={`transition-colors duration-200 ${
                          isLiked ? 'text-red-500' : 'text-gray-600 group-hover/like:text-red-400'
                        }`}>
                          {post.likesCount ?? 0}
                        </span>
                      </button>

                      {/* Comments */}
                      <span className="flex items-center gap-1.5 text-gray-600 hover:text-blue-400 transition-colors cursor-pointer">
                        <MessageCircle size={15} />
                        {post.commentsCount ?? 0}
                      </span>

                      {/* Shares */}
                      <span className="flex items-center gap-1.5 text-gray-600 hover:text-[#FFD700] transition-colors cursor-pointer">
                        <Share2 size={15} />
                        {post.shares ?? 0}
                      </span>
                    </div>

                    <span className="flex items-center gap-1 text-xs text-gray-600">
                      <Calendar size={11} />
                      {new Date(post.createdAt).toLocaleDateString('ru')}
                    </span>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="flex flex-col items-center justify-center py-16 text-gray-600">
              <FileText size={32} className="mb-3 opacity-30" />
              <p className="text-sm">Постов пока нет</p>
              <p className="text-xs text-gray-700 mt-1">Нажмите «Написать пост» чтобы начать</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}