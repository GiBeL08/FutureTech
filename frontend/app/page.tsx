import Hero from './components/Hero';
import Features from './components/Features';
import BlogsSection from './components/BlogsSection';
import ResourcesSection from './components/ResourcesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import PostsSection from './components/PostsSection';

// Переиндексировать каждые 60 секунд
export const revalidate = 60;

async function fetchDataSafe(endpoint: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  const fullUrl = `${apiUrl}/${endpoint}`;

  try {
    const res = await fetch(fullUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 60 }, // ISR - Incremental Static Regeneration
    });

    if (!res.ok) {
      console.error(`[FETCH ERROR]: ${endpoint} → ${res.status}`);
      return [];
    }

    const json = await res.json();
    return json.data ?? json;
  } catch (error) {
    console.error(`[FETCH FAILED]: ${endpoint}`, error);
    return [];
  }
}

export default async function Home() {
  const stats = await fetchDataSafe('stats');
  const blogs = await fetchDataSafe('blog');
  const testimonials = await fetchDataSafe('testimonials');
  const posts = await fetchDataSafe('posts');

  const heroStats = Array.isArray(stats)
    ? stats.map((s: any) => ({ val: s.value, label: s.label }))
    : [];

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