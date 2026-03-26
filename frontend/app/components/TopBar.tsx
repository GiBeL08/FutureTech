import { ArrowUpRight } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="w-full bg-[#141414] border-b border-[#262626]">
      {/* py-3 для мобилок (12px), py-5 для десктопа (20px).
         px-4 чтобы текст не прилипал к краям экрана 390px.
      */}
      <div className="max-w-[1920px] mx-auto flex items-center justify-center gap-2 group cursor-pointer py-3 md:py-5 px-4">
        
        <p className="text-[#98989A] text-[12px] sm:text-sm md:text-base font-light transition-colors group-hover:text-white text-center">
          Subscribe to our Newsletter For Blogs and Resources
        </p>

        {/* Стрелочка, чуть меньше на мобилке */}
        <ArrowUpRight 
          className="text-[#FFD700] w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" 
        />
        
      </div>
    </div>
  );
}