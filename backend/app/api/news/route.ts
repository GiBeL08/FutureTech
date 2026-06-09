import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');

  let where = {};

  if (type === 'featured') {
    where = { featured: true };
  } else if (type === 'teasers') {
    where = { featured: false };
  } else if (type === 'headlines') {
    where = { headline: true };
  }

  const news = await prisma.newsArticle.findMany({
    where,
    orderBy: { sort: 'asc' },
  });

  // 👇 ВАЖНО: возвращаем id
  const formatted = news.map((n) => ({
    id: n.slug, // ✅ ВОТ ЭТО ГЛАВНОЕ
    title: n.title,
    desc: n.desc,
    category: n.category,
    image: n.image,
    date: n.date,
    readTime: n.readTime,
    author: {
      name: n.authorName,
      avatar: n.authorAvatar,
    },
  }));

  return NextResponse.json({
    data: formatted,
  });
}