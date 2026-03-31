'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Github, ArrowUpRight } from 'lucide-react';

// Описываем типы для порядка
type FooterSection = {
  title: string;
  links: string[];
  badges?: Record<string, string>;
};

export default function Footer() {
  const footerSections: FooterSection[] = [
    {
      title: 'Home',
      links: ['Features', 'Blogs', 'Resources', 'Testimonials', 'Contact Us', 'Newsletter'],
      badges: { 'Resources': 'New' }
    },
    {
      title: 'News',
      links: ['Trending Stories', 'Featured Videos', 'Technology', 'Health', 'Politics', 'Environment'],
    },
    {
      title: 'Blogs',
      links: ['Quantum Computing', 'AI Ethics', 'Space Exploration', 'Biotechnology', 'Renewable Energy', 'Biohacking'],
      badges: { 'Biotechnology': 'New' }
    },
    {
      title: 'Podcasts',
      links: ['AI Revolution', 'AI Revolution New', 'TechTalk AI', 'AI Conversations'],
      badges: { 'AI Revolution New': 'New' }
    },
  ];

  return (
    <footer className="bg-[#141414] text-white border-t border-[#262626] pt-12 lg:pt-20 w-full">
      <div className="max-w-[1536px] mx-auto px-4 lg:px-20">
        
        {/* СЕТКА ССЫЛОК */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-4 mb-16">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link} className="flex items-center gap-2">
                    <Link href="#" className="text-[#7E7E81] hover:text-white transition-colors text-sm lg:text-base">
                      {link}
                    </Link>
                    {/* Теперь без as any, всё чисто */}
                    {section.badges?.[link] && (
                      <span className="text-[10px] px-2 py-0.5 bg-[#1A1A1A] border border-[#262626] rounded-md text-white font-medium">
                        {section.badges[link]}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Блок Resources: на мобилке занимает всю ширину */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <div className="grid grid-cols-1 gap-3">
              {['Whitepapers', 'Ebooks', 'Reports', 'Research Papers'].map((item) => (
                <Link 
                  key={item} 
                  href="#" 
                  className="flex items-center justify-between bg-[#1A1A1A] border border-[#262626] px-4 py-3 rounded-xl hover:border-[#333] transition-all group"
                >
                  <span className="text-sm font-medium text-[#7E7E81] group-hover:text-white">{item}</span>
                  <ArrowUpRight size={18} className="text-[#FFD700] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* НИЖНЯЯ ПАНЕЛЬ */}
        <div className="py-8 border-t border-[#262626] flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          
          <div className="flex gap-6 text-[#7E7E81] text-xs lg:text-sm order-2 lg:order-1">
            <Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>

          <div className="flex gap-4 order-1 lg:order-2">
            {[Twitter, Github, Linkedin].map((Icon, i) => (
              <Link key={i} href="#" className="p-3 bg-[#1A1A1A] border border-[#262626] rounded-full hover:bg-[#262626] transition-colors">
                <Icon size={20} />
              </Link>
            ))}
          </div>

          <p className="text-[#7E7E81] text-xs lg:text-sm order-3">
            © 2024 FutureTech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 