'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';

type Episode = {
  id: number;
  image: string;
  category: string | null;
  showName: string;
  title: string;
  duration: string;
  date: string;
};

type Props = {
  episodes: Episode[];
};

const hardcodedEpisodes: Episode[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&h=600&q=80',
    category: 'AI Revolution',
    showName: 'AI Revolution',
    title: 'AI in Healthcare',
    duration: '26 Min',
    date: '2023',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=900&h=600&q=80',
    category: 'AI Revolution',
    showName: 'AI Revolution',
    title: 'AI Ethics',
    duration: '21 Min',
    date: '2023',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&h=600&q=80',
    category: 'AI Revolution',
    showName: 'AI Revolution',
    title: 'Machine Learning Explained',
    duration: '28 Min',
    date: '2023',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=900&h=600&q=80',
    category: 'AI Conversations',
    showName: 'AI Conversations',
    title: 'The Rise of AI',
    duration: '16 Min',
    date: '2023',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&h=600&q=80',
    category: 'AI Conversations',
    showName: 'AI Conversations',
    title: 'AI in Finance',
    duration: '24 Min',
    date: '2023',
  },
  {
    id: 6,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&h=600&q=80',
    category: 'AI Conversations',
    showName: 'AI Conversations',
    title: 'AI & Society',
    duration: '19 Min',
    date: '2023',
  },
];

export default function LatestPodcastEpisodes({ episodes: initialEpisodes }: Props) {
  const episodes = initialEpisodes && initialEpisodes.length > 0 ? initialEpisodes : hardcodedEpisodes;
  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">
        <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-20 lg:py-14 border-b border-[#262626] flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 w-fit bg-[#1A1A1A] border border-[#262626] px-4 py-1.5 rounded-[999px]">
            <span className="text-[#98989A] text-xs font-light">Stay Updated with Our Podcasts</span>
          </div>
          <h2 className="text-[26px] sm:text-[34px] lg:text-[42px] font-semibold text-white tracking-tight leading-tight">
            Latest Podcast Episodes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((ep, i) => (
            <motion.div
              key={ep.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className={`group cursor-pointer hover:bg-[#1A1A1C]/20 transition-colors border-[#262626] border-b ${
                (i + 1) % 3 !== 0 ? 'lg:border-r' : ''
              } ${i % 2 === 0 ? 'sm:border-r lg:sm:border-r-0' : ''}`}
            >
              <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-4">
                <div className="relative overflow-hidden rounded-[14px] border border-[#262626] bg-[#0F0F10]">
                  <img
                    src={ep.image}
                    alt={ep.title}
                    className="w-full h-[170px] sm:h-[190px] lg:h-[185px] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <div className="absolute left-4 bottom-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#141414]/80 border border-[#262626] flex items-center justify-center backdrop-blur-sm">
                      <Play size={16} className="text-white ml-[1px]" />
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-[#141414]/80 border border-[#262626] text-xs text-[#98989A] backdrop-blur-sm">
                      {ep.duration}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#7E7E81] text-xs font-light">{ep.category}</span>
                    <span className="text-[#7E7E81] text-xs font-light">{ep.date}</span>
                  </div>
                  <h3 className="text-white text-base lg:text-[18px] font-semibold leading-tight group-hover:text-[#FFD11A] transition-colors">
                    {ep.title}
                  </h3>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 text-[11px] text-[#98989A]">
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#262626] bg-[#1A1A1A] px-2.5 py-1">
                        {ep.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#262626] bg-[#1A1A1A] px-2.5 py-1">
                        4.8
                      </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center">
                      <ArrowUpRight size={16} className="text-[#FFD11A]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

