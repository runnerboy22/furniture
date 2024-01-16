import { NextResponse } from 'next/server';

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
    console.log('get');
    return NextResponse.json({ message: 'reCAPTCHA verification successful' });
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' });
  }
}
