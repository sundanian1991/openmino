import { NextResponse } from 'next/server';
import { getStyles } from '@/lib/data/styles';

export async function GET() {
  try {
    const styles = getStyles();
    return NextResponse.json(styles);
  } catch (error) {
    console.error('Error loading styles:', error);
    return NextResponse.json(
      { error: 'Failed to load styles' },
      { status: 500 }
    );
  }
}
