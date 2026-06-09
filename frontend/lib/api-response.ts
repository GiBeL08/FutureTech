import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function jsonError(message: string, status = 400, errors?: unknown) {
  return NextResponse.json({ success: false, message, errors }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return jsonError('Validation failed', 422, error.flatten().fieldErrors);
  }
  console.error(error);
  return jsonError('Internal server error', 500);
}
