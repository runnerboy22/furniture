import { NextResponse } from 'next/server';
import { uHaul, getSize } from '@/lib/scraper';
import { storageFacilities } from '@/lib/scraper';

export async function POST(req: Request) {
  try {
    console.log('post');
    return NextResponse.json({ message: 'reCAPTCHA verification successful' });
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' });
  }
}

export async function GET(req: Request) {
  try {
    // const example = await uHaul(storageFacilities.uHaul);
    const example2 = await getSize(storageFacilities.uHaul);
    return NextResponse.json(example2);
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' });
  }
}
