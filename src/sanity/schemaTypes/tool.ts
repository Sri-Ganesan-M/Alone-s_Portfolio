import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'tool',
    title: 'Tool',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        }),
        defineField({
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Software', value: 'SOFTWARE' },
                    { title: 'Hardware', value: 'HARDWARE' },
                ],
            },
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],
})
