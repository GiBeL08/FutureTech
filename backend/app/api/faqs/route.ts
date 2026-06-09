import { prisma } from '@/lib/prisma';
import { handleApiError, jsonOk } from '@/lib/api-response';

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({ orderBy: { sort: 'asc' } });
    return jsonOk(faqs);
  } catch (error) {
    return handleApiError(error);
  }
}
