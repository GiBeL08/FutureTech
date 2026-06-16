import Hero from './components/Hero';
import Features from './components/Features';
import BlogsSection from './components/BlogsSection';
import ResourcesSection from './components/ResourcesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import PostsSection from './components/PostsSection';

// Изолированная функция запроса
async function fetchDataSafe(endpoint: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  const fullUrl = `${apiUrl}/${endpoint}`;
  
  console.log(`[API FETCH START]: Запрос на ${fullUrl}`);
  
  try {
    const res = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      console.error(`[API FETCH ERROR]: ${endpoint} вернул статус ${res.status}`);
      return [];
    }

    // Читаем текст, чтобы избежать преждевременного закрытия стрима body в Next.js
    const textData = await res.text();
    if (!textData) {
      console.log(`[API FETCH EMPTY]: ${endpoint} вернул пустой ответ`);
      return [];
    }

    const json = JSON.parse(textData);
    console.log(`[API FETCH SUCCESS]: Данные для ${endpoint} успешно получены`);
    return json.data || json;
  } catch (error) {
    console.error(`[API FETCH FAILED]: Ошибка запроса к ${endpoint}:`, error);
    return [];
  }
}

export default async function Home() {
  console.log('[HOME PAGE]: Начало рендеринга страницы...');

  // Избавляемся от Promise.all, запрашиваем строго по очереди, 
  // чтобы Next.js не путал входящие стримы данных (Body)
  const stats = await fetchDataSafe('stats');
  const blogs = await fetchDataSafe('blog');
  const testimonials = await fetchDataSafe('testimonials');
  const posts = await fetchDataSafe('posts');

  console.log('[HOME PAGE]: Все запросы завершены.');

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