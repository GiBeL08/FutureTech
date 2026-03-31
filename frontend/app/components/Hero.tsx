'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import HeroAnimation from './HeroAnimation';

export default function Hero() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto flex flex-col lg:flex-row">
        
        {/* ЛЕВАЯ ЧАСТЬ: КОНТЕНТ */}
        <div className="flex-[1.2] p-6 lg:p-20 lg:border-r border-[#262626]">
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} className="text-[#7E7E81] text-base lg:text-lg mb-4">
            Your Journey to Tomorrow Begins Here
          </motion.p>
          
          <motion.h1 initial="hidden" animate="visible" variants={fadeInUp} className="text-1xl lg:text-6xl font-bold mb-6 leading-tight">
            Explore the Frontiers of <br className="hidden lg:block" /> Artificial Intelligence
          </motion.h1>
          
          <motion.p initial="hidden" animate="visible" variants={fadeInUp} className="text-[#7E7E81] text-sm lg:text-lg mb-12 max-w-2xl">
            Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future.
          </motion.p>

          <div className="grid grid-cols-3 gap-4 border-t border-[#262626] pt-10">
            {[
              { val: '300+', label: 'Resources available' },
              { val: '12k+', label: 'Total Downloads' },
              { val: '10k+', label: 'Active Users' }
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-xl lg:text-4xl font-bold">{stat.val.replace('+', '')}<span className="text-[#FFD700]">+</span></p>
                <p className="text-[#7E7E81] text-[10px] lg:text-sm mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: АНИМАЦИЯ */}
        <div className="flex-1 relative min-h-[400px] lg:min-h-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <HeroAnimation />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10 bg-[#1A1A1A]/80 backdrop-blur-xl border border-[#262626] p-6 lg:p-8 rounded-[24px] max-w-[320px] lg:max-w-[380px]"
          >
            <div className="flex -space-x-3 mb-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#1A1A1A] bg-zinc-800" />
              ))}
            </div>
            <h3 className="text-lg lg:text-xl font-bold mb-2">Explore 1000+ resources</h3>
            <p className="text-[#7E7E81] text-xs lg:text-sm mb-6">Over 1,000 articles on emerging tech trends and breakthroughs.</p>
            <button className="w-full flex items-center justify-between bg-[#141414] border border-[#262626] px-5 py-3 rounded-xl text-white group transition-all hover:bg-[#1f1f1f]">
              <span className="text-[#7E7E81] group-hover:text-white transition-colors">Explore Resources</span>
              <ArrowUpRight size={18} className="text-[#FFD700] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>

      {/* НИЖНИЕ КАРТОЧКИ */}
      <div className="max-w-[1536px] mx-auto grid grid-cols-1 md:grid-cols-3 border-t border-[#262626]">
        {[
          { title: 'Latest News Updates', desc: 'Stay Current' },
          { title: 'Expert Contributors', desc: 'Trusted Insights' },
          { title: 'Global Readership', desc: 'Worldwide Impact' }
        ].map((item, i) => (
          <div key={i} className={`p-8 lg:p-12 border-b md:border-b-0 ${i < 2 ? 'md:border-r' : ''} border-[#262626] group cursor-pointer hover:bg-[#1c1c1c] transition-all`}>
             <div className="flex items-center justify-between mb-4">
               <h4 className="text-lg font-bold">{item.title}</h4>
               <div className="p-2 bg-[#FFD700] rounded-full text-black"><ArrowUpRight size={20}/></div>
             </div>
             <p className="text-[#7E7E81] text-sm mb-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}