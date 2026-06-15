'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';
import type { Post } from '@/lib/db';
import { likePost, sharePost, commentPost } from '@/lib/db';

type Props = {
  initialPost: Post;
};

export default function PostDetailClient({ initialPost }: Props) {
  const [post, setPost] = useState<Post>(initialPost);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to like posts');
      window.location.href = '/login';
      return;
    }

    try {
      const res = await likePost(post.id, token);
      setIsLiked(res.liked);
      setPost(prev => ({
        ...prev,
        likesCount: res.liked ? prev.likesCount + 1 : prev.likesCount - 1,
      }));
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to like post');
    }
  };

  const handleShare = async () => {
    try {
      await sharePost(post.id);
      setPost(prev => ({ ...prev, shares: prev.shares + 1 }));
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
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
      alert('Please login to comment');
      window.location.href = '/login';
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await commentPost(post.id, commentText, token);
      setPost(prev => ({
        ...prev,
        commentsCount: prev.commentsCount + 1,
        comments: [res.data, ...prev.comments],
      }));
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#141414] min-h-screen pt-24 pb-16 text-white">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6">
        <Link href="/news" className="inline-flex items-center gap-2 text-[#98989A] hover:text-white transition-colors mb-8">
          <ArrowLeft size={20} />
          <span>Back to News</span>
        </Link>

        {post.image && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden mb-8"
          >
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center overflow-hidden">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name || 'User'} className="w-full h-full object-cover" />
              ) : (
                <span className="text-black font-bold text-lg">{(post.author.name || 'U')[0].toUpperCase()}</span>
              )}
            </div>
            <div>
              <h3 className="font-semibold">{post.author.name || 'Anonymous'}</h3>
              <p className="text-[#98989A] text-sm">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            {post.title}
          </h1>

          <div className="prose prose-invert max-w-none mb-12 text-[#E0E0E0] whitespace-pre-wrap">
            {post.content}
          </div>

          {/* Action bar */}
          <div className="flex items-center gap-6 py-6 border-y border-[#262626] mb-12">
            {/* Like */}
            <button
              onClick={handleLike}
              className="flex items-center gap-2 transition-all duration-200 group"
              aria-label={isLiked ? 'Unlike post' : 'Like post'}
            >
              <motion.div
                animate={isLiked ? { scale: [1, 1.35, 1] } : { scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <Heart
                  size={24}
                  className={`transition-colors duration-200 ${
                    isLiked
                      ? 'text-red-500 fill-red-500'
                      : 'text-[#98989A] group-hover:text-red-400'
                  }`}
                />
              </motion.div>
              <span
                className={`text-lg transition-colors duration-200 ${
                  isLiked ? 'text-red-500' : 'text-[#98989A] group-hover:text-red-400'
                }`}
              >
                {post.likesCount || 0}
              </span>
            </button>

            {/* Comments */}
            <a
              href="#comments"
              className="flex items-center gap-2 text-[#98989A] hover:text-[#60A5FA] transition-colors duration-200 group"
            >
              <MessageCircle
                size={24}
                className="group-hover:fill-[#60A5FA]/20 transition-all duration-200"
              />
              <span className="text-lg">{post.commentsCount || 0}</span>
            </a>

            {/* Share */}
            <button
              onClick={handleShare}
              className={`flex items-center gap-2 transition-all duration-200 group ${
                isShared ? 'text-green-500' : 'text-[#98989A] hover:text-[#FFD700]'
              }`}
              aria-label="Share post"
            >
              <motion.div
                animate={isShared ? { rotate: [0, -10, 10, 0] } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isShared ? (
                  <Check size={24} className="text-green-500" />
                ) : (
                  <Share2 size={24} className="group-hover:text-[#FFD700] transition-colors duration-200" />
                )}
              </motion.div>
              <span className="text-lg">{isShared ? 'Copied!' : post.shares || 0}</span>
            </button>
          </div>

          {/* Comments Section */}
          <div id="comments">
            <h2 className="text-2xl font-bold mb-6">Comments ({post.commentsCount})</h2>

            <form onSubmit={handleComment} className="mb-10">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-[#1A1A1A] border border-[#262626] rounded-lg p-4 text-white focus:outline-none focus:border-[#FFD700] min-h-[100px] mb-4"
              />
              <button
                type="submit"
                disabled={isSubmitting || !commentText.trim()}
                className="px-6 py-2 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#d5b300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>

            <div className="space-y-6">
              {post.comments?.map((comment: any) => (
                <div key={comment.id} className="bg-[#1A1A1A] border border-[#262626] rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center overflow-hidden">
                      {comment.author.avatar ? (
                        <img src={comment.author.avatar} alt={comment.author.name || 'User'} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-black text-xs font-bold">{(comment.author.name || 'U')[0].toUpperCase()}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{comment.author.name || 'Anonymous'}</h4>
                      <p className="text-[#98989A] text-xs">{new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-[#E0E0E0]">{comment.text}</p>
                </div>
              ))}

              {(!post.comments || post.comments.length === 0) && (
                <p className="text-[#98989A] text-center py-8">No comments yet. Be the first to share your thoughts!</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}