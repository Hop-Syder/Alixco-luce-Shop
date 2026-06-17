/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Crée (si besoin) le bucket Supabase Storage public utilisé par /api/upload.
 *              Usage : npx tsx scripts/create-storage-bucket.ts
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { config as loadEnv } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

loadEnv({ path: '.env.local' });

async function main() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'alixco-luxe-uploads';

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis dans .env.local.');
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
    realtime: { transport: ws as unknown as typeof WebSocket },
  });

  const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) throw new Error(listError.message);

  if (existingBuckets.some((b) => b.name === bucket)) {
    console.log(`Le bucket "${bucket}" existe déjà.`);
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(bucket, {
    public: true,
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  });

  if (createError) throw new Error(createError.message);

  console.log(`✅ Bucket "${bucket}" créé (public).`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exitCode = 1;
});
