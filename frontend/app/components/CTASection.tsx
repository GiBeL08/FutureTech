'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Кастомный крупный логотип FutureTech
function FutureTechLogoLarge() {
  return (
    <svg width="74" height="74" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Внутреннее светящееся кольцо */}
      <circle cx="40" cy="40" r="12" stroke="#FFD11A" strokeWidth="4" />
      {/* Симметричные скобки, образующие хай-тек шестеренку/бесконечность */}
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
      title: 'Subscribe to Newsletter',
      desc: 'Get weekly updates on emerging AI trends sent straight to your inbox.',
      action: 'Subscribe'
    },
    {
      title: 'Explore Premium Plans',
      desc: 'Unlock unlimited access to our in-depth research papers and ebooks.',
      action: 'View Plans'
    },
    {
      title: 'Contact Our Team',
      desc: 'Have questions? Reach out to our technical writers and AI researchers.',
      action: 'Contact Us'
    }
  ];

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626] p-6 lg:p-20">
        
        {/* КАРТОЧКА СТА-БЛОКА С ЛОГОТИПОМ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="bg-[#1C1C1E]/50 border border-[#262626] rounded-[24px] p-6 lg:p-14 mb-8"
        >
          {/* Верхняя часть: Логотип + Описание */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10 border-b border-[#262626] pb-8 lg:pb-12 mb-8 lg:mb-12">
            <div className="bg-[#141414] border border-[#262626] p-5 rounded-[20px] flex-shrink-0 flex items-center justify-center">
              <FutureTechLogoLarge />
            </div>
            
            <div className="flex flex-col items-start">
              <div className="inline-block bg-[#1E1E1F] border border-[#262626] px-4 py-1.5 rounded-[6px] mb-3">
                <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                  Learn Today, Lead Tomorrow
                </span>
              </div>
              <h2 className="text-[28px] sm:text-[38px] lg:text-[46px] font-semibold text-white tracking-tight leading-tight mb-3">
                Be Part of the FutureTech Revolution
              </h2>
              <p className="text-[#98989A] text-sm lg:text-[16px] font-light leading-relaxed max-w-[800px]">
                Subscribe to our premium plans to get unlimited access to all articles, scientific research documents, weekly newsletters, and professional tech ebooks.
              </p>
            </div>
          </div>

          {/* Нижняя часть: Три плитки с призывом к действию */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {ctaCards.map((card, i) => (
              <div 
                key={i}
                className="bg-[#141414] border border-[#262626] p-6 lg:p-8 rounded-[16px] flex items-center justify-between gap-4 hover:border-[#3a3a3a] transition-all duration-300 group cursor-pointer"
              >
                <div className="flex flex-col gap-2">
                  <h4 className="text-white text-base lg:text-lg font-semibold group-hover:text-[#FFD11A] transition-colors leading-tight">
                    {card.title}
                  </h4>
                  <p className="text-[#7E7E81] text-xs lg:text-sm font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Круглая желтая кнопка со стрелкой наведения */}
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
