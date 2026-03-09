import { ArrowUpRight } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="w-full bg-[#141414] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 group cursor-pointer py-[20px]">
        
        <p className="text-[#98989A] text-sm sm:text-base font-light transition-colors group-hover:text-white">
          Subscribe to our Newsletter For New & latest Blogs and Resources
        </p>

        <ArrowUpRight 
          size={19} 
          className="text-yellow-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" 
        />
        
      </div>
    </div>
  );
}