const API_URL = 'http://localhost:3001/api';

// 🔥 универсальный fetcher (один на всё)
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

// ==================== HOME ====================

export async function getSiteStats(page: 'home' | 'resources') {
  return fetcher(`/stats?page=${page}`);
}

export async function getBlogs() {
  return fetcher('/blogs');
}

export async function getTestimonials() {
  return fetcher('/testimonials');
}

// ==================== NEWS ====================

export async function getFeaturedNews() {
  return fetcher('/news?type=featured');
}

export async function getNewsTeasers() {
  return fetcher('/news?type=teasers');
}

export async function getHeadlines() {
  return fetcher('/news?type=headlines');
}

export async function getVideos() {
  return fetcher('/videos');
}

// ==================== PODCASTS ====================

export async function getFeaturedPodcasts() {
  return fetcher('/podcasts?type=featured');
}

export async function getPodcastShows() {
  return fetcher('/podcasts');
}

export async function getLatestPodcastEpisodes() {
  return fetcher('/podcasts');
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
  return fetcher('/similar-news');
}