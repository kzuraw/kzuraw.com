import { rssSchema } from "@astrojs/rss";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: rssSchema.extend({
    pubDate: z.coerce.date(),
  }),
});

export const collections = { blog };
