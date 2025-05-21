import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

function calculateReadingTime(content) {
  const wordsPerMinute = 225;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function getAllPosts() {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".mdx"));
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      ...data,
      slug,
      content,
      readingTime: calculateReadingTime(content),
    };
  });
  // Sort by date only
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    ...data,
    slug,
    content,
    readingTime: calculateReadingTime(content),
  };
}
