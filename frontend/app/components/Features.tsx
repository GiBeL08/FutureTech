'use client';

import { motion } from 'framer-motion';

// Кастомные SVG-иконки для левых колонок категорий (соответствуют дизайну макета)

// Иконка 1: Желтый ромб с серыми пересекающимися эллипсами вокруг (для Future Technology Blog)
function FutureTechBlogIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Вертикальный серый эллипс */}
      <path d="M24 8C27.3137 8 30 15.1634 30 24C30 32.8366 27.3137 40 24 40C20.6863 40 18 32.8366 18 24C18 15.1634 20.6863 8 24 8Z" fill="#7E7E81" opacity="0.35" />
      {/* Горизонтальный серый эллипс */}
      <path d="M24 14C32.8366 14 40 18.4772 40 24C40 29.5228 32.8366 34 24 34C15.1634 34 8 29.5228 8 24C8 18.4772 15.1634 14 24 14Z" fill="#7E7E81" opacity="0.35" />
      {/* Центральный желтый ромб-крест */}
      <path d="M24 12L28 20L36 24L28 28L24 36L20 28L12 24L20 20Z" fill="#FFD11A" />
      {/* Темный центр внутри желтого ромба */}
      <circle cx="24" cy="24" r="3" fill="#141414" />
    </svg>
  );
}

// Иконка 2: Три серых перекрывающихся треугольника на желтом основании (для Research Insights Blogs)
function ResearchInsightsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Левый серый треугольник */}
      <path d="M10 28L17 18L24 28H10Z" fill="#7E7E81" opacity="0.4" />
      {/* Правый серый треугольник */}
      <path d="M24 28L31 18L38 28H24Z" fill="#7E7E81" opacity="0.4" />
      {/* Центральный серый треугольник (выше остальных) */}
      <path d="M17 28L24 14L31 28H17Z" fill="#7E7E81" opacity="0.6" />
      {/* Желтое основание-брусок */}
      <rect x="8" y="30" width="32" height="6" rx="1.5" fill="#FFD11A" />
    </svg>
  );
}

export default function Features() {
  // Анимация появления контента при прокрутке
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  // Данные для первой строки (Future Technology Blog)
  const blogFeatures = [
    { title: 'Quantity', desc: 'Over 1,000 articles on emerging tech trends and breakthroughs.' },
    { title: 'Variety', desc: 'Articles cover fields like AI, robotics, biotechnology, and more.' },
    { title: 'Frequency', desc: 'Fresh content added daily to keep you up to date.' },
    { title: 'Authoritative', desc: 'Written by our team of tech experts and industry professionals.' }
  ];

  // Данные для второй строки (Research Insights Blogs)
  const researchFeatures = [
    { title: 'Depth', desc: '500+ research articles for in-depth understanding.' },
    { title: 'Graphics', desc: 'Visual aids and infographics to enhance comprehension.' },
    { title: 'Trends', desc: 'Explore emerging trends in future technology research.' },
    { title: 'Contributors', desc: 'Contributions from tech researchers and academics.' }
  ];

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">
        
        {/* БЛОК ЗАГОЛОВКА СЕКЦИИ */}
        <div className="px-6 py-12 lg:px-20 lg:py-16 border-b border-[#262626] flex flex-col items-start">
          <div className="inline-block bg-[#1A1A1A] border border-[#262626] px-4 py-1.5 rounded-[6px] mb-4">
            <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
              Unlock the Power of
            </span>
          </div>
          <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-semibold text-white tracking-tight">
            FutureTech Features
          </h2>
        </div>

        {/* СТРОКА 1: Future Technology Blog */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] border-b border-[#262626]">
          {/* Левая колонка категории */}
          <div className="p-6 lg:p-20 flex flex-col justify-center items-start lg:border-r border-[#262626]">
            <div className="mb-6 bg-[#1A1A1A] border border-[#262626] p-4 rounded-[12px] flex items-center justify-center">
              <FutureTechBlogIcon />
            </div>
            <h3 className="text-[24px] lg:text-[30px] font-semibold text-white mb-3">
              Future Technology Blog
            </h3>
            <p className="text-[#7E7E81] text-sm lg:text-[16px] font-light leading-relaxed max-w-[420px]">
              Stay informed with our blog section dedicated to future technology.
            </p>
          </div>

          {/* Правая колонка с карточками 2x2 */}
          <div className="p-6 lg:p-20 bg-[#0F0F10]/40 flex items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 w-full">
              {blogFeatures.map((feat, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeInUp}
                  className="bg-[#1A1A1A] border border-[#262626] p-6 lg:p-8 rounded-[12px] hover:border-[#3a3a3a] transition-colors duration-300"
                >
                  <h4 className="text-white text-lg lg:text-[20px] font-semibold mb-3">
                    {feat.title}
                  </h4>
                  <p className="text-[#98989A] text-sm lg:text-[15px] font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* СТРОКА 2: Research Insights Blogs */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr]">
          {/* Левая колонка категории */}
          <div className="p-6 lg:p-20 flex flex-col justify-center items-start lg:border-r border-[#262626]">
            <div className="mb-6 bg-[#1A1A1A] border border-[#262626] p-4 rounded-[12px] flex items-center justify-center">
              <ResearchInsightsIcon />
            </div>
            <h3 className="text-[24px] lg:text-[30px] font-semibold text-white mb-3">
              Research Insights Blogs
            </h3>
            <p className="text-[#7E7E81] text-sm lg:text-[16px] font-light leading-relaxed max-w-[420px]">
              Dive deep into future technology concepts with our research section.
            </p>
          </div>

          {/* Правая колонка с карточками 2x2 */}
          <div className="p-6 lg:p-20 bg-[#0F0F10]/40 flex items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 w-full">
              {researchFeatures.map((feat, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  variants={fadeInUp}
                  className="bg-[#1A1A1A] border border-[#262626] p-6 lg:p-8 rounded-[12px] hover:border-[#3a3a3a] transition-colors duration-300"
                >
                  <h4 className="text-white text-lg lg:text-[20px] font-semibold mb-3">
                    {feat.title}
                  </h4>
                  <p className="text-[#98989A] text-sm lg:text-[15px] font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
