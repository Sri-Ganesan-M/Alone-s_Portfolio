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

if (!projectId || !dataset || !token) {
    console.error('Missing configuration. Please ensure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN are set in .env.local');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2024-12-04',
});

async function configureCloudinary() {
    console.log('Configuring Cloudinary secrets...');

    const secrets = {
        _id: 'secrets.cloudinary',
        _type: 'pluginSecrets',
        secrets: {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        }
    };

    try {
        // Using createOrReplace to ensure it exists and is up to date
        await client.createOrReplace(secrets);
        console.log('Cloudinary secrets configured successfully!');
    } catch (err) {
        console.error('Configuration failed:', err.message);
        // Fallback: maybe the type is different?
        // The plugin usually defines the type. 
    }
}

configureCloudinary();
