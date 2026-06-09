import { notFound } from 'next/navigation';
import BlogOpenPage from '../../components/BlogOpenPage';
import CTASection from '../../components/CTASection';
import { getBlogById, getSimilarNews } from '@/lib/db';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, similarNews] = await Promise.all([getBlogById(slug), getSimilarNews()]);

  if (!post) notFound();

  return (
    <div className="bg-[#141414]">
      <BlogOpenPage post={post} similarNews={similarNews} />
      <CTASection />
    </div>
  );
}
