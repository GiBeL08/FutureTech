'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import HeroAnimation from './HeroAnimation';

function StarburstIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 4L21.5 14.5L32 18L21.5 21.5L18 32L14.5 21.5L4 18L14.5 14.5Z" fill="#FFD11A" />
      <circle cx="18" cy="18" r="3" fill="#141414" />
      <circle cx="11" cy="11" r="1.5" fill="#FFD11A" />
      <circle cx="25" cy="11" r="1.5" fill="#FFD11A" />
      <circle cx="11" cy="25" r="1.5" fill="#FFD11A" />
      <circle cx="25" cy="25" r="1.5" fill="#FFD11A" />
    </svg>
  );
}

function CirclesIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="6" fill="#FFD11A" />
      <circle cx="22" cy="22" r="6" fill="#FFD11A" />
      <circle cx="22" cy="14" r="6" fill="#7E7E81" opacity="0.5" />
      <circle cx="14" cy="22" r="6" fill="#7E7E81" opacity="0.5" />
      <circle cx="18" cy="18" r="4" fill="#FFD11A" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 18 C18 10 24 6 30 6 C30 12 26 18 18 18 Z" fill="#FFD11A" />
      <path d="M18 18 C18 26 12 30 6 30 C6 24 10 18 18 18 Z" fill="#7E7E81" opacity="0.5" />
    </svg>
  );
}

type StatItem = { val: string; label: string };

const defaultStats: StatItem[] = [
  { val: '300+', label: 'Resources available' },
  { val: '12k+', label: 'Total Downloads' },
  { val: '10k+', label: 'Active Users' },
];

type HeroProps = {
  initialStats?: StatItem[];
};

export default function Hero({ initialStats }: HeroProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const stats = initialStats?.length ? initialStats : defaultStats;

  const features = [
    {
      title: 'Latest News Updates',
      desc: 'Stay Current',
      bottomText: 'Over 1,000 articles published monthly',
      icon: <StarburstIcon />
    },
    {
      title: 'Expert Contributors',
      desc: 'Trusted Insights',
      bottomText: '50+ renowned AI experts on our team',
      icon: <CirclesIcon />
    },
    {
      title: 'Global Readership',
      desc: 'Worldwide Impact',
      bottomText: '2 million monthly readers',
      icon: <LeafIcon />
    }
  ];

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80'
  ];

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto flex flex-col lg:flex-row border-x border-[#262626]">

        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="flex-[1.2] flex flex-col lg:border-r border-[#262626]">
          <div className="px-6 pt-10 pb-8 lg:px-20 lg:pt-20 lg:pb-16 flex flex-col gap-6 flex-grow">
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-[#7E7E81] text-sm sm:text-base font-light tracking-wide"
            >
              Your Journey to Tomorrow Begins Here
            </motion.p>

            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-[38px] sm:text-[48px] lg:text-[64px] xl:text-[72px] font-semibold leading-[1.06] tracking-[-0.02em] text-white max-w-[700px]"
            >
              Explore the Frontiers of Artificial Intelligence
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-[#7E7E81] text-base lg:text-lg font-light leading-relaxed max-w-[560px]"
            >
              Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.
            </motion.p>
          </div>

          {/* Блок статистики */}
          <div className="grid grid-cols-3 border-t border-[#262626]">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`py-8 lg:py-10 flex flex-col justify-center px-4 lg:px-10
                  ${i === 0 ? 'lg:pl-20' : ''}
                  ${i === 2 ? 'lg:pr-20' : ''}
                  ${i < 2 ? 'border-r border-[#262626]' : ''}
                `}
              >
                <p className="text-[26px] sm:text-[34px] lg:text-[42px] font-bold leading-none text-white">
                  {stat.val.replace('+', '')}
                  <span className="text-[#FFD11A]">+</span>
                </p>
                <p className="text-[#7E7E81] text-[11px] sm:text-[13px] mt-2 font-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="flex-1 relative min-h-[360px] sm:min-h-[480px] lg:min-h-full overflow-hidden bg-[#0D0E11]">
          <div className="absolute inset-0 z-0">
            <HeroAnimation />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute z-10 left-6 bottom-8 sm:left-8 sm:bottom-10 md:left-12 md:bottom-14 flex flex-col items-start gap-6"
          >
            {/* Аватары */}
            <div className="flex items-center p-2 rounded-[100px] border border-[#262626] bg-[#1A1A1A]">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Contributor avatar"
                  className="w-[52px] h-[52px] rounded-full border-2 border-[#1A1A1A] object-cover flex-shrink-0 [&:not(:first-child)]:-ml-3"
                />
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="text-2xl sm:text-[28px] font-semibold text-white tracking-tight leading-tight">
                Explore 1000+ resources
              </h3>
              <p className="text-[#98989A] text-sm sm:text-base font-light leading-relaxed max-w-[400px]">
                Over 1,000 articles on emerging tech trends and breakthroughs.
              </p>
            </div>

            <button className="inline-flex items-center gap-3 bg-[#141414] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white hover:border-[#3a3a3a] cursor-pointer group">
              <span className="text-sm font-medium">Explore Resources</span>
              <ArrowUpRight size={18} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* НИЖНИЕ КАРТОЧКИ */}
      <div className="max-w-[1536px] mx-auto grid grid-cols-1 md:grid-cols-3 border-t border-[#262626] border-x border-x-[#262626]">
        {features.map((item, i) => (
          <div
            key={i}
            className={`p-6 lg:p-10 border-b md:border-b-0 ${i < 2 ? 'md:border-r' : ''} border-[#262626] group cursor-pointer hover:bg-[#17181A]/40 transition-colors`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[18px] sm:text-[20px] lg:text-[22px] font-semibold text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[#7E7E81] text-xs sm:text-sm font-light mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFD11A] text-black flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
            <p className="text-[#98989A] text-sm md:text-base font-light leading-relaxed mt-4">
              {item.bottomText}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}