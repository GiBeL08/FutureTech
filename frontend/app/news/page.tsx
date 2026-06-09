import NewsHero from '../components/NewsHero';
import CTASection from '../components/CTASection';
import {
  getFeaturedNews,
  getNewsTeasers,
  getHeadlines,
  getVideos,
} from '@/lib/db';

export default async function NewsPage() {
  const [featured, teasers, headlines, videos] = await Promise.all([
    getFeaturedNews(),
    getNewsTeasers(),
    getHeadlines(),
    getVideos(),
  ]);

  return (
    <div className="bg-[#141414]">
      <NewsHero
        featured={featured?.[0] ?? null}
        smallArticles={teasers ?? []}
      />

      {/* можешь добавить остальные секции */}
      <CTASection />
    </div>
  );
}