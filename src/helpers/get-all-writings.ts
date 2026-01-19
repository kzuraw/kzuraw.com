import { getCollection } from "astro:content";
import { sortWritingsByDate } from "./sort-writings-by-date";

export const getAllWritings = async () => {
  const posts = await getCollection("writing");
  return posts.sort(sortWritingsByDate);
};
