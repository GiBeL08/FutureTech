'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type Props = {
  headlines: {
    id: number;
    title: string;
    desc: string;
    date: string;
    author: {
      name: string;
      avatar: string;
    };
  }[];
};

export default function HeadlinesSection({ headlines }: Props) {
  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">

        {/* ШАПКА СЕКЦИИ */}
        <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-20 lg:py-16 border-b border-[#262626] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col items-start">
            <div className="inline-block bg-[#1A1A1A] border border-[#262626] px-4 py-1.5 rounded-[6px] mb-4">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                Welcome to Headlines
              </span>
            </div>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[48px] font-semibold text-white tracking-tight leading-tight">
              Discover the World of
              <br />
              Headlines
            </h2>
          </div>

          <button className="inline-flex items-center gap-3 bg-[#1A1A1A] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] transition-all duration-300 hover:bg-[#202022] hover:text-white cursor-pointer group flex-shrink-0">
            <span className="text-sm font-medium">View All Headlines</span>
            <ArrowUpRight size={18} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* СПИСОК СТАТЕЙ */}
        <div className="flex flex-col">
          <AnimatePresence mode="popLayout">
            {headlines.map((article) => (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
                className="p-4 sm:p-6 lg:p-12 border-b border-[#262626] last:border-b-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8 group hover:bg-[#1A1A1C]/20 transition-colors duration-300"
              >

                {/* Левая колонка: Автор */}
                <div className="flex items-center gap-3 lg:w-[220px] flex-shrink-0">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#262626]"
                  />
                  <div className="flex flex-col">
                    <h4 className="text-white text-sm lg:text-base font-semibold leading-tight">
                      {article.author.name}
                    </h4>
                    <p className="text-[#7E7E81] text-xs font-light mt-0.5">
                      {article.date}
                    </p>
                  </div>
                </div>

                {/* Средняя колонка: Контент */}
                <div className="flex-grow flex flex-col gap-2 max-w-[720px]">
                  <h3 className="text-lg sm:text-xl lg:text-[22px] font-semibold text-white leading-tight group-hover:text-[#FFD11A] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#98989A] text-sm lg:text-[15px] font-light leading-relaxed">
                    {article.desc}
                  </p>
                </div>

                {/* Правая колонка: Кнопка */}
                <div className="flex-shrink-0 w-full lg:w-auto flex justify-start lg:justify-end">
                  <button className="inline-flex items-center gap-3 bg-[#141414] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] transition-all duration-300 hover:bg-[#1A1A1A] hover:text-white hover:border-[#3a3a3a] cursor-pointer group/btn">
                    <span className="text-sm font-medium">Read More</span>
                    <ArrowUpRight size={18} className="text-[#FFD11A] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
