'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import NewsletterModal from './NewsletterModal';

export default function TopBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#141414] border-b border-[#262626]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="max-w-[1920px] mx-auto flex items-center justify-center gap-2 group cursor-pointer py-3 md:py-5 px-4 w-full"
        >
          <p className="text-[#98989A] text-[12px] sm:text-sm md:text-base font-light transition-colors group-hover:text-white text-center">
            Subscribe to our Newsletter For New & latest Blogs and Resources
          </p>
          <ArrowUpRight
            className="text-[#FFD700] w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
          />
        </button>
      </div>
      <NewsletterModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
