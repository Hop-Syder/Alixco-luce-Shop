/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Upload d'images vers Supabase Storage — remplace backend/app/api/endpoints/upload.py (Cloudinary)
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getSupabaseAdmin, SUPABASE_STORAGE_BUCKET } from '@/lib/supabase';
import { withCors, corsPreflight } from '@/lib/cors';
import { withErrorHandling } from '@/lib/api-handler';

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
const CONTENT_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
};

export async function OPTIONS(req: NextRequest) {
  return corsPreflight(req.headers.get('origin'));
}

export const POST = withErrorHandling(async (req: NextRequest) => {
  const origin = req.headers.get('origin');
  const formData = await req.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return withCors(NextResponse.json({ detail: 'Aucun fichier fourni' }, { status: 400 }), origin);
  }

  const extension = file.name.includes('.') ? file.name.split('.').pop()!.toLowerCase() : '';
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return withCors(
      NextResponse.json({ detail: 'Type de fichier non autorisé. Seuls JPG, PNG, WEBP et GIF sont acceptés.' }, { status: 400 }),
      origin
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const objectPath = `alixco_luxe/${randomUUID()}.${extension}`;

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .upload(objectPath, buffer, { contentType: CONTENT_TYPES[extension], upsert: false });

    if (error) throw new Error(error.message);

    const { data } = supabaseAdmin.storage.from(SUPABASE_STORAGE_BUCKET).getPublicUrl(objectPath);

    return withCors(NextResponse.json({ url: data.publicUrl }), origin);
  } catch (error) {
    // Le détail technique reste côté serveur (logs) — le client ne reçoit qu'un message générique.
    console.error('Upload Supabase Storage échoué:', error);
    return withCors(
      NextResponse.json({ detail: "Erreur lors de l'upload de l'image. Veuillez réessayer." }, { status: 500 }),
      origin
    );
  }
});
