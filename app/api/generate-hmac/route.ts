import crypto from 'crypto';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }

  const secretKey = process.env.INTERCOM_SECRET!;
  const hash = crypto.createHmac('sha256', secretKey).update(id).digest('hex');

  return NextResponse.json({ hash });
}
