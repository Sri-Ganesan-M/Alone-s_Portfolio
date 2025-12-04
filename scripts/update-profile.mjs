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

async function updateProfile() {
    console.log('Updating Profile content...');

    const doc = {
        _id: 'profile',
        _type: 'profile',
        heroTitle: "Short-Form Video Editor",
        heroDescription: "Specializing in reels, promos & social-ready edits.\nBringing fast cuts, clean transitions, and storytelling that hooks in seconds.",
        aboutTitle: "The Editor Behind The Viral Cut",
        aboutDescription: "Crafting visual narratives that captivate and engage. With a keen eye for rhythm and a passion for storytelling, I transform raw footage into compelling content that resonates with audiences.",
        stats: [
            { label: "Years Experience", value: "4+" },
            { label: "Projects Completed", value: "150+" },
            { label: "Happy Clients", value: "50+" }
        ]
    };

    try {
        // We use patch to update specific fields, or createOrReplace if we want to overwrite.
        // Since we want to preserve other fields like socialLinks and profileImage if they exist (from previous migration),
        // we should use patch. But wait, previous migration created the document.
        // Let's use patch to be safe and only update the text fields.

        await client.patch('profile')
            .set({
                heroTitle: doc.heroTitle,
                heroDescription: doc.heroDescription,
                aboutTitle: doc.aboutTitle,
                aboutDescription: doc.aboutDescription,
                stats: doc.stats
            })
            .commit();

        console.log('Profile updated successfully!');
    } catch (err) {
        console.error('Update failed:', err.message);
    }
}

updateProfile();
