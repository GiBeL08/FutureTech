import { prisma } from '@/lib/prisma';
import { handleApiError, jsonOk } from '@/lib/api-response';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tab = searchParams.get('tab');

    const highlights = await prisma.resourceHighlight.findMany({ orderBy: { sort: 'asc' } });

    const resources = await prisma.resource.findMany({
      where: tab && tab !== 'All' ? { tab } : undefined,
      orderBy: { sort: 'asc' },
    });

    return jsonOk({
      highlights,
      resources: resources.map((r) => ({
        ...r,
        meta: r.meta ? JSON.parse(r.meta) : [],
      })),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
