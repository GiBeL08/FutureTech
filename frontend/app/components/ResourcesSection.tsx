'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

function EbooksIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="20" height="24" rx="2.5" stroke="#FFD11A" strokeWidth="2" />
      <path d="M12 10H20M12 15H20M12 20H17" stroke="#7E7E81" strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="21" r="2.5" fill="#FFD11A" />
    </svg>
  );
}

function WhitepapersIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="4" width="20" height="24" rx="2.5" stroke="#FFD11A" strokeWidth="2" />
      <path d="M10 10 L16 16 L22 10" stroke="#FFD11A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20H22" stroke="#7E7E81" strokeWidth="2" />
    </svg>
  );
}

export default function ResourcesSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const avatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80'
  ];

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">

        {/* ШАПКА */}
        <div className="px-6 py-12 lg:px-20 lg:py-16 border-b border-[#262626] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col items-start">
            <div className="inline-block bg-[#1A1A1A] border border-[#262626] px-4 py-1.5 rounded-[6px] mb-4">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                Your Gateway to Knowledge
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-semibold text-white tracking-tight leading-tight">
              Unlock Valuable Knowledge
              <br />
              with FutureTech&apos;s Resources
            </h2>
          </div>

          <button className="inline-flex items-center gap-3 bg-[#1A1A1A] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] transition-all duration-300 hover:bg-[#202022] hover:text-white cursor-pointer group flex-shrink-0">
            <span className="text-sm font-medium">View All Resources</span>
            <ArrowUpRight size={18} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* КАРТОЧКА 1: Ebooks */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] border-b border-[#262626]">
          {/* Левая колонка */}
          <div className="p-6 lg:p-20 flex flex-col justify-between items-start lg:border-r border-[#262626] gap-10">
            <div>
              <div className="mb-6 bg-[#1A1A1A] border border-[#262626] w-14 h-14 rounded-[12px] flex items-center justify-center">
                <EbooksIcon />
              </div>
              <h3 className="text-[28px] lg:text-[36px] font-semibold text-white mb-4">
                Ebooks
              </h3>
              <p className="text-[#7E7E81] text-sm lg:text-[16px] font-light leading-relaxed max-w-[420px]">
                Explore our collection of ebooks covering various AI and tech topics.
              </p>
            </div>

            <div className="w-full flex flex-col gap-6">
              <button className="inline-flex items-center gap-3 bg-[#1A1A1A] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] transition-all duration-300 hover:bg-[#202022] hover:text-white cursor-pointer group w-full sm:w-auto justify-center">
                <span className="text-sm font-medium">Download Ebooks Now</span>
                <ArrowUpRight size={18} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <div className="flex items-center gap-4 border-t border-[#262626] pt-6 w-full">
                <div className="flex flex-col">
                  <span className="text-[#7E7E81] text-xs font-light">Downloads</span>
                  <span className="text-white text-base lg:text-lg font-semibold mt-0.5">Over 10k+</span>
                </div>
                <div className="inline-flex items-center -space-x-3 px-3 py-1.5 rounded-full border border-[#262626] bg-[#1A1A1A]">
                  {avatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="User avatar"
                      className="w-7 h-7 rounded-full border-2 border-[#1A1A1A] object-cover flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="p-6 lg:p-20 bg-[#0F0F10]/40 flex items-center justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeInUp}
              className="bg-[#1A1A1A] border border-[#262626] p-6 lg:p-8 rounded-[16px] w-full max-w-[620px]"
            >
              <div className="h-[200px] sm:h-[260px] w-full rounded-[10px] overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=600&h=350&q=80"
                  alt="VR Headset"
                  className="w-full h-full object-cover brightness-[0.8]"
                />
              </div>

              <h4 className="text-white text-xl lg:text-[22px] font-semibold mb-2">
                The Ultimate Guide to AI
              </h4>
              <p className="text-[#98989A] text-sm lg:text-[15px] font-light leading-relaxed mb-6">
                A comprehensive guide on AI algorithms, tools, and neural network platforms.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-[#262626] pt-6 mb-6">
                <div className="bg-[#141414] border border-[#262626] p-4 rounded-[10px] flex flex-col">
                  <span className="text-[#7E7E81] text-xs font-light">Total Ebooks</span>
                  <span className="text-white text-base lg:text-lg font-semibold mt-1">Over 100+</span>
                </div>
                <div className="bg-[#141414] border border-[#262626] p-4 rounded-[10px] flex flex-col">
                  <span className="text-[#7E7E81] text-xs font-light">Download Format</span>
                  <span className="text-white text-base lg:text-lg font-semibold mt-1">PDF format</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-[#7E7E81] text-xs sm:text-sm font-light">
                  Ebooks are authored by renowned experts with an average of 10 years of experience
                </span>
                <button className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] px-4 py-2.5 rounded-[8px] text-[#98989A] hover:text-white transition-colors text-xs font-medium cursor-pointer group flex-shrink-0">
                  <span>Preview</span>
                  <ArrowUpRight size={14} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* КАРТОЧКА 2: Whitepapers */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr]">
          {/* Левая колонка */}
          <div className="p-6 lg:p-20 flex flex-col justify-between items-start lg:border-r border-[#262626] gap-10">
            <div>
              <div className="mb-6 bg-[#1A1A1A] border border-[#262626] w-14 h-14 rounded-[12px] flex items-center justify-center">
                <WhitepapersIcon />
              </div>
              <h3 className="text-[28px] lg:text-[36px] font-semibold text-white mb-4">
                Whitepapers
              </h3>
              <p className="text-[#7E7E81] text-sm lg:text-[16px] font-light leading-relaxed max-w-[420px]">
                Read our scientific whitepapers and research documents.
              </p>
            </div>

            <div className="w-full flex flex-col gap-6">
              <button className="inline-flex items-center gap-3 bg-[#1A1A1A] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] transition-all duration-300 hover:bg-[#202022] hover:text-white cursor-pointer group w-full sm:w-auto justify-center">
                <span className="text-sm font-medium">Download Whitepapers Now</span>
                <ArrowUpRight size={18} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <div className="flex items-center gap-4 border-t border-[#262626] pt-6 w-full">
                <div className="flex flex-col">
                  <span className="text-[#7E7E81] text-xs font-light">Downloads</span>
                  <span className="text-white text-base lg:text-lg font-semibold mt-0.5">Over 5k+</span>
                </div>
                <div className="inline-flex items-center -space-x-3 px-3 py-1.5 rounded-full border border-[#262626] bg-[#1A1A1A]">
                  {avatars.slice(0, 3).map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="User avatar"
                      className="w-7 h-7 rounded-full border-2 border-[#1A1A1A] object-cover flex-shrink-0"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="p-6 lg:p-20 bg-[#0F0F10]/40 flex items-center justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeInUp}
              className="bg-[#1A1A1A] border border-[#262626] p-6 lg:p-8 rounded-[16px] w-full max-w-[620px]"
            >
              <div className="h-[200px] sm:h-[260px] w-full rounded-[10px] overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&h=350&q=80"
                  alt="Neural Network Tech"
                  className="w-full h-full object-cover brightness-[0.8]"
                />
              </div>

              <h4 className="text-white text-xl lg:text-[22px] font-semibold mb-2">
                Future of Neural Networks
              </h4>
              <p className="text-[#98989A] text-sm lg:text-[15px] font-light leading-relaxed mb-6">
                A research paper on the evolution of neural architecture and deep learning parameters.
              </p>

              <div className="grid grid-cols-2 gap-4 border-t border-[#262626] pt-6 mb-6">
                <div className="bg-[#141414] border border-[#262626] p-4 rounded-[10px] flex flex-col">
                  <span className="text-[#7E7E81] text-xs font-light">Total Whitepapers</span>
                  <span className="text-white text-base lg:text-lg font-semibold mt-1">Over 50+</span>
                </div>
                <div className="bg-[#141414] border border-[#262626] p-4 rounded-[10px] flex flex-col">
                  <span className="text-[#7E7E81] text-xs font-light">Download Format</span>
                  <span className="text-white text-base lg:text-lg font-semibold mt-1">PDF format</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-[#7E7E81] text-xs sm:text-sm font-light">
                  Whitepapers are authored by subject-matter experts with an average of 20 years of experience
                </span>
                <button className="inline-flex items-center gap-2 bg-[#141414] border border-[#262626] px-4 py-2.5 rounded-[8px] text-[#98989A] hover:text-white transition-colors text-xs font-medium cursor-pointer group flex-shrink-0">
                  <span>Preview</span>
                  <ArrowUpRight size={14} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}