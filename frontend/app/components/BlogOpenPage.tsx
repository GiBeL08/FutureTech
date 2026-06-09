'use client';

import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Eye, Heart, Share2 } from 'lucide-react';
import type { BlogPost } from '../lib/blogs';

type Props = {
  post: BlogPost;
  similarNews: {
    id?: number;
    image: string;
    title: string;
    category: string;
    likes: string;
    views: string;
  }[];
};

export default function BlogOpenPage({ post, similarNews }: Props) {
  const meta = [
    { label: 'Publication Date', value: post.publishedDate },
    { label: 'Category', value: post.category },
    { label: 'Reading Time', value: post.readingTime },
    { label: 'Author Name', value: post.authorName },
  ];

  return (
    <div className="bg-[#141414]">

      {/* HERO */}
      <section className="border-b border-[#262626]">
        <div className="max-w-[1536px] mx-auto border-x border-[#262626]">
          <div className="relative overflow-hidden">
            <img
              src={post.heroImage}
              alt={post.title}
              className="w-full h-[280px] sm:h-[380px] lg:h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-black/40 to-black/20" />
            <div className="absolute inset-0 flex items-center justify-center px-6 lg:px-20">
              <h1 className="text-[26px] sm:text-[36px] lg:text-[48px] font-semibold text-white text-center leading-tight tracking-tight max-w-[1100px]">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE + SIDEBAR */}
      <section className="border-b border-[#262626]">
        <div className="max-w-[1536px] mx-auto border-x border-[#262626]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">

            {/* LEFT */}
            <div className="p-6 lg:p-12 lg:border-r border-[#262626]">
              <h2 className="text-white text-lg font-semibold mb-4">Introduction</h2>

              <p className="text-[#98989A] text-sm lg:text-[15px] font-light leading-relaxed mb-10">
                {post.introduction}
              </p>

              {post.sections.map((section) => (
                <div key={section.heading} className="mb-10">
                  <h3 className="text-white text-lg font-semibold mb-4">
                    {section.heading}
                  </h3>

                  {section.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-[#98989A] text-sm lg:text-[15px] font-light leading-relaxed mb-4 last:mb-0"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ))}

              <button className="inline-flex items-center gap-2 text-[#98989A] hover:text-white transition-colors text-sm font-medium mt-2 group">
                <span>Read Full Blog</span>
                <ChevronDown
                  size={18}
                  className="text-[#FFD11A] group-hover:translate-y-0.5 transition-transform"
                />
              </button>
            </div>

            {/* RIGHT */}
            <div className="p-6 lg:p-12 bg-[#0F0F10]/30">
              <div className="flex items-center gap-3 mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#262626] bg-[#1A1A1A] text-[#7E7E81] text-xs">
                  <Heart size={14} className="text-[#FF4B4B]" />
                  <span>{post.likes}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#262626] bg-[#1A1A1A] text-[#7E7E81] text-xs">
                  <Eye size={14} className="text-[#FFD11A]" />
                  <span>{post.views}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#262626] bg-[#1A1A1A] text-[#7E7E81] text-xs">
                  <Share2 size={14} className="text-[#98989A]" />
                  <span>{post.shares}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {meta.map((m) => (
                  <div
                    key={m.label}
                    className="bg-[#1A1A1A] border border-[#262626] rounded-[12px] px-4 py-3"
                  >
                    <p className="text-[#7E7E81] text-[11px] font-light">{m.label}</p>
                    <p className="text-white text-sm font-medium mt-1">{m.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#1A1A1A] border border-[#262626] rounded-[16px] p-5 lg:p-6">
                <h4 className="text-white text-base font-semibold mb-4">
                  Related Topics
                </h4>

                <ul className="space-y-3">
                  {post.relatedTopics.map((topic) => (
                    <li key={topic}>
                      <Link
                        href="#"
                        className="text-[#7E7E81] text-sm font-light hover:text-[#FFD11A] transition-colors"
                      >
                        {topic}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMILAR NEWS */}
      <section className="border-b border-[#262626]">
        <div className="max-w-[1536px] mx-auto border-x border-[#262626]">

          <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-20 lg:py-12 border-b border-[#262626] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-[24px] sm:text-[32px] lg:text-[38px] font-semibold text-white tracking-tight">
              Similar News
            </h2>

            <Link
              href="/news"
              className="inline-flex items-center gap-3 bg-[#1A1A1A] border border-[#262626] px-5 py-3.5 rounded-[10px] text-[#98989A] hover:bg-[#202022] hover:text-white transition-colors group"
            >
              <span className="text-sm font-medium">View All News</span>
              <ArrowUpRight
                size={18}
                className="text-[#FFD11A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3">
            {similarNews.map((item, i) => (
              <div
                key={item.title}
                className={`group cursor-pointer hover:bg-[#1A1A1C]/20 transition-colors ${
                  i < 2 ? 'sm:border-r' : ''
                } border-[#262626] border-b sm:border-b-0`}
              >
                <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-4">

                  <div className="relative overflow-hidden rounded-[14px] border border-[#262626]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[160px] sm:h-[180px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div>
                    <h3 className="text-white text-base font-semibold group-hover:text-[#FFD11A]">
                      {item.title}
                    </h3>
                    <p className="text-[#7E7E81] text-xs mt-2">
                      {item.category}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">
                      <span className="text-[#7E7E81] text-xs flex items-center gap-1">
                        <Heart size={12} className="text-[#FF4B4B]" />
                        {item.likes}
                      </span>

                      <span className="text-[#7E7E81] text-xs flex items-center gap-1">
                        <Eye size={12} className="text-[#FFD11A]" />
                        {item.views}
                      </span>
                    </div>

                    {/* ❗ FIX: убран blog.id */}
                    <Link
                      href={`/blogs/${item.id ?? ''}`}
                      className="inline-flex items-center gap-2 text-[#98989A] hover:text-white text-xs font-medium transition-colors group/btn"
                    >
                      <span>View Blog</span>
                      <ArrowUpRight
                        size={14}
                        className="text-[#FFD11A] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                      />
                    </Link>

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}