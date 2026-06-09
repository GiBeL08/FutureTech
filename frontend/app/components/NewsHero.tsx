'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type Props = {
  featured: {
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
    image: string;
    title: string;
    category: string;
  }[];
};

export default function NewsHero({ featured, smallArticles }: Props) {
  const activeFeatured = featured || {
    image: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=900&h=600&q=80',
    category: 'Climate Change',
    title: 'Global Climate Summit Addresses Urgent Need for Action',
    desc: 'World leaders gathered at the Global Climate Summit to discuss and pledge commitment to ambitious targets for reducing greenhouse gas emissions and transitioning to renewable energy sources.',
    author: {
      name: 'Sarah Thompson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
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

        {/* ШАПКА СЕКЦИИ */}
        <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-20 lg:py-16 border-b border-[#262626]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="inline-block bg-[#1A1A1A] border border-[#262626] px-4 py-1.5 rounded-[6px] mb-4">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                Stay Informed with Fresh Stories
              </span>
            </div>
            <h1 className="text-[28px] sm:text-[38px] lg:text-[48px] font-semibold text-white tracking-tight leading-tight">
              Today&apos;s Headlines: Stay
              <br />
              Informed
            </h1>
          </motion.div>
        </div>

        {/* ОСНОВНАЯ СТАТЬЯ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="flex flex-col lg:flex-row border-b border-[#262626]"
        >
          {/* Крупное изображение */}
          <div className="lg:flex-[1.2] relative overflow-hidden">
           {activeFeatured?.image ? (
            <img
              src={activeFeatured.image}
              alt={activeFeatured.title}
              className="w-full h-[260px] sm:h-[360px] lg:h-full object-cover"
            />
            ) : (
              <div className="w-full h-[260px] sm:h-[360px] lg:h-full bg-[#1f1f1f] flex items-center justify-center text-gray-500">
                No image
              </div>
            )}
            {/* Градиент поверх фото */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Бейдж категории */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#1A1A1A]/80 border border-[#262626] px-3 py-1 rounded-[6px] backdrop-blur-sm">
              <span className="text-white text-xs font-medium">{activeFeatured.category}</span>
            </div>
          </div>

          {/* Описание статьи (справа) */}
          <div className="lg:flex-1 p-4 sm:p-6 lg:p-12 flex flex-col justify-center gap-4 lg:border-l border-[#262626]">
            <h2 className="text-[22px] sm:text-[28px] lg:text-[32px] font-semibold text-white leading-tight tracking-tight">
              {activeFeatured.title}
            </h2>
            <p className="text-[#98989A] text-sm lg:text-base font-light leading-relaxed">
              {activeFeatured.desc}
            </p>

            {/* Автор и метаданные */}
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <div className="flex items-center gap-3">
                {activeFeatured?.author?.avatar ? (
                  <img
                    src={activeFeatured.author.avatar}
                    alt={activeFeatured.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#262626]"
                  />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center text-xs text-gray-400">
                      N/A
                    </div>
                  )}
                <span className="text-white text-sm font-medium">{activeFeatured.author.name}</span>
              </div>
              <span className="text-[#7E7E81] text-xs">{activeFeatured.date}</span>
              <span className="text-[#7E7E81] text-xs">{activeFeatured.readTime}</span>
            </div>

            {/* Кнопка */}
            <button className="inline-flex items-center gap-3 bg-[#141414] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white hover:border-[#3a3a3a] cursor-pointer group self-start mt-2">
              <span className="text-sm font-medium">Read More</span>
              <ArrowUpRight size={18} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* ТРИ МАЛЕНЬКИХ КАРТОЧКИ */}
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {smallArticles.map((article, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } },
              }}
              className={`group cursor-pointer hover:bg-[#1A1A1C]/20 transition-colors ${
                i < 2 ? 'sm:border-r border-b sm:border-b-0' : 'border-b sm:border-b-0'
              } border-[#262626]`}
            >
              {/* Картинка */}
              <div className="relative overflow-hidden">
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-[180px] sm:h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-[180px] sm:h-[200px] bg-[#1f1f1f] flex items-center justify-center text-gray-500">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              {/* Текст */}
              <div className="p-4 sm:p-5 lg:p-6">
                <span className="text-[#7E7E81] text-xs font-light">{article.category}</span>
                <h4 className="text-white text-sm sm:text-base lg:text-lg font-semibold mt-1 leading-tight group-hover:text-[#FFD11A] transition-colors">
                  {article.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
