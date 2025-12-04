import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'profile',
    title: 'Profile',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            description: 'Main title on the landing page (e.g., Short-Form Video Editor)',
        }),
        defineField({
            name: 'heroDescription',
            title: 'Hero Description',
            type: 'text',
            description: 'Subtitle/description on the landing page',
        }),
        defineField({
            name: 'aboutTitle',
            title: 'About Title',
            type: 'string',
            description: 'Title for the About section (e.g., The Editor Behind The Viral Cut)',
        }),
        defineField({
            name: 'aboutDescription',
            title: 'About Description',
            type: 'text',
            description: 'Main bio text for the About section',
        }),
        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'stats',
            title: 'Stats',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'value', type: 'string', title: 'Value' },
                        { name: 'label', type: 'string', title: 'Label' },
                    ],
                },
            ],
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            fields: [
                { name: 'email', type: 'string', title: 'Email' },
                { name: 'instagram', type: 'url', title: 'Instagram URL' },
                { name: 'youtube', type: 'url', title: 'YouTube URL' },
            ],
        }),
    ],
})
