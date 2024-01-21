import { NextResponse } from 'next/server';
import { launch, getSize } from '@/lib/scraper';
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
    const example = await launch(storageFacilities.uHaul);
    return NextResponse.json(example);
  } catch (err) {
    return NextResponse.json({ message: err });
  }
}
