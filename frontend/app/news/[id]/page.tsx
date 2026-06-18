import { getNewsBySlug } from '@/lib/db';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ id?: string }>;
};

export default async function NewsPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  try {
    const news = await getNewsBySlug(id);

    if (!news) {
      notFound();
    }

    return (
      <div className="text-white p-10">
        <h1>{news.title}</h1>
        <p>{news.desc}</p>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
