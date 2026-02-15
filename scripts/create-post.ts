import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createInterface } from "node:readline/promises";

const rl = createInterface({ input: process.stdin, output: process.stdout });
const title = await rl.question("Post title: ");
rl.close();

if (!title.trim()) {
  console.error("Title cannot be empty");
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

const projectDir = resolve(import.meta.dirname, "..");

const now = new Date();

const filePath = resolve(
  projectDir,
  `src/content/blog/${now.toISOString().split("T")[0]}-${slug}.md`,
);

const content = `---
title: ${title}
description:
pubDate: ${now.toISOString()}
slug: ${now.getFullYear()}/${slug}
---
`;

writeFileSync(filePath, content);
execSync(`code ${filePath}`);
console.log("Blog post created");
