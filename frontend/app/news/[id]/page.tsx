import { getNewsBySlug } from '@/lib/db';

type PageProps = {
  params?: { id?: string };
};

export default async function NewsPage({ params }: PageProps) {
  const id = params?.id;

  if (!id) {
    return <div className="text-white p-10">ID not found in URL</div>;
  }

  const news = await getNewsBySlug(id);

  return (
    <div className="text-white p-10">
      <h1>{news.title}</h1>
      <p>{news.desc}</p>
    </div>
  );
}