'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Play, Star } from 'lucide-react';

type Show = {
  id: number;
  title: string;
  subtitle: string;
  rating: number;
  episodes: string;
  followers: string;
  icon: string;
};

type FeaturedEpisode = {
  id: number;
  show: string;
  title: string;
  desc: string;
  image: string;
  tags: { label: string; value: string }[];
};

type Props = {
  shows: Show[];
  featured: {
    id: number;
    showName: string;
    title: string;
    desc: string | null;
    image: string;
    tags: { label: string; value: string }[];
  }[];
};

const hardcodedShows: Show[] = [
  {
    id: 1,
    title: 'AI Revolution',
    subtitle: 'Tech Talk',
    rating: 5,
    episodes: '12k+ Episodes',
    followers: '12k+ Followers',
    icon: 'pencil',
  },
  {
    id: 2,
    title: 'AI Conversations',
    subtitle: 'Deep Dives',
    rating: 5,
    episodes: '1.4k+ Episodes',
    followers: '8k+ Followers',
    icon: 'trophy',
  },
];

const hardcodedFeatured = [
  {
    id: 1,
    showName: 'AI Revolution',
    title: 'Revolutionize your understanding of AI',
    desc: 'Dive into breakthrough ideas and practical insights that shape modern artificial intelligence.',
    image:
      'https://images.unsplash.com/photo-1611095785056-57069a6d3784?auto=format&fit=crop&w=1400&h=800&q=80',
    tags: [
      { label: 'Episode', value: 'S1 · E12' },
      { label: 'Duration', value: '28 Min' },
      { label: 'Release Date', value: 'Oct 2023' },
    ],
  },
  {
    id: 2,
    showName: 'AI Conversations',
    title: 'Engage in thought-provoking conversations with leading experts',
    desc: 'Explore real perspectives on how AI is transforming creativity, work, and everyday decisions.',
    image:
      'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1400&h=800&q=80',
    tags: [
      { label: 'Episode', value: 'S2 · E03' },
      { label: 'Duration', value: '34 Min' },
      { label: 'Release Date', value: 'Nov 2023' },
    ],
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-[#FFD11A] fill-[#FFD11A]" />
      ))}
    </div>
  );
}

function ShowIcon({ kind }: { kind: Show['icon'] }) {
  if (kind === 'trophy') {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.1 5.4H17.9V8.2C17.9 11.9 15.7 14.1 13 14.1C10.3 14.1 8.1 11.9 8.1 8.2V5.4Z"
          fill="#FFD11A"
        />
        <path
          d="M6.2 6.6H8.1V8.2C8.1 10.1 7.2 11.4 5.8 11.9C4.7 12.3 3.6 11.5 3.6 10.3V8.9C3.6 7.6 4.7 6.6 6.2 6.6Z"
          fill="#FFD11A"
          opacity="0.9"
        />
        <path
          d="M19.8 6.6H17.9V8.2C17.9 10.1 18.8 11.4 20.2 11.9C21.3 12.3 22.4 11.5 22.4 10.3V8.9C22.4 7.6 21.3 6.6 19.8 6.6Z"
          fill="#FFD11A"
          opacity="0.9"
        />
        <rect x="10.2" y="14.6" width="5.6" height="2.4" rx="1.2" fill="#FFD11A" />
        <rect x="8.6" y="17.4" width="8.8" height="3.2" rx="1.6" fill="#FFD11A" opacity="0.9" />
      </svg>
    );
  }

  // pencil
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 18.9L8 14.7L17.2 5.5C17.7 5 18.6 5 19.1 5.5L20.5 6.9C21 7.4 21 8.3 20.5 8.8L11.3 18L7 18.9Z"
        fill="#FFD11A"
      />
      <path d="M8 14.7L11.3 18" stroke="#141414" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M6.6 20.6H20"
        stroke="#FFD11A"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

export default function PodcastsHero({ shows: initialShows, featured: initialFeatured }: Props) {
  const shows = initialShows && initialShows.length > 0 ? initialShows : hardcodedShows;
  const featured = initialFeatured && initialFeatured.length > 0 ? initialFeatured : hardcodedFeatured;

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">
        {/* HEADER */}
        <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-20 lg:py-16 border-b border-[#262626]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5"
          >
            <h1 className="text-[28px] sm:text-[38px] lg:text-[48px] font-semibold text-white tracking-tight leading-tight max-w-[980px]">
              Unlock the World of Artificial Intelligence
              <br />
              through Podcasts
            </h1>
            <p className="text-[#7E7E81] text-sm lg:text-[15px] font-light leading-relaxed max-w-[560px]">
              Dive into expert conversations, practical episodes, and thoughtful deep dives that bring AI closer to
              everyday work and life.
            </p>
          </motion.div>
        </div>

        {/* SHOWS + FEATURED EPISODES */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] border-b border-[#262626]">
          {/* LEFT: show list */}
          <div className="p-4 sm:p-6 lg:p-12 lg:border-r border-[#262626] flex flex-col gap-5">
            {shows.map((s) => (
              <div
                key={s.id}
                className="bg-[#1A1A1A] border border-[#262626] rounded-[16px] p-5 lg:p-6 flex items-center gap-4 hover:border-[#3a3a3a] transition-colors"
              >
                <div className="w-12 h-12 rounded-[12px] border border-[#262626] bg-[#141414] flex items-center justify-center">
                  <ShowIcon kind={s.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-white text-base lg:text-lg font-semibold leading-tight truncate">
                        {s.title}
                      </h3>
                      <p className="text-[#7E7E81] text-xs lg:text-sm font-light mt-0.5">
                        {s.subtitle}
                      </p>
                    </div>
                    <Stars count={s.rating} />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <span className="text-[#98989A] text-[11px] font-light">{s.followers}</span>
                      <span className="text-[#98989A] text-[11px] font-light">{s.episodes}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center">
                      <ArrowUpRight size={18} className="text-[#FFD11A]" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: featured episodes (2 rows) */}
          <div className="flex flex-col">
            {featured.map((ep, idx) => (
              <div
                key={ep.id}
                className={`p-4 sm:p-6 lg:p-12 ${idx === 0 ? 'border-b' : ''} border-[#262626]`}
              >
                <div className="bg-[#1A1A1A] border border-[#262626] rounded-[18px] overflow-hidden">
                  <div className="relative">
                    <img
                      src={ep.image}
                      alt={ep.title}
                      className="w-full h-[220px] sm:h-[280px] lg:h-[320px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute left-5 bottom-5 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#141414]/80 border border-[#262626] flex items-center justify-center backdrop-blur-sm">
                        <Play size={18} className="text-white ml-[1px]" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 lg:p-8 border-t border-[#262626]">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-white text-lg sm:text-xl lg:text-[22px] font-semibold leading-tight">
                        {ep.title}
                      </h2>
                      <p className="text-[#98989A] text-sm font-light leading-relaxed max-w-[880px]">
                        {ep.desc}
                      </p>
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                      {ep.tags.map((t) => (
                        <div
                          key={t.label}
                          className="bg-[#141414] border border-[#262626] rounded-[12px] px-4 py-3"
                        >
                          <p className="text-[#7E7E81] text-[11px] font-light">{t.label}</p>
                          <p className="text-white text-sm font-medium mt-1">{t.value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4">
                      <button className="inline-flex items-center justify-between gap-3 bg-[#141414] border border-[#262626] px-4 py-3 rounded-[10px] text-[#98989A] hover:bg-[#202022] hover:text-white transition-colors w-full">
                        <span className="text-sm font-medium">View Episode</span>
                        <span className="text-sm font-medium">{ep.showName}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

