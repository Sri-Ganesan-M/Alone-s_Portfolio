import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'work',
    title: 'Work',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),
        defineField({
            name: 'orientation',
            title: 'Orientation',
            type: 'string',
            options: {
                list: [
                    { title: 'Vertical (9:16)', value: 'vertical' },
                    { title: 'Horizontal (16:9)', value: 'horizontal' },
                ],
            },
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'media',
            title: 'Video',
            type: 'cloudinary.asset',
            description: 'Upload video to Cloudinary',
        }),
        defineField({
            name: 'contentType',
            title: 'Content Type',
            type: 'string',
            description: 'e.g., Ad / Promotional Spot',
        }),
        defineField({
            name: 'subjectMatter',
            title: 'Subject Matter',
            type: 'string',
            description: 'e.g., Film & TV',
        }),
        defineField({
            name: 'editingStyle',
            title: 'Editing Style',
            type: 'string',
            description: 'e.g., Stop-Motion / Time-Lapse',
        }),
        defineField({
            name: 'software',
            title: 'Software Used',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'tool' } }],
        }),
        defineField({
            name: 'externalLink',
            title: 'External Link',
            type: 'url',
            description: 'Link to Instagram/YouTube post',
        }),
    ],
})
