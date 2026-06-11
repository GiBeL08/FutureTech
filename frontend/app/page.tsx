import Hero from './components/Hero';
import Features from './components/Features';
import BlogsSection from './components/BlogsSection';
import ResourcesSection from './components/ResourcesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import PostsSection from './components/PostsSection';
import { getBlogs, getSiteStats, getTestimonials, getAllPosts } from '@/lib/db';

export default async function Home() {
  const [stats, blogs, testimonials, posts] = await Promise.all([
    getSiteStats('home'),
    getBlogs(),
    getTestimonials(),
    getAllPosts(),
  ]);

  const heroStats = stats.map((s) => ({ val: s.value, label: s.label }));

  return (
    <div className="bg-[#141414]">
      <Hero initialStats={heroStats} />
      <Features />
      <BlogsSection initialBlogs={blogs} />
      <PostsSection initialPosts={posts} />
      <ResourcesSection />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection />
    </div>
  );
}
