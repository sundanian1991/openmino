import { NextResponse } from 'next/server';
import { getStyles, getProductColorSchemes } from '@/lib/data/styles';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'colors') {
      const colorSchemes = getProductColorSchemes();
      return NextResponse.json(colorSchemes);
    }

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
