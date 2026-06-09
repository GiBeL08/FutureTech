import { prisma } from '@/lib/prisma';
import { handleApiError, jsonError, jsonOk } from '@/lib/api-response';
import { newsletterSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = newsletterSchema.parse(body);

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      return jsonOk({ email, alreadySubscribed: true }, 200);
    }

    const subscriber = await prisma.newsletterSubscriber.create({ data: { email } });
    return jsonOk({ email: subscriber.email, alreadySubscribed: false }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET() {
  try {
    const count = await prisma.newsletterSubscriber.count();
    return jsonOk({ count });
  } catch (error) {
    return handleApiError(error);
  }
}
