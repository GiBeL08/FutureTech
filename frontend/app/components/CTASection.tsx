'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

function FutureTechLogoLarge() {
  return (
    <svg width="74" height="74" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="12" stroke="#FFD11A" strokeWidth="4" />
      <path d="M22 22C14 30 14 50 22 58" stroke="#FFD11A" strokeWidth="5" strokeLinecap="round" />
      <path d="M58 22C66 30 66 50 58 58" stroke="#FFD11A" strokeWidth="5" strokeLinecap="round" />
      <path d="M22 22C30 14 50 14 58 22" stroke="#FFD11A" strokeWidth="5" strokeLinecap="round" />
      <path d="M22 58C30 66 50 66 58 58" stroke="#FFD11A" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export default function CTASection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const ctaCards = [
    {
      icon: '①',
      title: 'Resource Access',
      desc: 'Instant access to premium articles, research, and ebooks.',
    },
    {
      icon: '②',
      title: 'Community Forum',
      desc: 'Join our active community forum to discuss future tech with peers.',
    },
    {
      icon: '③',
      title: 'Tech Events',
      desc: 'Stay updated on upcoming webinars, workshops, and conferences.',
    }
  ];

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">

        {/* ГЛАВНАЯ CTA КАРТОЧКА */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="m-6 lg:m-16 bg-[#1C1C1E]/50 border border-[#262626] rounded-[24px] overflow-hidden"
        >
          {/* Верх: Логотип + Текст */}
          <div className="p-6 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10 border-b border-[#262626]">
            <div className="bg-[#141414] border border-[#262626] p-5 rounded-[20px] flex-shrink-0 flex items-center justify-center">
              <FutureTechLogoLarge />
            </div>

            <div className="flex flex-col items-start">
              <div className="inline-block bg-[#1E1E1F] border border-[#262626] px-4 py-1.5 rounded-[6px] mb-3">
                <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                  Learn Today, Lead Tomorrow, and Innovate
                </span>
              </div>
              <h2 className="text-[28px] sm:text-[36px] lg:text-[44px] font-semibold text-white tracking-tight leading-tight mb-3">
                Be Part of the Future Tech Revolution
              </h2>
              <p className="text-[#98989A] text-sm lg:text-base font-light leading-relaxed max-w-[780px]">
                Subscribe to our premium plans to get unlimited access to all articles, scientific research documents, weekly newsletters, and professional tech ebooks.
              </p>
            </div>
          </div>

          {/* Низ: 3 карточки */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {ctaCards.map((card, i) => (
              <div
                key={i}
                className={`p-6 lg:p-10 flex items-center justify-between gap-4 group cursor-pointer hover:bg-[#141414]/60 transition-colors duration-300
                  ${i < 2 ? 'border-b md:border-b-0 md:border-r border-[#262626]' : ''}
                `}
              >
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFD11A] flex items-center justify-center mb-1 flex-shrink-0">
                    <span className="text-black text-xs font-bold">{i + 1}</span>
                  </div>
                  <h4 className="text-white text-base lg:text-lg font-semibold group-hover:text-[#FFD11A] transition-colors leading-tight">
                    {card.title}
                  </h4>
                  <p className="text-[#7E7E81] text-xs lg:text-sm font-light leading-relaxed max-w-[260px]">
                    {card.desc}
                  </p>
                </div>

                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#FFD11A] text-black flex items-center justify-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}