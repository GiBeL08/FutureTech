import Hero from './components/Hero';
import Features from './components/Features';
import BlogsSection from './components/BlogsSection';
import ResourcesSection from './components/ResourcesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

export default function Home() {
  return (
    <div className='bg-[#141414]'>
      <Hero />
      <Features />
      <BlogsSection />
      <ResourcesSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}