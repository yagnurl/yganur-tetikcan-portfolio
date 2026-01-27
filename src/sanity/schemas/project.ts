import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'A brief summary of the project for the list view.',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed description of the project.',
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Frontend', value: 'frontend'},
          {title: 'Design', value: 'design'},
          {title: 'Experiment', value: 'experiment'},
          {title: 'None', value: 'null'},
        ],
      },
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          {title: 'Cream', value: 'cream'},
          {title: 'Blue', value: 'blue'},
          {title: 'Pink', value: 'pink'},
          {title: 'Mint', value: 'mint'},
          {title: 'Lavender', value: 'lavender'},
        ],
      },
    }),
    defineField({
      name: 'size',
      title: 'Size (for Works page)',
      type: 'string',
      options: {
        list: [
          {title: 'Small (1x1)', value: 'small'},
          {title: 'Wide (2x1)', value: 'wide'},
          {title: 'Tall (1x2)', value: 'tall'},
        ],
      },
      description: 'Card size on the Works page',
    }),
    defineField({
      name: 'order',
      title: 'Order (for Works page)',
      type: 'number',
      description: 'Display order on the Works page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
