const API_URL = 'http://localhost:3001/api';

// 🔥 универсальный fetcher
async function fetcher(url: string) {
  const res = await fetch(`${API_URL}${url}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${url}`);
  }

  const data = await res.json();
  return data.data ?? data;
}

// 🔥 нормализация (ГАРАНТИЯ id)
function normalizeArray(data: any[]) {
  return data.map((item, index) => ({
    id: item.id ?? item._id ?? `temp-${Date.now()}-${index}`, // 👈 уникальный ID если отсутствует
    ...item,
  }));
}

// ==================== HOME ====================

export async function getSiteStats(page: 'home' | 'resources') {
  return fetcher(`/stats?page=${page}`);
}

export async function getBlogs() {
  const data = await fetcher('/blogs');
  return normalizeArray(data);
}

export async function getTestimonials() {
  return fetcher('/testimonials');
}

// ==================== NEWS ====================

export async function getFeaturedNews() {
  const data = await fetcher('/news?type=featured');
  return normalizeArray(data);
}

export async function getNewsTeasers() {
  const data = await fetcher('/news?type=teasers');
  return normalizeArray(data);
}

export async function getHeadlines() {
  const data = await fetcher('/news?type=headlines');
  return normalizeArray(data);
}

export async function getVideos() {
  return fetcher('/videos');
}

// ==================== PODCASTS ====================

export async function getFeaturedPodcasts() {
  const data = await fetcher('/podcasts?type=featured');
  return normalizeArray(data);
}

export async function getPodcastShows() {
  const data = await fetcher('/podcasts');
  return normalizeArray(data);
}

export async function getLatestPodcastEpisodes() {
  const data = await fetcher('/podcasts');
  return normalizeArray(data);
}

// ==================== RESOURCES ====================

export async function getResources() {
  return fetcher('/resources');
}

export async function getResourceHighlights() {
  return fetcher('/resources/highlights');
}

// ==================== FAQ ====================

export async function getFaqs() {
  return fetcher('/faqs');
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
  return fetcher(`/blogs/${id}`);
}

export async function getSimilarNews() {
  const data = await fetcher('/similar-news');
  return normalizeArray(data);
}

export async function getNewsBySlug(id: string) {
  return fetcher(`/news/${id}`);
}