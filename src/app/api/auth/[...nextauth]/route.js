import { handlers } from "../../../../auth"

// Add debugging to see what requests are coming in
const { GET: originalGET, POST: originalPOST } = handlers;

export async function GET(request, context) {
    console.log('=== AUTH GET REQUEST ===');
    console.log('URL:', request.url);
    console.log('Search params:', request.nextUrl?.searchParams.toString());
    console.log('Pathname:', request.nextUrl?.pathname);

    // Check if this is a callback
    if (request.nextUrl?.pathname?.includes('/callback/')) {
        console.log('=== GOOGLE CALLBACK DETECTED ===');
        console.log('Full URL:', request.url);
        console.log('All search params:', Object.fromEntries(request.nextUrl.searchParams.entries()));
    }

    return originalGET(request, context);
}

export async function POST(request, context) {
    console.log('=== AUTH POST REQUEST ===');
    console.log('URL:', request.url);
    console.log('Search params:', request.nextUrl?.searchParams.toString());
    console.log('Pathname:', request.nextUrl?.pathname);

    return originalPOST(request, context);
}