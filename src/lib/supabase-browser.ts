/**
 * Supabase client for direct browser-side uploads.
 * Using NEXT_PUBLIC_ variables so this is safe to use in "use client" components.
 * Uploads go browser → Supabase Storage directly, bypassing Vercel's 4.5MB serverless body limit.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload a file directly from the browser to a Supabase Storage bucket.
 * Returns the public URL on success, or throws with a descriptive error message.
 */
export async function uploadFileToBucket(
    file: File,
    bucket: string
): Promise<string> {
    const ext = file.name.split('.').pop() ?? 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const { data, error } = await supabaseBrowser.storage
        .from(bucket)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type || 'image/jpeg',
        });

    if (error) {
        throw new Error(
            `Upload to '${bucket}' bucket failed: ${error.message}. ` +
            `Make sure the bucket exists in Supabase Storage, is set to Public, ` +
            `and has an INSERT policy for the anon role.`
        );
    }

    const { data: { publicUrl } } = supabaseBrowser.storage
        .from(bucket)
        .getPublicUrl(data.path);

    return publicUrl;
}
