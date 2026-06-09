import { prisma } from '@/lib/prisma';
import { handleApiError, jsonOk } from '@/lib/api-response';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'shows') {
      const shows = await prisma.podcastShow.findMany({ orderBy: { sort: 'asc' } });
      return jsonOk(shows);
    }

    if (type === 'featured') {
      const featured = await prisma.podcastEpisode.findMany({
        where: { featured: true },
        orderBy: { sort: 'asc' },
      });
      return jsonOk(
        featured.map((e) => ({
          ...e,
          tags: e.tags ? JSON.parse(e.tags) : [],
        }))
      );
    }

    const episodes = await prisma.podcastEpisode.findMany({
      where: { featured: false },
      orderBy: { sort: 'asc' },
    });
    return jsonOk(episodes);
  } catch (error) {
    return handleApiError(error);
  }
}
