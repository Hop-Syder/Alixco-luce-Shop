/**
 * @author @hopsyder
 * @organization Nexus Partners
 * @description Client Supabase côté serveur (Storage) — utilisé pour l'upload d'images
 * @created 2026-06-17
 * @updated 2026-06-17
 * 🌐 ceo.nexuspartners.xyz
 * 📧 daoudaabassichristian@gmail.com
 */

import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Node 20 n'a pas de WebSocket natif stable — requis par le client Realtime initialisé en interne par supabase-js, même si on ne l'utilise que pour Storage.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
  realtime: { transport: ws as unknown as typeof WebSocket },
});

export const SUPABASE_STORAGE_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'alixco-luxe-uploads';
