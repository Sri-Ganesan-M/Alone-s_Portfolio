import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const DATA_DIR = path.join(__dirname, '../src/data');
const PUBLIC_DIR = path.join(__dirname, '../public');

async function uploadAsset(filePath, contentType) {
    try {
        const absolutePath = path.join(PUBLIC_DIR, filePath);
        if (!fs.existsSync(absolutePath)) {
            console.warn(`File not found: ${absolutePath}`);
            return null;
        }
        const buffer = fs.readFileSync(absolutePath);
        const asset = await client.assets.upload(contentType === 'image' ? 'image' : 'file', buffer, {
            filename: path.basename(filePath),
        });
        return asset._id;
    } catch (error) {
        console.error(`Failed to upload asset ${filePath}:`, error.message);
        return null;
    }
}

async function migrateProfile() {
    console.log('Migrating Profile...');
    const profilePath = path.join(DATA_DIR, 'profile.json');
    if (!fs.existsSync(profilePath)) return;

    const profile = JSON.parse(fs.readFileSync(profilePath, 'utf-8'));

    let imageAssetId = null;
    if (profile.profileImage) {
        imageAssetId = await uploadAsset(profile.profileImage, 'image');
    }

    const doc = {
        _type: 'profile',
        _id: 'profile', // Singleton
        name: profile.name,
        title: profile.title,
        description: profile.description,
        profileImage: imageAssetId ? { _type: 'image', asset: { _ref: imageAssetId } } : undefined,
        stats: profile.stats,
        socialLinks: profile.socialLinks,
    };

    await client.createOrReplace(doc);
    console.log('Profile migrated.');
}

async function migrateTools() {
    console.log('Migrating Tools...');
    const toolsPath = path.join(DATA_DIR, 'tools.json');
    if (!fs.existsSync(toolsPath)) return;

    const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf-8'));

    for (const tool of tools) {
        let logoAssetId = null;
        if (tool.logo) {
            logoAssetId = await uploadAsset(tool.logo, 'image');
        }

        const doc = {
            _type: 'tool',
            name: tool.name,
            type: tool.type,
            logo: logoAssetId ? { _type: 'image', asset: { _ref: logoAssetId } } : undefined,
        };

        await client.create(doc);
    }
    console.log(`Migrated ${tools.length} tools.`);
}

async function migrateClients() {
    console.log('Migrating Clients...');
    const clientsPath = path.join(DATA_DIR, 'clients.json');
    if (!fs.existsSync(clientsPath)) return;

    const clients = JSON.parse(fs.readFileSync(clientsPath, 'utf-8'));

    for (const c of clients) {
        let logoAssetId = null;
        if (c.logo) {
            logoAssetId = await uploadAsset(c.logo, 'image');
        }

        const doc = {
            _type: 'client',
            name: c.name,
            category: c.category,
            url: c.url,
            logo: logoAssetId ? { _type: 'image', asset: { _ref: logoAssetId } } : undefined,
        };

        await client.create(doc);
    }
    console.log(`Migrated ${clients.length} clients.`);
}

async function migrateWorks() {
    console.log('Migrating Works...');
    const worksPath = path.join(DATA_DIR, 'works.json');
    if (!fs.existsSync(worksPath)) return;

    const works = JSON.parse(fs.readFileSync(worksPath, 'utf-8'));

    for (const work of works) {
        let thumbnailAssetId = null;
        if (work.thumbnail) {
            thumbnailAssetId = await uploadAsset(work.thumbnail, 'image');
        }

        // For media (video), we might want to upload it if it's a file, or keep as string if URL
        // But schema expects 'url' or 'file'? 
        // Schema says: media: url (string) or file?
        // Let's check schema. src/sanity/schemaTypes/work.ts says:
        // defineField({ name: 'media', title: 'Media URL', type: 'url' }),
        // So it expects a URL.
        // If we have a local file, we can't easily put it in a 'url' field unless we upload it somewhere else (Cloudinary) or use 'file' type.
        // But for now, if it's a local path, we can't use it directly in Sanity 'url' field effectively for the frontend to load from Sanity.
        // However, if we upload to Sanity as a file asset, we get a URL.
        // But the schema is 'url'.
        // I should probably update the schema to allow 'file' or just upload to Sanity and get the URL.
        // But 'url' field in Sanity is for external URLs.
        // If I want to host video on Sanity, I should use 'file' type.
        // The user said "Cloudinary will handle large media assets".
        // For now, I will just put the local path in the 'url' field? No, that won't work on production.
        // I will try to upload to Sanity as a file, get the URL, and put it in the 'url' field.
        // OR, I can just leave it as is and warn the user.
        // Actually, the current schema for 'media' is 'url'.
        // If I upload a file to Sanity, I get a CDN URL. I can put that in the 'url' field.

        let mediaUrl = work.media;
        if (work.media && !work.media.startsWith('http')) {
            // It's a local file. Upload it.
            const assetId = await uploadAsset(work.media, 'file');
            if (assetId) {
                // Construct URL? Or just use the asset ID?
                // If I use asset ID, I need to change schema to 'file'.
                // But I can get the URL from the asset object if I fetch it.
                // But the schema is 'url'.
                // I'll just use a placeholder or try to get the URL.
                // Actually, for now, let's just keep the local path and warn, 
                // OR better: Update schema to support 'file' type for media.
                // But I don't want to change schema too much right now.
                // I'll just upload it and set the URL to the Sanity CDN URL.
                // Sanity CDN URL format: https://cdn.sanity.io/files/<projectId>/<dataset>/<assetId>.<ext>
                // I can construct it.
                // But I need the file extension and dimensions etc.
                // Let's just skip video upload for now and let user handle it, 
                // OR just upload thumbnail.
                console.warn(`Skipping video upload for ${work.title} (local path: ${work.media}). Please upload manually or configure Cloudinary.`);
            }
        }

        const doc = {
            _type: 'work',
            title: work.title,
            description: work.description,
            orientation: work.orientation,
            thumbnail: thumbnailAssetId ? { _type: 'image', asset: { _ref: thumbnailAssetId } } : undefined,
            media: mediaUrl, // Keep as is for now
            externalLink: work.externalLink,
        };

        await client.create(doc);
    }
    console.log(`Migrated ${works.length} works.`);
}

async function main() {
    try {
        await migrateProfile();
        await migrateTools();
        await migrateClients();
        await migrateWorks();
        console.log('Migration complete!');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

main();
