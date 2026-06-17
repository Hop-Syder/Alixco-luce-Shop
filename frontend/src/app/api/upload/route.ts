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
import { supabaseAdmin, SUPABASE_STORAGE_BUCKET } from '@/lib/supabase';
import { withCors, corsPreflight } from '@/lib/cors';

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

export async function POST(req: NextRequest) {
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

    const { error } = await supabaseAdmin.storage
      .from(SUPABASE_STORAGE_BUCKET)
      .upload(objectPath, buffer, { contentType: CONTENT_TYPES[extension], upsert: false });

    if (error) throw new Error(error.message);

    const { data } = supabaseAdmin.storage.from(SUPABASE_STORAGE_BUCKET).getPublicUrl(objectPath);

    return withCors(NextResponse.json({ url: data.publicUrl }), origin);
  } catch (error) {
    return withCors(
      NextResponse.json({ detail: `Erreur lors de l'upload: ${(error as Error).message}` }, { status: 500 }),
      origin
    );
  }
}
