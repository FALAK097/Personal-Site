import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_PATH = path.join(process.cwd(), "src/content/blog");

export async function getAllPosts() {
  const files = fs.readdirSync(POSTS_PATH);

  const posts = files
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, fileName), "utf8");
      const { data: frontMatter, content } = matter(source);
      const slug = fileName.replace(/\.mdx?$/, "");

      return {
        ...frontMatter,
        slug,
        readingTime: Math.ceil(readingTime(content).minutes),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getPostBySlug(slug) {
  const source = fs.readFileSync(path.join(POSTS_PATH, `${slug}.mdx`), "utf8");
  const { data: frontMatter, content } = matter(source);

  return {
    ...frontMatter,
    slug,
    content,
    readingTime: Math.ceil(readingTime(content).minutes),
  };
}
