import {defineType, defineField} from 'sanity'

export const cardSchema = defineType({
  name: 'card',
  title: 'Card',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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
          {title: 'Empty', value: 'empty'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Spotify', value: 'spotify'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'Project Link', value: 'project-link'},
          {title: 'Ephesus', value: 'ephesus'},
          {title: 'VSCO', value: 'vsco'},
          {title: 'Contact', value: 'contact'},
        ],
      },
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      options: {
        list: [
          {title: 'Small (1x1)', value: 'small'},
          {title: 'Wide (2x1)', value: 'wide'},
          {title: 'Tall (1x2)', value: 'tall'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    // Spotify Data
    defineField({
      name: 'spotifyData',
      title: 'Spotify Data',
      type: 'object',
      hidden: ({document}) => document?.type !== 'spotify',
      fields: [
        {name: 'song', type: 'string', title: 'Song'},
        {name: 'artist', type: 'string', title: 'Artist'},
        {name: 'status', type: 'string', title: 'Status'},
      ],
    }),
    // Instagram Data
    defineField({
      name: 'instagramData',
      title: 'Instagram Data',
      type: 'object',
      hidden: ({document}) => document?.type !== 'instagram',
      fields: [
        {name: 'handle', type: 'string', title: 'Handle'},
        {name: 'link', type: 'url', title: 'Link'},
      ],
    }),
    // VSCO Data
    defineField({
      name: 'vscoData',
      title: 'VSCO Data',
      type: 'object',
      hidden: ({document}) => document?.type !== 'vsco',
      fields: [
        {name: 'handle', type: 'string', title: 'Handle'},
        {name: 'link', type: 'url', title: 'Link'},
      ],
    }),
    // Hover Images
    defineField({
      name: 'hoverImages',
      title: 'Hover Images',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      id: 'id',
    },
    prepare({title, subtitle, id}) {
      return {
        title: title || id,
        subtitle: subtitle || 'Card',
      }
    },
  },
})
