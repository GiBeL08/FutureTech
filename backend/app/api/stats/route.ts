import { prisma } from '@/lib/prisma';
import { handleApiError, jsonError, jsonOk } from '@/lib/api-response';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') ?? 'home';

    const stats = await prisma.siteStat.findMany({
      where: { page },
      orderBy: { sort: 'asc' },
    });

    return jsonOk(stats);
  } catch (error) {
    return handleApiError(error);
  }
}
