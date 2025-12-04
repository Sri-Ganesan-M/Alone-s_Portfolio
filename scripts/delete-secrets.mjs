import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2024-12-04',
});

async function deleteSecrets() {
    console.log('Deleting incorrect secrets...');
    try {
        await client.delete('secrets.cloudinary');
        console.log('Deleted secrets.cloudinary');
    } catch (err) {
        console.error('Delete failed:', err.message);
    }
}

deleteSecrets();
