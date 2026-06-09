import { prisma } from '@/lib/prisma';
import { handleApiError, jsonOk } from '@/lib/api-response';

export async function GET() {
  try {
    const items = await prisma.similarNewsItem.findMany({ orderBy: { sort: 'asc' } });
    return jsonOk(items);
  } catch (error) {
    return handleApiError(error);
  }
}
