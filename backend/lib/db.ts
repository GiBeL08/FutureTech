import { prisma } from './prisma';
import type { BlogPost } from './blogs';
import { defaultBlogSlug } from './blogs';

export async function getSiteStats(page: 'home' | 'resources') {
  return prisma.siteStat.findMany({ where: { page }, orderBy: { sort: 'asc' } });
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  let post = await prisma.blogPost.findUnique({ where: { slug } });
  if (!post) {
    post = await prisma.blogPost.findUnique({ where: { slug: defaultBlogSlug } });
  }
  if (!post) return null;

  return {
    slug: post.slug,
    title: post.title,
    heroImage: post.heroImage,
    category: post.category,
    publishedDate: post.publishedDate,
    readingTime: post.readingTime,
    authorName: post.authorName,
    likes: post.likes,
    views: post.views,
    shares: post.shares,
    introduction: post.introduction,
    sections: JSON.parse(post.sections) as BlogPost['sections'],
    relatedTopics: JSON.parse(post.relatedTopics) as string[],
  };
}

export async function getBlogs(category?: string) {
  const blogs = await prisma.blogPost.findMany({
    where: category && category !== 'All' ? { category } : undefined,
    orderBy: { sort: 'asc' },
  });

  return blogs.map((b) => ({
    id: b.id,
    slug: b.slug,
    category: b.category,
    title: b.title,
    desc: b.desc ?? '',
    date: b.publishedDate,
    author: {
      name: b.authorName,
      role: b.authorRole ?? '',
      avatar: b.authorAvatar ?? '',
    },
    metrics: { likes: b.likes, views: b.views },
    tags: b.tags ? (JSON.parse(b.tags) as string[]) : [],
  }));
}

export async function getFeaturedNews() {
  return prisma.newsArticle.findFirst({ where: { featured: true }, orderBy: { sort: 'asc' } });
}

export async function getNewsTeasers(limit = 3) {
  return prisma.newsArticle.findMany({
    where: { featured: false, image: { not: null } },
    orderBy: { sort: 'asc' },
    take: limit,
  });
}

export async function getHeadlines() {
  return prisma.newsArticle.findMany({ where: { headline: true }, orderBy: { sort: 'asc' } });
}

export async function getVideos() {
  return prisma.video.findMany({ orderBy: { sort: 'asc' } });
}

export async function getPodcastShows() {
  return prisma.podcastShow.findMany({ orderBy: { sort: 'asc' } });
}

export async function getFeaturedPodcasts() {
  const episodes = await prisma.podcastEpisode.findMany({
    where: { featured: true },
    orderBy: { sort: 'asc' },
  });
  return episodes.map((e) => ({
    ...e,
    tags: e.tags ? (JSON.parse(e.tags) as { label: string; value: string }[]) : [],
  }));
}

export async function getLatestPodcastEpisodes() {
  return prisma.podcastEpisode.findMany({
    where: { featured: false },
    orderBy: { sort: 'asc' },
  });
}

export async function getResources(tab?: string) {
  const highlights = await prisma.resourceHighlight.findMany({ orderBy: { sort: 'asc' } });
  const resources = await prisma.resource.findMany({
    where: tab && tab !== 'All' ? { tab } : undefined,
    orderBy: { sort: 'asc' },
  });
  return {
    highlights,
    resources: resources.map((r) => ({
      ...r,
      meta: r.meta ? (JSON.parse(r.meta) as { label: string; value: string }[]) : [],
    })),
  };
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { sort: 'asc' } });
}

export async function getFaqs() {
  return prisma.faq.findMany({ orderBy: { sort: 'asc' } });
}

export async function getSimilarNews() {
  return prisma.similarNewsItem.findMany({ orderBy: { sort: 'asc' } });
}
