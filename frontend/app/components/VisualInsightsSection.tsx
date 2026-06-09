'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';

type Props = {
  videos: {
    id: number;
    image: string;
    title: string;
    category: string;
    duration: string;
  }[];
};

export default function VisualInsightsSection({ videos }: Props) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">
        <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-20 lg:py-16 border-b border-[#262626] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeInUp}>
            <div className="inline-block bg-[#1A1A1A] border border-[#262626] px-4 py-1.5 rounded-[6px] mb-4">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide">Featured Videos</span>
            </div>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[48px] font-semibold text-white tracking-tight leading-tight">
              Visual Insights for the Modern Viewer
            </h2>
          </motion.div>

          <button className="inline-flex items-center gap-3 bg-[#1A1A1A] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] transition-all duration-300 hover:bg-[#202022] hover:text-white cursor-pointer group flex-shrink-0">
            <span className="text-sm font-medium">View All Videos</span>
            <ArrowUpRight size={18} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group cursor-pointer hover:bg-[#1A1A1C]/20 transition-colors ${
                i % 2 === 0 ? 'md:border-r' : ''
              } border-[#262626] border-b ${i >= 2 ? 'md:border-b-0' : ''}`}
            >
              <div className="p-4 sm:p-6 lg:p-10 flex flex-col gap-5">
                <div className="relative overflow-hidden rounded-[14px] border border-[#262626] bg-[#0F0F10]">
                  <img
                    src={video.image}
                    alt={video.title}
                    className="w-full h-[220px] sm:h-[260px] lg:h-[280px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                  <div className="absolute left-4 bottom-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#141414]/80 border border-[#262626] flex items-center justify-center backdrop-blur-sm">
                      <Play size={18} className="text-white ml-[1px]" />
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-[#141414]/80 border border-[#262626] text-xs text-[#98989A] backdrop-blur-sm">
                      {video.duration}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[#7E7E81] text-xs font-light">{video.category}</span>
                  <h3 className="text-white text-lg lg:text-[20px] font-semibold leading-tight group-hover:text-[#FFD11A] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-[#98989A] text-sm font-light leading-relaxed">
                    Watch a quick breakdown with key takeaways and real-world context.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

