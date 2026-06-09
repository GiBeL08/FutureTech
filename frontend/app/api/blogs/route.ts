import { prisma } from '@/lib/prisma';
import { handleApiError, jsonOk } from '@/lib/api-response';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const blogs = await prisma.blogPost.findMany({
      where: category && category !== 'All' ? { category } : undefined,
      orderBy: { sort: 'asc' },
    });

    const mapped = blogs.map((b) => ({
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
      metrics: {
        likes: b.likes,
        views: b.views,
      },
      tags: b.tags ? (JSON.parse(b.tags) as string[]) : [],
    }));

    return jsonOk(mapped);
  } catch (error) {
    return handleApiError(error);
  }
}
