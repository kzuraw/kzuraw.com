import { getBlogPosts } from "@/lib/collections";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const mostRecentPosts = await getBlogPosts(3);

  if (!context.site) {
    throw new Error("Site not found in context - set in astro.config.ts");
  }

  return rss({
    title: "kzuraw.com",
    description: "Website about TypeScript, React and all things fullstack.",
    site: context.site,
    trailingSlash: false,
    items: mostRecentPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: post.urlPath,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: "/rss/styles.xsl",
  });
};
