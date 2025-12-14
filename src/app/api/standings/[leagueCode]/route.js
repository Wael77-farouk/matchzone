// app/api/standings/[leagueCode]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { leagueCode } = params;
  
  // التحقق من وجود API Token
  const apiToken = process.env.NEXT_PUBLIC_API_TOKEN;
  
  if (!apiToken) {
    console.error('❌ API Token is missing!');
    return NextResponse.json(
      { error: 'API Token is not configured. Please add NEXT_PUBLIC_API_TOKEN to your .env.local file' },
      { status: 500 }
    );
  }

  console.log('🔍 Fetching standings for league:', leagueCode);
  console.log('🔑 Using API Token:', apiToken.substring(0, 10) + '...');
  
  try {
    const url = `https://api.football-data.org/v4/competitions/${leagueCode}/standings`;
    console.log('📡 API URL:', url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Auth-Token": apiToken
      },
      cache: 'no-store'
    });

    console.log('📊 Response status:', response.status);
    console.log('📋 Response headers:', Object.fromEntries(response.headers));

    // التحقق من Content-Type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('❌ Invalid content type:', contentType);
      console.error('📄 Response body:', text.substring(0, 500));
      
      return NextResponse.json(
        { 
          error: 'Invalid API response format. Please check your API token.',
          details: text.substring(0, 200)
        },
        { status: 500 }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', response.status, errorText);
      
      if (response.status === 403) {
        return NextResponse.json(
          { error: 'This league is not available in your subscription plan' },
          { status: 403 }
        );
      }
      
      return NextResponse.json(
        { error: `Failed to fetch standings: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Data fetched successfully');
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
    
  } catch (error) {
    console.error('💥 API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message,
        details: 'Check server logs for more information'
      },
      { status: 500 }
    );
  }
}