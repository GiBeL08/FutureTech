'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

type Props = {
  featured: {
    id: number; // 👈 ВАЖНО
    image: string;
    category: string;
    title: string;
    desc: string;
    author: {
      name: string;
      avatar: string;
    };
    date: string;
    readTime: string;
  } | null;
  smallArticles: {
    id: number; // 👈 добавил
    image: string;
    title: string;
    category: string;
  }[];
};

export default function NewsHero({ featured, smallArticles }: Props) {
  const activeFeatured = featured || {
    id: 1, // 👈 fallback
    image:
      'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=900&h=600&q=80',
    category: 'Climate Change',
    title: 'Global Climate Summit Addresses Urgent Need for Action',
    desc: 'World leaders gathered at the Global Climate Summit to discuss and pledge commitment to ambitious targets.',
    author: {
      name: 'Sarah Thompson',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
    },
    date: 'October 15, 2023',
    readTime: '5 Min Read',
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">

        {/* ШАПКА */}
        <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-20 lg:py-16 border-b border-[#262626]">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div className="inline-block bg-[#1A1A1A] border border-[#262626] px-4 py-1.5 rounded-[6px] mb-4">
              <span className="text-white text-xs sm:text-sm font-medium">
                Stay Informed with Fresh Stories
              </span>
            </div>
            <h1 className="text-[28px] sm:text-[38px] lg:text-[48px] font-semibold">
              Today&apos;s Headlines:
              <br />
              Stay Informed
            </h1>
          </motion.div>
        </div>

        {/* FEATURED */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          className="flex flex-col lg:flex-row border-b border-[#262626]"
        >
          <div className="lg:flex-[1.2] relative">
            {activeFeatured.image ? (
              <img
                src={activeFeatured.image}
                alt={activeFeatured.title}
                className="w-full h-[260px] sm:h-[360px] object-cover"
              />
            ) : (
              <div className="h-[260px] bg-[#1f1f1f] flex items-center justify-center">
                No image
              </div>
            )}
          </div>

          <div className="p-6 lg:p-12 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              {activeFeatured.title}
            </h2>

            <p className="text-[#98989A]">
              {activeFeatured.desc}
            </p>

            {/* 🔥 КНОПКА */}
            <Link href={`/news/${activeFeatured.id ?? 1}`}>
              <button className="inline-flex items-center gap-3 border border-[#262626] px-5 py-3 rounded text-[#98989A] hover:text-white">
                Read More
                <ArrowUpRight size={18} />
              </button>
            </Link>
          </div>
        </motion.div>

        {/* SMALL */}
         {/* SMALL */}
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {smallArticles.map((article, index) => {
            const articleId = article.id ?? `temp-${Date.now()}-${index}`;
            return (
              <Link key={articleId} href={`/news/${articleId}`}>
                <div className="p-4 border-b border-[#262626] cursor-pointer hover:bg-[#1A1A1C]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-[180px] object-cover mb-3"
                  />
                  <h4 className="text-white">{article.title}</h4>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}