'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlignLeft,
  Calendar,
  Camera,
  Check,
  Edit3,
  Eye,
  FileText,
  Heart,
  Image,
  Link2,
  LogOut,
  MessageCircle,
  Plus,
  Send,
  Share2,
  Shield,
  Trash2,
  Type,
  User,
  X,
} from 'lucide-react';
import { useAuth } from '../components/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

type Profile = {
  id: string;
  name?: string | null;
  email: string;
  avatar?: string | null;
  bio?: string | null;
  role?: string;
  createdAt: string;
  posts?: ProfilePost[];
};

type ProfilePost = {
  id: string;
  title: string;
  content: string;
  image?: string | null;
  likesCount?: number;
  commentsCount?: number;
  shares?: number;
  createdAt: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const { logout, updateUser } = useAuth();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const [editForm, setEditForm] = useState({ name: '', avatar: '', bio: '' });
  const [postForm, setPostForm] = useState({ title: '', content: '', image: '' });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const tokenStr = localStorage.getItem('token');
    if (!userStr || !tokenStr) {
      router.push('/login');
      return;
    }
    setToken(tokenStr);
    fetchProfile(tokenStr);
  }, [router]);

  const fetchProfile = async (authToken: string) => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      setProfile(data.data);
      setEditForm({
        name: data.data.name || '',
        avatar: data.data.avatar || '',
        bio: data.data.bio || '',
      });
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
      updateUser(data.data);
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const normalizedPost = {
      title: postForm.title.trim(),
      content: postForm.content.trim(),
      image: postForm.image.trim(),
    };

    if (!normalizedPost.title || !normalizedPost.content) return;

    setSaving(true);
    try {
      await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(normalizedPost),
      });
      await fetchProfile(token);
      setPostForm({ title: '', content: '', image: '' });
      setIsCreatingPost(false);
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
      setProfile((prev) => {
        if (!prev?.posts) return prev;
        return {
          ...prev,
          posts: prev.posts.map((p) =>
            p.id === postId
              ? { ...p, likesCount: isNowLiked ? (p.likesCount ?? 0) + 1 : Math.max((p.likesCount ?? 1) - 1, 0) }
              : p,
          ),
        };
      });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-gray-400 text-sm">Загрузка...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-red-400">Профиль не найден</div>
      </div>
    );
  }

  const initial = profile.name?.[0]?.toUpperCase() || 'U';
  const posts = profile.posts ?? [];
  const totalLikes = posts.reduce((acc, p) => acc + (p.likesCount ?? 0), 0);
  const totalComments = posts.reduce((acc, p) => acc + (p.commentsCount ?? 0), 0);
  const totalShares = posts.reduce((acc, p) => acc + (p.shares ?? 0), 0);
  const postTitleLength = postForm.title.trim().length;
  const postContentLength = postForm.content.trim().length;
  const postWordCount = postForm.content.trim() ? postForm.content.trim().split(/\s+/).length : 0;
  const postReadMinutes = Math.max(1, Math.ceil(postWordCount / 180));
  const canPublish = postTitleLength > 0 && postContentLength > 0 && !saving;

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden mb-6">
          <div className="h-24 relative overflow-hidden bg-[#111]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_15%_50%,rgba(255,215,0,0.12)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_85%_50%,rgba(255,215,0,0.06)_0%,transparent_70%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FFD700]/20 to-transparent" />
          </div>

          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl border-4 border-[#1A1A1A] bg-[#FFD700]/10 overflow-hidden flex items-center justify-center">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt={profile.name || 'User'} className="w-full h-full object-cover" />
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

            {!isEditing && (
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-[#2A2A2A]">
                {[
                  ['Постов', posts.length],
                  ['Лайков', totalLikes],
                  ['Комментариев', totalComments],
                  ['Репостов', totalShares],
                ].map(([label, value]) => (
                  <div key={label} className="text-center">
                    <p className="text-lg font-bold text-white">{value}</p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
                <div className="text-center">
                  <p className="text-lg font-bold text-white">
                    {new Date(profile.createdAt).toLocaleDateString('ru', { month: 'short', year: 'numeric' })}
                  </p>
                  <p className="text-xs text-gray-500">Регистрация</p>
                </div>
              </div>
            )}

            {isEditing && (
              <form onSubmit={handleUpdateProfile} className="mt-4 pt-4 border-t border-[#2A2A2A] space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
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
                    placeholder="Расскажите о себе..."
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

        {isCreatingPost ? (
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden mb-6">
            <div className="flex flex-col gap-4 px-6 py-5 border-b border-[#2A2A2A] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 text-[#FFD700] flex items-center justify-center">
                  <Edit3 size={18} />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-white">Новый пост</h2>
                  <p className="text-xs text-gray-500">Пишите, проверяйте превью и публикуйте без лишних шагов</p>
                </div>
              </div>
              <button
                onClick={() => { setIsCreatingPost(false); setPostForm({ title: '', content: '', image: '' }); }}
                className="self-start sm:self-auto p-2 text-gray-500 hover:text-white hover:bg-[#111] rounded-lg transition-colors"
                aria-label="Закрыть редактор"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-5 sm:p-6">
              <div className="grid gap-5 lg:grid-cols-[1.35fr_0.9fr]">
                <div className="space-y-4">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <label className="text-xs text-gray-500 flex items-center gap-1"><Type size={11} /> Заголовок</label>
                      <span className="text-[11px] text-gray-600">{postTitleLength}/120</span>
                    </div>
                    <input
                      value={postForm.title}
                      onChange={(e) => setPostForm({ ...postForm, title: e.target.value.slice(0, 120) })}
                      required
                      placeholder="Коротко сформулируйте главную мысль"
                      className="w-full px-4 py-3 bg-[#111] border border-[#333] rounded-xl text-white text-lg font-medium placeholder-gray-600 focus:outline-none focus:border-[#FFD700]/50"
                    />
                  </div>

                  <div>
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                      <label className="text-xs text-gray-500 flex items-center gap-1"><FileText size={11} /> Текст поста</label>
                      <span className="text-[11px] text-gray-600">{postContentLength} символов</span>
                    </div>
                    <textarea
                      value={postForm.content}
                      onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      required
                      rows={10}
                      placeholder="Напишите пост. Можно использовать абзацы: переносы строк сохранятся на странице просмотра."
                      className="w-full min-h-[260px] px-4 py-3 bg-[#111] border border-[#333] rounded-xl text-white text-sm leading-relaxed placeholder-gray-600 focus:outline-none focus:border-[#FFD700]/50 resize-y"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1"><Image size={11} /> Обложка по ссылке</label>
                    <div className="flex items-center gap-2 rounded-xl bg-[#111] border border-[#333] px-4 focus-within:border-[#FFD700]/50 transition-colors">
                      <Link2 size={15} className="text-gray-600 shrink-0" />
                      <input
                        value={postForm.image}
                        onChange={(e) => setPostForm({ ...postForm, image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="w-full py-3 bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-[#2A2A2A] bg-[#111] p-3">
                      <p className="text-[11px] text-gray-600">Слова</p>
                      <p className="mt-1 text-lg font-semibold text-white">{postWordCount}</p>
                    </div>
                    <div className="rounded-xl border border-[#2A2A2A] bg-[#111] p-3">
                      <p className="text-[11px] text-gray-600">Чтение</p>
                      <p className="mt-1 text-lg font-semibold text-white">{postReadMinutes} мин</p>
                    </div>
                    <div className="rounded-xl border border-[#2A2A2A] bg-[#111] p-3">
                      <p className="text-[11px] text-gray-600">Обложка</p>
                      <p className="mt-1 text-lg font-semibold text-white">{postForm.image.trim() ? 'Есть' : 'Нет'}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => { setIsCreatingPost(false); setPostForm({ title: '', content: '', image: '' }); }}
                      className="px-4 py-3 border border-[#333] text-gray-400 hover:text-white hover:border-[#444] rounded-xl text-sm transition-colors"
                    >
                      Отменить
                    </button>
                    <button
                      type="submit"
                      disabled={!canPublish}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#FFD700] text-black font-semibold rounded-xl text-sm hover:bg-[#d5b300] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {saving ? <Check size={15} /> : <Send size={15} />}
                      {saving ? 'Публикуем...' : 'Опубликовать пост'}
                    </button>
                  </div>
                </div>

                <aside className="rounded-xl border border-[#2A2A2A] bg-[#111] overflow-hidden self-start lg:sticky lg:top-6">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2A2A]">
                    <span className="flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-widest">
                      <Eye size={13} /> Превью
                    </span>
                    <span className="text-[11px] text-gray-600">как в ленте</span>
                  </div>
                  {postForm.image.trim() ? (
                    <img
                      src={postForm.image.trim()}
                      alt="Предпросмотр обложки"
                      className="w-full h-40 object-cover bg-[#0F0F0F]"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="h-40 bg-[#0F0F0F] flex items-center justify-center text-gray-700">
                      <Image size={28} />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 overflow-hidden flex items-center justify-center">
                        {profile.avatar ? (
                          <img src={profile.avatar} alt={profile.name || 'User'} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-sm font-bold text-[#FFD700]">{initial}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{profile.name || 'Без имени'}</p>
                        <p className="text-xs text-gray-600">сегодня</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-tight break-words">
                      {postForm.title.trim() || 'Заголовок появится здесь'}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-400 whitespace-pre-wrap break-words line-clamp-6">
                      {postForm.content.trim() || 'Начните писать текст поста, и здесь сразу появится аккуратный предпросмотр.'}
                    </p>
                    <div className="mt-5 flex items-center gap-4 border-t border-[#2A2A2A] pt-4 text-gray-600">
                      <span className="flex items-center gap-1.5 text-sm"><Heart size={15} /> 0</span>
                      <span className="flex items-center gap-1.5 text-sm"><MessageCircle size={15} /> 0</span>
                      <span className="flex items-center gap-1.5 text-sm"><Share2 size={15} /> 0</span>
                    </div>
                  </div>
                </aside>
              </div>
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

        <div className="space-y-4">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-widest">
            Посты · {posts.length}
          </h2>

          {posts.length > 0 ? posts.map((post) => {
            const isLiked = likedPosts.has(post.id);
            return (
              <div key={post.id} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden hover:border-[#333] transition-colors group">
                {post.image && (
                  <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-white text-lg leading-tight break-words">{post.title}</h3>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all ml-2 shrink-0"
                      aria-label="Удалить пост"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap break-words line-clamp-3 mb-4">{post.content}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#2A2A2A]">
                    <div className="flex items-center gap-4 text-sm">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1.5 transition-colors duration-200 group/like"
                        aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
                      >
                        <Heart
                          size={15}
                          className={`transition-colors duration-200 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600 group-hover/like:text-red-400'}`}
                        />
                        <span className={`transition-colors duration-200 ${isLiked ? 'text-red-500' : 'text-gray-600 group-hover/like:text-red-400'}`}>
                          {post.likesCount ?? 0}
                        </span>
                      </button>
                      <span className="flex items-center gap-1.5 text-gray-600">
                        <MessageCircle size={15} />
                        {post.commentsCount ?? 0}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-600">
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
              <p className="text-xs text-gray-700 mt-1">Нажмите «Написать пост», чтобы начать</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
