type ApiResponse<T> = { success: true; data: T } | { success: false; message: string; errors?: unknown };

async function parseResponse<T>(res: Response): Promise<T> {
  const json = (await res.json()) as ApiResponse<T>;
  if (!res.ok || !json.success) {
    const msg = !json.success ? json.message : 'Request failed';
    const errors = !json.success ? json.errors : undefined;
    throw new Error(typeof errors === 'object' ? JSON.stringify(errors) : msg);
  }
  return json.data;
}

export async function subscribeNewsletter(email: string) {
  const res = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return parseResponse<{ email: string; alreadySubscribed: boolean }>(res);
}

export async function submitContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
  agree: boolean;
}) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse<{ id: string }>(res);
}
