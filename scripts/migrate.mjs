import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in envConfig) {
    process.env[k] = envConfig[k];
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function migrate() {
    console.log('🚀 Starting migration...');

    const dataPath = path.join(process.cwd(), 'src/data/menu_items.json');
    const menuItems = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    console.log(`📦 Found ${menuItems.length} items. Mapping data...`);

    // Map JSON data to DB columns (fixing id to be uuid or letting it generate)
    const itemsToInsert = menuItems.map(item => {
        const { id, ...rest } = item;
        return {
            ...rest,
            // Ensure booleans are correct
            isVeg: !!item.isVeg,
            isBestseller: !!item.isBestseller,
            available: item.available !== undefined ? item.available : true
        };
    });

    console.log('📤 Uploading to Supabase...');

    const { data, error } = await supabase
        .from('menu_items')
        .insert(itemsToInsert);

    if (error) {
        console.error('❌ Migration failed:', error);
    } else {
        console.log('✅ Migration successful! All items are now in Supabase.');
    }
}

migrate();
