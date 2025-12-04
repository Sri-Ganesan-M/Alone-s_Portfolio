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

async function verifySecrets() {
    console.log('Verifying Cloudinary secrets...');
    try {
        const doc = await client.getDocument('secrets.cloudinary');
        console.log('Document secrets.cloudinary:', doc);
    } catch (err) {
        console.error('Error fetching secrets.cloudinary:', err.message);
    }

    try {
        const doc2 = await client.getDocument('secrets.sanity-plugin-cloudinary');
        console.log('Document secrets.sanity-plugin-cloudinary:', doc2);
    } catch (err) {
        console.error('Error fetching secrets.sanity-plugin-cloudinary:', err.message);
    }
}

verifySecrets();
