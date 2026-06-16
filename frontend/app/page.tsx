import Hero from './components/Hero';
import Features from './components/Features';
import BlogsSection from './components/BlogsSection';
import ResourcesSection from './components/ResourcesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import PostsSection from './components/PostsSection';

// Универсальная функция для отправки запросов к твоему NestJS бэкенду
async function fetchData(endpoint: string) {
  // Берем адрес бэкенда из переменной окружения Vercel, либо локальный для разработки
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
  
  try {
    const res = await fetch(`${apiUrl}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Отключаем жесткое кэширование, чтобы данные обновлялись при перезагрузке
      cache: 'no-store' 
    });

    if (!res.ok) {
      console.error(`Ошибка при запросе к /api/${endpoint}: Статус ${res.status}`);
      return [];
    }

    const json = await res.json();
    
    // Если твой NestJS возвращает данные завернутыми в { data: [...] }, достаем массив.
    // Иначе возвращаем результат как есть.
    return json.data || json;
  } catch (error) {
    console.error(`Не удалось достучаться до эндпоинта /api/${endpoint}:`, error);
    return []; // Возвращаем пустой массив, чтобы страница не падала целиком
  }
}

export default async function Home() {
  // Делаем параллельные запросы ко всем нужным модулям NestJS бэкенда
  const [stats, blogs, testimonials, posts] = await Promise.all([
    fetchData('stats'),        // Запрос к StatsModule
    fetchData('blog'),         // Запрос к BlogModule (если роут во множественном числе, исправь на 'blogs')
    fetchData('testimonials'), // Запрос к TestimonialsModule
    fetchData('posts'),        // Запрос к PostsModule (который уже успешно проверили)
  ]);

  // Форматируем данные статистики для компонента Hero
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