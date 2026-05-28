'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

// Кастомная иконка звезды
function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD11A" stroke="#FFD11A" strokeWidth="1" xmlns="http://www.w3.org/2000/svg">
      <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
    </svg>
  );
}

export default function TestimonialsSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 35 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  };

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Thompson',
      role: 'Data Scientist',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5,
      text: 'FutureTech has been my primary source for AI news. The articles are well-researched, deep, and always up to date.'
    },
    {
      id: 2,
      name: 'Raj Patel',
      role: 'AI Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5,
      text: 'The depth of information provided in their research papers is incredible. It has significantly helped my development work.'
    },
    {
      id: 3,
      name: 'Lily Adams',
      role: 'Tech Student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5,
      text: 'I love how easy it is to read complex topics here. The visuals and graphics help me understand neural networks easily.'
    },
    {
      id: 4,
      name: 'Michael Brown',
      role: 'Product Manager',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5,
      text: 'The contributor network is top-notch. Insights from actual industry experts give FutureTech a huge edge over other tech blogs.'
    },
    {
      id: 5,
      name: 'Emily Davis',
      role: 'UX Designer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5,
      text: 'Superb reader experience. The clean layout, modern dark mode, and responsive designs make it a joy to browse daily.'
    },
    {
      id: 6,
      name: 'David Kim',
      role: 'Software Dev',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80',
      rating: 5,
      text: 'Highly recommended for anyone looking to stay ahead of the curve. The newsletter is pure gold and full of actionable updates.'
    }
  ];

  return (
    <section className="bg-[#141414] text-white border-b border-[#262626]">
      <div className="max-w-[1536px] mx-auto border-x border-[#262626]">
        
        {/* ШАПКА БЛОКА */}
        <div className="px-6 py-12 lg:px-20 lg:py-16 border-b border-[#262626] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex flex-col items-start">
            <div className="inline-block bg-[#1A1A1A] border border-[#262626] px-4 py-1.5 rounded-[6px] mb-4">
              <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
                What Our Readers Say
              </span>
            </div>
            <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-semibold text-white tracking-tight leading-tight">
              Real Words from Real Readers
            </h2>
          </div>
          
          <button className="inline-flex items-center gap-3 bg-[#1A1A1A] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] transition-all duration-300 hover:bg-[#202022] hover:text-white cursor-pointer group flex-shrink-0">
            <span className="text-sm font-medium">View All Testimonials</span>
            <ArrowUpRight size={18} className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* СЕТКА ОТЗЫВОВ */}
        <div className="p-6 lg:p-20 bg-[#0F0F10]/40">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((test, i) => (
              <motion.div
                key={test.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={fadeInUp}
                className="bg-[#1A1A1A] border border-[#262626] p-6 lg:p-8 rounded-[12px] flex flex-col justify-between hover:border-[#3a3a3a] transition-all duration-300 group"
              >
                <div>
                  {/* Профиль автора */}
                  <div className="flex items-center gap-3 mb-6">
                    <img 
                      src={test.avatar} 
                      alt={test.name} 
                      className="w-10 h-10 rounded-full object-cover border border-[#262626]"
                    />
                    <div className="flex flex-col">
                      <h4 className="text-white text-sm lg:text-base font-semibold leading-tight">
                        {test.name}
                      </h4>
                      <span className="text-[#7E7E81] text-xs font-light mt-0.5">
                        {test.role}
                      </span>
                    </div>
                  </div>

                  {/* Оценка звездами */}
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: test.rating }).map((_, idx) => (
                      <StarIcon key={idx} />
                    ))}
                  </div>

                  {/* Текст отзыва */}
                  <p className="text-[#98989A] text-sm lg:text-[15px] font-light leading-relaxed group-hover:text-white transition-colors duration-300">
                    "{test.text}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
