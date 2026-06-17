/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description CORS helper — réplique le middleware CORSMiddleware de backend/app/main.py
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextResponse } from 'next/server';

function resolveAllowedOrigin(requestOrigin: string | null): string {
  const allowAll = (process.env.ALLOW_ALL_ORIGINS || 'true').toLowerCase() === 'true';
  if (allowAll) return '*';

  const allowedOrigins = (process.env.ALLOW_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  if (requestOrigin && allowedOrigins.includes(requestOrigin)) return requestOrigin;
  return allowedOrigins[0] || '';
}

export function withCors(response: NextResponse, requestOrigin: string | null): NextResponse {
  const origin = resolveAllowedOrigin(requestOrigin);
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    if (origin !== '*') response.headers.set('Access-Control-Allow-Credentials', 'true');
  }
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export function corsPreflight(requestOrigin: string | null): NextResponse {
  return withCors(new NextResponse(null, { status: 204 }), requestOrigin);
}
