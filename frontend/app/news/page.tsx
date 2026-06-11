import NewsHero from '../components/NewsHero';
import CTASection from '../components/CTASection';
import PostsSection from '../components/PostsSection';
import {
  getFeaturedNews,
  getNewsTeasers,
  getHeadlines,
  getVideos,
  getAllPosts,
} from '@/lib/db';

export default async function NewsPage() {
  const [featured, teasers, headlines, videos, posts] = await Promise.all([
    getFeaturedNews(),
    getNewsTeasers(),
    getHeadlines(),
    getVideos(),
    getAllPosts(),
  ]);

  return (
    <div className="bg-[#141414]">
      <NewsHero
        featured={featured?.[0] ?? null}
        smallArticles={teasers ?? []}
      />
      
      <PostsSection initialPosts={posts} />

      {/* можешь добавить остальные секции */}
      <CTASection />
    </div>
  );
}