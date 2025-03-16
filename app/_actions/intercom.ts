'use server';

import crypto from 'crypto';

export async function generateIntercomHash(userId: string) {
  const secretKey = process.env.INTERCOM_SECRET;
  if (!secretKey) {
    throw new Error('INTERCOM_SECRET environment variable is not set');
  }
  return crypto.createHmac('sha256', secretKey).update(userId).digest('hex');
}
