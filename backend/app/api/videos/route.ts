import { prisma } from '@/lib/prisma';
import { handleApiError, jsonOk } from '@/lib/api-response';

export async function GET() {
  try {
    const videos = await prisma.video.findMany({ orderBy: { sort: 'asc' } });
    return jsonOk(videos);
  } catch (error) {
    return handleApiError(error);
  }
}
