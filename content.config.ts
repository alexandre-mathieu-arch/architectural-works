import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        images: z.array(z.string()).optional(),
        date: z.date().or(z.string()).optional(),
        tags: z.array(z.string()).optional(),
        gallery: z.array(z.string()).optional(),
        draft: z.boolean().optional(),
        typologies: z.array(z.string()).optional(),
        tailles: z.array(z.string()).optional(),
        pays: z.array(z.string()).optional(),
      })
    }),
  },
})
