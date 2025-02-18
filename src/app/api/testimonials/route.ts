export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getTestimonials } from '@/sanity/sanity-utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const secretKey = process.env.MY_SECRET_KEY;

    const url = new URL(request.url);
    const providedKey = url.searchParams.get('secret');

    if (providedKey !== secretKey) {
        return NextResponse.json(
            { error: 'Invalid secret key' },
            { status: 401 }
        );
    }

    try {
        const { data, totalPages } = await getTestimonials();
        return NextResponse.json({ data, totalPages });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch testimonials' },
            { status: 500 }
        );
    }
}
