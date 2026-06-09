import NewsHero from '../components/NewsHero';
import HeadlinesSection from '../components/HeadlinesSection';
import VisualInsightsSection from '../components/VisualInsightsSection';
import CTASection from '../components/CTASection';
import { getFeaturedNews, getHeadlines, getNewsTeasers, getVideos } from '@/lib/db';

export default async function News() {
  const [featured, teasers, headlines, videos] = await Promise.all([
    getFeaturedNews(),
    getNewsTeasers(3),
    getHeadlines(),
    getVideos(),
  ]);

  const featuredArticle = featured
    ? {
        image: featured.image ?? '',
        category: featured.category,
        title: featured.title,
        desc: featured.desc,
        author: {
          name: featured.authorName,
          avatar: featured.authorAvatar ?? '',
        },
        date: featured.date,
        readTime: featured.readTime ?? '5 Min Read',
      }
    : null;

  const smallArticles = teasers.map((t) => ({
    image: t.image ?? '',
    title: t.title,
    category: t.category,
  }));

  const headlineItems = headlines.map((h) => ({
    id: h.id,
    title: h.title,
    desc: h.desc,
    date: h.date,
    author: {
      name: h.authorName,
      avatar: h.authorAvatar ?? '',
    },
  }));

  return (
    <div className="bg-[#141414]">
      <NewsHero featured={featuredArticle} smallArticles={smallArticles} />
      <HeadlinesSection headlines={headlineItems} />
      <VisualInsightsSection videos={videos} />
      <CTASection />
    </div>
  );
}
