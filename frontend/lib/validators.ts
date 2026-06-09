import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(80),
  lastName: z.string().min(1, 'Last name is required').max(80),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(30).optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  agree: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms' }),
  }),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
