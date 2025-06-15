import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DATA_DIR = path.join(process.cwd(), "src/data");

function getAllMarkdownFiles() {
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const fullPath = path.join(DATA_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    const cleanedContent =
      content
        ?.replace(/```[\s\S]*?```/g, "")
        ?.replace(/[#*_>`-]/g, "")
        ?.replace(/\n/g, " ")
        ?.slice(0, 10000) || "No content.";

    return {
      title: data.title || file.replace(".md", ""),
      url: data.url || "",
      content: cleanedContent,
    };
  });
}

export async function generateAIContext() {
  const markdownFiles = getAllMarkdownFiles();

  const allContent = markdownFiles
    .map(
      (entry) =>
        `• ${entry.title}\nContent Excerpt:\n${entry.content}\nURL: ${entry.url}`
    )
    .join("\n\n");

  return `
Falak Gala is a software engineer based in India.
He is open to work or freelance projects — more information is available at https://falak-gala.vercel.app/hire-me.

Here is all the available content from Falak's portfolio site:\n${allContent}

Only answer questions about Falak Gala and his work.
If the question is unrelated, politely decline to answer.
`.trim();
}
