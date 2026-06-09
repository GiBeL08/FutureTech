'use client';

import { motion } from 'framer-motion';

type Props = {
  stats: { value: string; label: string }[];
};

export default function ResourcesHero({ stats: initialStats }: Props) {
  const stats = initialStats && initialStats.length > 0 ? initialStats : [
    { value: '300+', label: 'Resources Available' },
    { value: '12k+', label: 'Total Downloads' },
    { value: '10k+', label: 'Active Users' },
    { value: '100+', label: 'Exclusive Resources' },
  ];
  const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">
        <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-20 lg:py-16 border-b border-[#262626]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6"
          >
            <h1 className="text-[34px] sm:text-[44px] lg:text-[56px] font-semibold text-white tracking-tight leading-[1.05]">
              Unlock a World of
              <br />
              Knowledge
            </h1>
            <p className="text-[#7E7E81] text-sm lg:text-[15px] font-light leading-relaxed max-w-[560px] pt-2">
              Explore our curated resources designed to help you learn faster, think deeper, and build with confidence.
              From whitepapers to reports, everything is structured for practical discovery.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10 border-[#262626] ${
                i < 3 ? 'lg:border-r' : ''
              } ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : 'border-b lg:border-b-0'}`}
            >
              <p className="text-white text-[26px] sm:text-[32px] lg:text-[36px] font-semibold leading-none">
                {s.value.replace('+', '')}
                <span className="text-[#FFD11A]">+</span>
              </p>
              <p className="text-[#7E7E81] text-[11px] sm:text-xs lg:text-sm font-light mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

