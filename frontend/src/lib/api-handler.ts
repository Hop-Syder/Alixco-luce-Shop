/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Wrapper unique pour les Route Handlers : centralise CORS + gestion d'erreurs
 *              (auth, JSON malformé, erreurs serveur inattendues) — évite de dupliquer le
 *              try/catch requireAdmin/requireUser dans chaque route et empêche toute fuite
 *              de détail d'erreur interne vers le client.
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import { AuthError } from '@/lib/auth';
import { withCors } from '@/lib/cors';

type RouteHandler<Ctx> = (req: NextRequest, ctx: Ctx) => Promise<NextResponse>;

export function withErrorHandling<Ctx = unknown>(handler: RouteHandler<Ctx>): RouteHandler<Ctx> {
  return async (req: NextRequest, ctx: Ctx): Promise<NextResponse> => {
    const origin = req.headers.get('origin');
    try {
      return await handler(req, ctx);
    } catch (err) {
      if (err instanceof AuthError) {
        return withCors(NextResponse.json({ detail: err.message }, { status: err.status }), origin);
      }
      if (err instanceof SyntaxError) {
        return withCors(NextResponse.json({ detail: 'Corps de requête invalide (JSON malformé)' }, { status: 400 }), origin);
      }
      console.error('Unhandled API error:', err);
      return withCors(NextResponse.json({ detail: 'Erreur interne du serveur' }, { status: 500 }), origin);
    }
  };
}
