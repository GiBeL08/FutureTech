'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type TabId = 'All' | 'Reports' | 'Ebooks' | 'Whitepapers';

type Resource = {
  id: number;
  tab: Exclude<TabId, 'All'>;
  title: string;
  subtitle: string;
  image: string;
  meta: { label: string; value: string }[];
};

type Highlight = {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
};

type Props = {
  highlights: Highlight[];
  resources: {
    id: number;
    tab: string;
    title: string;
    subtitle: string;
    image: string | null;
    meta: { label: string; value: string }[];
  }[];
};

const quantumIcon = (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 9H20V21H8V9Z" stroke="#FFD11A" strokeWidth="2" />
    <path d="M8 9L14 15L20 9" stroke="#FFD11A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const spaceIcon = (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 3C18.5 5.8 21.2 10.5 21.2 15.6C21.2 20.2 18.2 24.1 14 25"
      stroke="#FFD11A"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M14 3C9.5 5.8 6.8 10.5 6.8 15.6C6.8 20.2 9.8 24.1 14 25"
      stroke="#FFD11A"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.7"
    />
    <circle cx="14" cy="15" r="2.2" fill="#FFD11A" />
  </svg>
);

const hardcodedLeftItems = [
  {
    id: 1,
    title: 'Quantum Computing',
    subtitle: 'Whitepaper',
    desc: 'A deep exploration of next-gen computation and real-world applications.',
    icon: quantumIcon,
  },
  {
    id: 2,
    title: 'Space Exploration',
    subtitle: 'Whitepaper',
    desc: 'From propulsion to missions: a structured guide to modern exploration.',
    icon: spaceIcon,
  },
];

const hardcodedResources: Resource[] = [
  {
    id: 1,
    tab: 'Whitepapers',
    title: 'Quantum Computing Whitepaper',
    subtitle: 'Breakthrough Concepts & Practical Pathways',
    image:
      'https://images.unsplash.com/photo-1526406915894-6c228685bfa7?auto=format&fit=crop&w=1400&h=900&q=80',
    meta: [
      { label: 'Format', value: 'PDF' },
      { label: 'Pages', value: '42' },
      { label: 'Year', value: '2023' },
    ],
  },
  {
    id: 2,
    tab: 'Whitepapers',
    title: 'Space Exploration Whitepaper',
    subtitle: 'Missions, Systems, and the Future Frontier',
    image:
      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1400&h=900&q=80',
    meta: [
      { label: 'Format', value: 'PDF' },
      { label: 'Pages', value: '38' },
      { label: 'Year', value: '2023' },
    ],
  },
  {
    id: 3,
    tab: 'Reports',
    title: 'AI Trends 2024',
    subtitle: 'Signals, Momentum & What to Watch',
    image:
      'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1200&h=800&q=80',
    meta: [
      { label: 'Format', value: 'PDF' },
      { label: 'Pages', value: '28' },
      { label: 'Year', value: '2024' },
    ],
  },
  {
    id: 4,
    tab: 'Reports',
    title: 'Space Science: Brief',
    subtitle: 'Recent Discoveries and Research Notes',
    image:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&h=800&q=80',
    meta: [
      { label: 'Format', value: 'PDF' },
      { label: 'Pages', value: '19' },
      { label: 'Year', value: '2023' },
    ],
  },
  {
    id: 5,
    tab: 'Ebooks',
    title: 'Data: The New Oil',
    subtitle: 'From Raw Data to Real Decisions',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800&q=80',
    meta: [
      { label: 'Format', value: 'PDF' },
      { label: 'Pages', value: '64' },
      { label: 'Year', value: '2023' },
    ],
  },
  {
    id: 6,
    tab: 'Whitepapers',
    title: 'Quantum Circuits Whitepaper',
    subtitle: 'Models, Noise & Practical Design',
    image:
      'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?auto=format&fit=crop&w=1200&h=800&q=80',
    meta: [
      { label: 'Format', value: 'PDF' },
      { label: 'Pages', value: '33' },
      { label: 'Year', value: '2023' },
    ],
  },
];

export default function ReportsAnalysisSection({ highlights: initialHighlights, resources: initialResources }: Props) {
  const [tab, setTab] = useState<TabId>('All');

  const leftItems = useMemo(() => {
    if (initialHighlights && initialHighlights.length > 0) {
      return initialHighlights.map((it) => ({
        id: it.id,
        title: it.title,
        subtitle: it.subtitle,
        desc: it.desc,
        icon: it.title.toLowerCase().includes('space') ? spaceIcon : quantumIcon,
      }));
    }
    return hardcodedLeftItems;
  }, [initialHighlights]);

  const resourcesList = useMemo(() => {
    if (initialResources && initialResources.length > 0) {
      return initialResources.map((r) => ({
        id: r.id,
        tab: r.tab as Exclude<TabId, 'All'>,
        title: r.title,
        subtitle: r.subtitle,
        image: r.image || 'https://images.unsplash.com/photo-1526406915894-6c228685bfa7?auto=format&fit=crop&w=1400&h=900&q=80',
        meta: r.meta,
      }));
    }
    return hardcodedResources;
  }, [initialResources]);

  const filtered = useMemo(() => {
    if (tab === 'All') return resourcesList;
    return resourcesList.filter((r) => r.tab === tab);
  }, [tab, resourcesList]);

  const topTwo = filtered.slice(0, 2);
  const rest = filtered.slice(2, 5);

  const tabs: TabId[] = ['All', 'Reports', 'Ebooks', 'Whitepapers'];

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">
        <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-20 lg:py-12 border-b border-[#262626] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 w-fit bg-[#1A1A1A] border border-[#262626] px-4 py-1.5 rounded-[999px]">
              <span className="text-[#98989A] text-xs font-light">Explore our Resource Library</span>
            </div>
            <h2 className="text-[24px] sm:text-[32px] lg:text-[42px] font-semibold text-white tracking-tight leading-tight">
              In-Depth Reports and Analysis
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-[#0F0F0F] border border-[#262626] p-1 rounded-[12px] w-fit">
            {tabs.map((t) => {
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-[10px] text-sm transition-colors border ${
                    active
                      ? 'bg-[#141414] border-[#262626] text-white'
                      : 'bg-transparent border-transparent text-[#7E7E81] hover:text-white'
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] border-b border-[#262626]">
          {/* left rail */}
          <div className="lg:border-r border-[#262626]">
            {leftItems.map((it, i) => (
              <div
                key={it.id}
                className={`p-6 lg:p-10 ${i === 0 ? 'border-b' : ''} border-[#262626] flex flex-col gap-3`}
              >
                <div className="w-12 h-12 rounded-[12px] bg-[#141414] border border-[#262626] flex items-center justify-center">
                  {it.icon}
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold leading-tight">{it.title}</h3>
                  <p className="text-[#98989A] text-sm font-light mt-1">{it.subtitle}</p>
                </div>
                <p className="text-[#7E7E81] text-sm font-light leading-relaxed">{it.desc}</p>
              </div>
            ))}
          </div>

          {/* main content */}
          <div className="flex flex-col">
            <AnimatePresence mode="popLayout">
              {topTwo.map((r) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="p-6 lg:p-10 border-b border-[#262626]"
                >
                  <div className="bg-[#1A1A1A] border border-[#262626] rounded-[18px] overflow-hidden">
                    <div className="relative">
                      <img src={r.image} alt={r.title} className="w-full h-[240px] lg:h-[280px] object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    </div>

                    <div className="p-6 lg:p-8 border-t border-[#262626]">
                      <div className="flex items-start justify-between gap-6">
                        <div className="min-w-0">
                          <h4 className="text-white text-lg lg:text-[20px] font-semibold leading-tight">{r.title}</h4>
                          <p className="text-[#98989A] text-sm font-light mt-2 leading-relaxed">{r.subtitle}</p>
                        </div>
                        <div className="w-11 h-11 rounded-full bg-[#FFD11A] text-black flex items-center justify-center flex-shrink-0">
                          <ArrowUpRight size={18} />
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-3 gap-3">
                        {r.meta.map((m) => (
                          <div key={m.label} className="bg-[#141414] border border-[#262626] rounded-[12px] px-4 py-3">
                            <p className="text-[#7E7E81] text-[11px] font-light">{m.label}</p>
                            <p className="text-white text-sm font-medium mt-1">{m.value}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <button className="w-full bg-[#141414] border border-[#262626] px-4 py-3 rounded-[10px] text-[#98989A] hover:bg-[#202022] hover:text-white transition-colors inline-flex items-center justify-between">
                          <span className="text-sm font-medium">View</span>
                          <span className="text-sm font-medium">{r.tab}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-3">
              {rest.map((r, idx) => (
                <div
                  key={r.id}
                  className={`p-6 lg:p-10 border-[#262626] ${idx < 2 ? 'md:border-r' : ''} border-b md:border-b-0`}
                >
                  <div className="bg-[#1A1A1A] border border-[#262626] rounded-[18px] overflow-hidden group cursor-pointer hover:border-[#3a3a3a] transition-colors">
                    <div className="relative">
                      <img src={r.image} alt={r.title} className="w-full h-[160px] object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                      <div className="absolute left-4 bottom-4 w-9 h-9 rounded-full bg-[#141414]/85 border border-[#262626] flex items-center justify-center backdrop-blur-sm">
                        <ArrowUpRight size={16} className="text-[#FFD11A]" />
                      </div>
                    </div>
                    <div className="p-5 border-t border-[#262626]">
                      <p className="text-[#7E7E81] text-xs font-light">{r.tab}</p>
                      <h5 className="text-white text-base font-semibold leading-tight mt-1 group-hover:text-[#FFD11A] transition-colors">
                        {r.title}
                      </h5>
                      <p className="text-[#98989A] text-sm font-light leading-relaxed mt-2">{r.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

