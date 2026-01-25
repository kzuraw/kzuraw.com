import { getCollection } from "astro:content";

export const getBlogPosts = async (limit?: number) => {
  const posts = (await getCollection("blog"))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map((post) => ({ ...post, urlPath: `/blog/${post.slug}` }));
  return limit ? posts.slice(0, limit) : posts;
};
