import { NextRequest, NextResponse } from 'next/server';
import { generateSignedUrl } from '@/utils/signedUrlGenerator';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileName = searchParams.get('fileName');

  if (!fileName) {
    return NextResponse.json({ error: 'fileName is required' }, { status: 400 });
  }

  try {
    const signedUrl = await generateSignedUrl(fileName);
    return NextResponse.json({ signedUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }
}