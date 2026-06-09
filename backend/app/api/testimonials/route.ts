import { prisma } from '@/lib/prisma';
import { handleApiError, jsonOk } from '@/lib/api-response';

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({ orderBy: { sort: 'asc' } });
    return jsonOk(testimonials);
  } catch (error) {
    return handleApiError(error);
  }
}
