import type { BlogPost } from './blogs';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export type SiteStat = {
  id: number;
  value: string;
  label: string;
  page: string;
  sort: number;
};

type ApiRecord = Record<string, any>;

type ResourceHighlight = {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
};

type ResourceItem = {
  id: number;
  tab: string;
  title: string;
  subtitle: string;
  image: string | null;
  meta: { label: string; value: string }[];
};

type ResourceData = {
  highlights: ResourceHighlight[];
  resources: ResourceItem[];
};

type BlogListItem = {
  id: number;
  category: string;
  title: string;
  desc: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  metrics: {
    likes: string;
    views: string;
  };
  tags: string[];
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
};

type Faq = {
  q: string;
  a: string;
};

type SimilarNewsItem = {
  id?: number;
  image: string;
  title: string;
  category: string;
  likes: string;
  views: string;
};

type NewsArticle = {
  id: number | string;
  image: string;
  category: string;
  title: string;
  desc: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
};

type Video = {
  id: number;
  image: string;
  title: string;
  category: string;
  duration: string;
};

type PodcastShow = {
  id: number;
  title: string;
  subtitle: string;
  rating: number;
  episodes: string;
  followers: string;
  icon: string;
};

type FeaturedPodcast = {
  id: number;
  showName: string;
  title: string;
  desc: string | null;
  image: string;
  tags: { label: string; value: string }[];
};

type PodcastEpisode = {
  id: number;
  image: string;
  category: string | null;
  showName: string;
  title: string;
  duration: string;
  date: string;
};

// 🔥 универсальный fetcher
async function fetcher<T>(url: string): Promise<T> {
  const requestUrl = `${API_URL}${url}`;
  const res = await fetch(requestUrl, {
    cache: 'no-store',
  });

  if (!res.ok) {
    let message = res.statusText;

    try {
      const errorData = await res.json();
      message = errorData.message ?? errorData.error ?? message;
    } catch {
      const text = await res.text();
      message = text || message;
    }

    throw new Error(`Failed to fetch ${requestUrl}: ${res.status} ${message}`);
  }

  const data = await res.json();
  return data.data ?? data;
}

// 🔥 нормализация (ГАРАНТИЯ id)
function normalizeArray<T extends { id?: string | number; _id?: string | number }>(data: T[]) {
  return data.map((item, index) => ({
    id: item.id ?? item._id ?? `temp-${Date.now()}-${index}`, // 👈 уникальный ID если отсутствует
    ...item,
  }));
}

// ==================== HOME ====================

export async function getSiteStats(page: 'home' | 'resources') {
  return fetcher<SiteStat[]>(`/stats?page=${page}`);
}

export async function getBlogs() {
  const data = await fetcher<BlogListItem[]>('/blogs');
  return normalizeArray(data);
}

export async function getTestimonials() {
  return fetcher<Testimonial[]>('/testimonials');
}

// ==================== NEWS ====================

export async function getFeaturedNews() {
  const data = await fetcher<NewsArticle[]>('/news?type=featured');
  return normalizeArray(data);
}

export async function getNewsTeasers() {
  const data = await fetcher<NewsArticle[]>('/news?type=teasers');
  return normalizeArray(data);
}

export async function getHeadlines() {
  const data = await fetcher<NewsArticle[]>('/news?type=headlines');
  return normalizeArray(data);
}

export async function getVideos() {
  return fetcher<Video[]>('/videos');
}

// ==================== PODCASTS ====================

export async function getFeaturedPodcasts() {
  const data = await fetcher<FeaturedPodcast[]>('/podcasts?type=featured');
  return normalizeArray(data);
}

export async function getPodcastShows() {
  const data = await fetcher<PodcastShow[]>('/podcasts?type=shows');
  return normalizeArray(data);
}

export async function getLatestPodcastEpisodes() {
  const data = await fetcher<PodcastEpisode[]>('/podcasts');
  return normalizeArray(data);
}

// ==================== RESOURCES ====================

export async function getResources() {
  return fetcher<ResourceData>('/resources');
}

export async function getResourceHighlights() {
  return fetcher<ResourceHighlight[]>('/resources/highlights');
}

// ==================== FAQ ====================

export async function getFaqs() {
  return fetcher<Faq[]>('/faqs');
}

// ==================== CONTACT ====================

export async function sendContactMessage(body: any) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error('Failed to send contact message');
  }

  return res.json();
}

// ==================== NEWSLETTER ====================

export async function subscribeNewsletter(email: string) {
  const res = await fetch(`${API_URL}/newsletter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error('Failed to subscribe');
  }

  return res.json();
}

// ==================== BLOG PAGE ====================

export async function getBlogById(id: string) {
  return fetcher<BlogPost>(`/blogs/${id}`);
}

export async function getSimilarNews() {
  const data = await fetcher<SimilarNewsItem[]>('/similar-news');
  return normalizeArray(data);
}

export async function getNewsBySlug(id: string) {
  return fetcher<ApiRecord>(`/news/${id}`);
}
