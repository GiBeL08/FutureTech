'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Heart, Eye } from 'lucide-react';

interface Blog {
  id: number;
  category: string;
  title: string;
  desc: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  metrics: {
    likes: string;
    views: string;
  };
  tags: string[];
}

type Props = {
  initialBlogs: Blog[];
};

export default function BlogsSection({ initialBlogs }: Props) {
  const [activeTab, setActiveTab] = useState('All');

  const categories = [
    'All',
    'Artificial Intelligence',
    'Robotics',
    'Tech & Society',
    'Future Tech',
    'Biotechnology'
  ];

  const hardcodedBlogs: Blog[] = [
    {
      id: 1,
      category: 'Artificial Intelligence',
      title: 'A Deep Dive into Neural Networks',
      desc: 'Explore how artificial neural networks learn, adapt, and process complex information to mimic the human brain.',
      date: 'October 10, 2023',
      author: {
        name: 'Christian Aliza',
        role: 'AI Specialist',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
      },
      metrics: { likes: '1.2k', views: '10k' },
      tags: ['AI', 'Deep Learning']
    },
    {
      id: 2,
      category: 'Robotics',
      title: 'The Rise of Autonomous Robotics',
      desc: 'How self-driving systems and collaborative robots are redefining warehousing, manufacturing, and household chores.',
      date: 'November 5, 2023',
      author: {
        name: 'Sarah Jenkins',
        role: 'Robotics Engineer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80'
      },
      metrics: { likes: '850', views: '6.2k' },
      tags: ['Robotics', 'Automation']
    },
    {
      id: 3,
      category: 'Tech & Society',
      title: 'AI Ethics: Navigating the Future',
      desc: 'Understanding the ethical implications of artificial intelligence, from biased algorithms to job displacement concerns.',
      date: 'December 1, 2023',
      author: {
        name: 'Michael Chen',
        role: 'Tech Ethics Advocate',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80'
      },
      metrics: { likes: '1.5k', views: '12.4k' },
      tags: ['Ethics', 'Society']
    },
    {
      id: 4,
      category: 'Future Tech',
      title: 'Quantum Computing: The Next Frontier',
      desc: 'How quantum bits (qubits) will unlock computing speeds that were previously thought to be mathematically impossible.',
      date: 'January 15, 2024',
      author: {
        name: 'Elena Rostova',
        role: 'Quantum Physicist',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&h=80&q=80'
      },
      metrics: { likes: '2.1k', views: '18.3k' },
      tags: ['Quantum', 'Future Tech']
    },
    {
      id: 5,
      category: 'Biotechnology',
      title: 'CRISPR and AI in Drug Discovery',
      desc: 'Using machine learning models to predict gene editing outcomes and accelerate biological breakthroughs in medicine.',
      date: 'February 20, 2024',
      author: {
        name: 'Dr. Alex Patel',
        role: 'Biotech Researcher',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80'
      },
      metrics: { likes: '940', views: '5.8k' },
      tags: ['Biotech', 'CRISPR']
    }
  ];

  const blogsData = initialBlogs && initialBlogs.length > 0 ? initialBlogs : hardcodedBlogs;

  const filteredBlogs = activeTab === 'All'
    ? blogsData
    : blogsData.filter(blog => blog.category === activeTab);

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">

        {/* ШАПКА */}
        <div className="px-6 py-12 lg:px-20 lg:py-16 border-b border-[#262626] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col items-start">
            <div className="inline-block bg-[#1A1A1A] border border-[#262626] px-4 py-1.5 rounded-[6px] mb-4">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                A Journey through AI
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-semibold text-white tracking-tight leading-tight">
              Explore FutureTech&apos;s
              <br />
              In-Depth Blog Posts
            </h2>
          </div>

          <button className="inline-flex items-center gap-3 bg-[#1A1A1A] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] transition-all duration-300 hover:bg-[#202022] hover:text-white cursor-pointer group flex-shrink-0">
            <span className="text-sm font-medium">View All Blogs</span>
            <ArrowUpRight size={18} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* ТАБЫ */}
        <div className="px-6 py-6 lg:px-20 lg:py-8 border-b border-[#262626] overflow-x-auto scrollbar-none">
          <div className="flex gap-3 min-w-max">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 rounded-[8px] border text-sm font-light transition-all duration-300 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#1E1E1F] border-[#3a3a3b] text-white'
                    : 'bg-[#141414] border-[#262626] text-[#7E7E81] hover:text-white hover:border-[#333]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* СПИСОК БЛОГОВ */}
        <div className="flex flex-col">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="p-6 lg:p-12 border-b border-[#262626] last:border-b-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 group hover:bg-[#1A1A1C]/20 transition-colors duration-300"
                >
                  {/* Автор */}
                  <div className="flex items-center gap-4 lg:w-[260px] flex-shrink-0">
                    <img
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-12 h-12 rounded-full object-cover border border-[#262626]"
                    />
                    <div className="flex flex-col">
                      <h4 className="text-white text-base lg:text-lg font-semibold leading-tight">
                        {blog.author.name}
                      </h4>
                      <p className="text-[#7E7E81] text-xs lg:text-sm font-light mt-0.5">
                        {blog.author.role}
                      </p>
                    </div>
                  </div>

                  {/* Контент */}
                  <div className="flex-grow flex flex-col gap-3 max-w-[720px]">
                    <span className="text-[#7E7E81] text-xs sm:text-sm font-light">
                      {blog.date}
                    </span>
                    <h3 className="text-xl lg:text-[24px] font-semibold text-white leading-tight group-hover:text-[#FFD11A] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-[#98989A] text-sm lg:text-[16px] font-light leading-relaxed">
                      {blog.desc}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#262626] bg-[#1A1A1A] text-[#7E7E81] text-xs">
                        <Heart size={14} className="text-[#FF4B4B]" />
                        <span>{blog.metrics.likes}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#262626] bg-[#1A1A1A] text-[#7E7E81] text-xs">
                        <Eye size={14} className="text-[#FFD11A]" />
                        <span>{blog.metrics.views}</span>
                      </div>
                      {blog.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-[6px] border border-[#262626] bg-[#141414] text-[#7E7E81] text-xs font-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Кнопка */}
                  <div className="flex-shrink-0 w-full lg:w-auto flex justify-end lg:block">
                    <Link
                      href={`/blogs/${blog.id}`}
                      className="inline-flex items-center gap-3 bg-[#141414] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white hover:border-[#3a3a3a] cursor-pointer group w-full lg:w-auto justify-center"
                    >
                      <span className="text-sm font-medium">Read Blog</span>
                      <ArrowUpRight size={18} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center text-[#7E7E81]"
              >
                No blogs found in this category.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}