import { prisma } from '@/lib/prisma';
import { handleApiError, jsonOk } from '@/lib/api-response';
import { contactSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const message = await prisma.contactMessage.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
      },
    });

    return jsonOk({ id: message.id }, 201);
  } catch (error) {
    return handleApiError(error);
  }
}
