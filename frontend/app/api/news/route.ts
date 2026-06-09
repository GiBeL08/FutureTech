import { prisma } from '@/lib/prisma';
import { handleApiError, jsonOk } from '@/lib/api-response';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const articles = await prisma.newsArticle.findMany({
      where:
        type === 'featured'
          ? { featured: true }
          : type === 'headlines'
            ? { headline: true }
            : type === 'similar'
              ? undefined
              : undefined,
      orderBy: { sort: 'asc' },
    });

    return jsonOk(articles);
  } catch (error) {
    return handleApiError(error);
  }
}
