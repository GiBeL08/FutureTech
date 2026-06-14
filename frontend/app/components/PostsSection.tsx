'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { Post } from '@/lib/db';
import { likePost, sharePost } from '@/lib/db';

type Props = {
  initialPosts: Post[];
};

const POSTS_PER_PAGE = 3;

export default function PostsSection({ initialPosts }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const visiblePosts = posts.slice(currentIndex * POSTS_PER_PAGE, currentIndex * POSTS_PER_PAGE + POSTS_PER_PAGE);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleLike = async (postId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to like posts');
      window.location.href = '/login';
      return;
    }
    try {
      const res = await likePost(postId, token);
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId
            ? { ...post, likesCount: res.liked ? post.likesCount + 1 : post.likesCount - 1 }
            : post
        )
      );
    } catch (error) {
      console.error('Error toggling like:', error);
      alert('Failed to like post');
    }
  };

  const handleShare = async (postId: string) => {
    try {
      await sharePost(postId);
      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId ? { ...post, shares: post.shares + 1 } : post
        )
      );
      const url = `${window.location.origin}/posts/${postId}`;
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  if (!posts || posts.length === 0) return null;

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  return (
    <section className="bg-[#141414] py-16 sm:py-24 border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-4">
              Community Posts
            </h2>
            <p className="text-[#98989A] max-w-2xl">
              Discover the latest thoughts, ideas, and updates from our community members.
            </p>
          </div>
          <Link
            href="/profile"
            className="mt-6 md:mt-0 px-4 py-2 border border-[#262626] rounded text-[#98989A] hover:text-white transition-colors flex items-center gap-2"
          >
            Create Post <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Slider */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visiblePosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#1A1A1A] border border-[#262626] rounded-xl overflow-hidden flex flex-col"
                >
                  {post.image ? (
                    <Link href={`/posts/${post.id}`} className="block h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                  ) : (
                    <Link
                      href={`/posts/${post.id}`}
                      className="block h-48 bg-[#262626] flex items-center justify-center"
                    >
                      <span className="text-[#98989A]">No Image</span>
                    </Link>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center overflow-hidden">
                        {post.author.avatar ? (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name || 'User'}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-black text-xs font-bold">
                            {(post.author.name || 'U')[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium">
                          {post.author.name || 'Anonymous'}
                        </span>
                        <span className="text-[#98989A] text-xs">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Link href={`/posts/${post.id}`} className="group flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#FFD700] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-[#98989A] line-clamp-3 text-sm">{post.content}</p>
                    </Link>

                    <div className="mt-6 pt-4 border-t border-[#262626] flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center gap-1.5 text-[#98989A] hover:text-[#FFD700] transition-colors"
                        >
                          <Heart size={18} />
                          <span className="text-sm">{post.likesCount || 0}</span>
                        </button>
                        <Link
                          href={`/posts/${post.id}#comments`}
                          className="flex items-center gap-1.5 text-[#98989A] hover:text-white transition-colors"
                        >
                          <MessageCircle size={18} />
                          <span className="text-sm">{post.commentsCount || 0}</span>
                        </Link>
                      </div>
                      <button
                        onClick={() => handleShare(post.id)}
                        className="flex items-center gap-1.5 text-[#98989A] hover:text-white transition-colors"
                      >
                        <Share2 size={18} />
                        <span className="text-sm">{post.shares || 0}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full border border-[#262626] flex items-center justify-center text-[#98989A] hover:text-white hover:border-[#FFD700] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-[#FFD700] w-6' : 'bg-[#262626] w-2 hover:bg-[#98989A]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === totalPages - 1}
              className="w-10 h-10 rounded-full border border-[#262626] flex items-center justify-center text-[#98989A] hover:text-white hover:border-[#FFD700] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}