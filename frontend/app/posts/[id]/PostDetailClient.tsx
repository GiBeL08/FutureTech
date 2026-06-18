'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Check,
  Heart,
  MessageCircle,
  Send,
  Share2,
} from 'lucide-react';
import Link from 'next/link';
import type { Post } from '@/lib/db';
import { commentPost, likePost, sharePost } from '@/lib/db';

type Props = {
  initialPost: Post;
};

export default function PostDetailClient({ initialPost }: Props) {
  const [post, setPost] = useState<Post>(initialPost);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    try {
      const user = JSON.parse(userStr);
      const hasLiked = initialPost.likes?.some((like: any) => like.authorId === user.id);
      setIsLiked(!!hasLiked);
    } catch {
      setIsLiked(false);
    }
  }, [initialPost]);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Войдите в аккаунт, чтобы поставить лайк');
      window.location.href = '/login';
      return;
    }

    try {
      const res = await likePost(post.id, token);
      setIsLiked(res.liked);
      setPost((prev) => ({
        ...prev,
        likesCount: res.liked ? prev.likesCount + 1 : Math.max(prev.likesCount - 1, 0),
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Не удалось поставить лайк');
    }
  };

  const handleShare = async () => {
    try {
      await sharePost(post.id);
      setPost((prev) => ({ ...prev, shares: prev.shares + 1 }));
      await navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Войдите в аккаунт, чтобы оставить комментарий');
      window.location.href = '/login';
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await commentPost(post.id, commentText.trim(), token);
      setPost((prev) => ({
        ...prev,
        commentsCount: prev.commentsCount + 1,
        comments: [res.data, ...prev.comments],
      }));
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Не удалось отправить комментарий');
    } finally {
      setIsSubmitting(false);
    }
  };

  const authorInitial = (post.author.name || post.author.email || 'U')[0].toUpperCase();
  const createdDate = new Date(post.createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const wordCount = post.content.trim() ? post.content.trim().split(/\s+/).length : 0;
  const readMinutes = Math.max(1, Math.ceil(wordCount / 180));

  return (
    <div className="bg-[#0F0F0F] min-h-screen pt-24 pb-16 text-white">
      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-[#98989A] hover:text-white transition-colors mb-8">
          <ArrowLeft size={18} />
          <span className="text-sm">Назад к постам</span>
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl overflow-hidden"
        >
          {post.image && (
            <div className="w-full h-[240px] sm:h-[360px] lg:h-[420px] bg-[#111] overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-5 border-b border-[#2A2A2A] pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center overflow-hidden shrink-0">
                  {post.author.avatar ? (
                    <img src={post.author.avatar} alt={post.author.name || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[#FFD700] font-bold text-lg">{authorInitial}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white truncate">{post.author.name || 'Anonymous'}</h3>
                  <p className="text-[#98989A] text-sm flex items-center gap-1.5">
                    <Calendar size={13} />
                    {createdDate}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center sm:min-w-[260px]">
                <div className="rounded-xl bg-[#111] border border-[#2A2A2A] px-3 py-2">
                  <p className="text-sm font-semibold text-white">{wordCount}</p>
                  <p className="text-[11px] text-[#7E7E81]">слов</p>
                </div>
                <div className="rounded-xl bg-[#111] border border-[#2A2A2A] px-3 py-2">
                  <p className="text-sm font-semibold text-white">{readMinutes} мин</p>
                  <p className="text-[11px] text-[#7E7E81]">чтение</p>
                </div>
                <div className="rounded-xl bg-[#111] border border-[#2A2A2A] px-3 py-2">
                  <p className="text-sm font-semibold text-white">{post.commentsCount || 0}</p>
                  <p className="text-[11px] text-[#7E7E81]">ответов</p>
                </div>
              </div>
            </div>

            <header className="pt-7">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight break-words">
                {post.title}
              </h1>
            </header>

            <div className="mt-8 max-w-3xl text-[#E0E0E0] text-base sm:text-lg leading-8 whitespace-pre-wrap break-words">
              {post.content}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 border-y border-[#2A2A2A] py-5">
              <button
                onClick={handleLike}
                className={`h-11 px-4 rounded-xl border flex items-center gap-2 transition-all ${
                  isLiked
                    ? 'border-red-500/30 bg-red-500/10 text-red-400'
                    : 'border-[#333] bg-[#111] text-[#98989A] hover:text-red-400 hover:border-red-400/40'
                }`}
                aria-label={isLiked ? 'Убрать лайк' : 'Поставить лайк'}
              >
                <Heart size={18} className={isLiked ? 'fill-red-400' : ''} />
                <span className="text-sm font-medium">{post.likesCount || 0}</span>
              </button>

              <a
                href="#comments"
                className="h-11 px-4 rounded-xl border border-[#333] bg-[#111] text-[#98989A] hover:text-[#60A5FA] hover:border-[#60A5FA]/40 flex items-center gap-2 transition-all"
              >
                <MessageCircle size={18} />
                <span className="text-sm font-medium">{post.commentsCount || 0}</span>
              </a>

              <button
                onClick={handleShare}
                className={`h-11 px-4 rounded-xl border flex items-center gap-2 transition-all ${
                  isShared
                    ? 'border-green-500/30 bg-green-500/10 text-green-400'
                    : 'border-[#333] bg-[#111] text-[#98989A] hover:text-[#FFD700] hover:border-[#FFD700]/40'
                }`}
                aria-label="Поделиться постом"
              >
                {isShared ? <Check size={18} /> : <Share2 size={18} />}
                <span className="text-sm font-medium">{isShared ? 'Скопировано' : post.shares || 0}</span>
              </button>
            </div>

            <section id="comments" className="pt-10">
              <div className="flex items-center justify-between gap-4 mb-5">
                <h2 className="text-2xl font-bold">Комментарии</h2>
                <span className="text-sm text-[#98989A]">{post.commentsCount || 0}</span>
              </div>

              <form onSubmit={handleComment} className="bg-[#111] border border-[#2A2A2A] rounded-2xl p-4 mb-8">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Напишите комментарий..."
                  className="w-full min-h-[110px] bg-transparent text-white placeholder:text-gray-600 focus:outline-none resize-y leading-relaxed"
                />
                <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#2A2A2A]">
                  <span className="text-xs text-gray-600">{commentText.trim().length} символов</span>
                  <button
                    type="submit"
                    disabled={isSubmitting || !commentText.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-black font-semibold rounded-xl text-sm hover:bg-[#d5b300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Check size={15} /> : <Send size={15} />}
                    {isSubmitting ? 'Отправляем...' : 'Отправить'}
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {post.comments?.map((comment: any) => (
                  <div key={comment.id} className="bg-[#111] border border-[#2A2A2A] rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center overflow-hidden">
                        {comment.author.avatar ? (
                          <img src={comment.author.avatar} alt={comment.author.name || 'User'} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-[#FFD700] text-xs font-bold">{(comment.author.name || 'U')[0].toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{comment.author.name || 'Anonymous'}</h4>
                        <p className="text-[#98989A] text-xs">{new Date(comment.createdAt).toLocaleString('ru-RU')}</p>
                      </div>
                    </div>
                    <p className="text-[#E0E0E0] leading-relaxed whitespace-pre-wrap break-words">{comment.text}</p>
                  </div>
                ))}

                {(!post.comments || post.comments.length === 0) && (
                  <div className="border border-dashed border-[#2A2A2A] rounded-2xl py-12 text-center">
                    <MessageCircle size={28} className="mx-auto mb-3 text-gray-700" />
                    <p className="text-[#98989A] text-sm">Комментариев пока нет</p>
                    <p className="text-gray-700 text-xs mt-1">Будьте первым, кто начнёт обсуждение</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </motion.article>
      </main>
    </div>
  );
}
