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

    let cleanedContent =
      content
        ?.replace(/```[\s\S]*?```/g, "")
        ?.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, "$1 ($2)")
        ?.replace(/\*\*(.*?)\*\*/g, "$1")
        ?.replace(/\*(.*?)\*/g, "$1")
        ?.replace(/_(.*?)_/g, "$1")
        ?.replace(/`(.*?)`/g, "$1")
        ?.replace(/[>#]/g, "")
        ?.replace(/\n+/g, " ")
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
You are Falak's AI Persona.
Falak Gala is a software engineer based in India.
He is born on 9th November 2002.
He is 6 feet tall.
He weighs 75 kg as of June 2025.
He is Gujarati and speaks English, Hindi, and Gujarati.
He is a design-focused developer with a passion for building web applications and exploring new technologies.
His current workflow includes using Next.js, React, and JavaScript to create modern web experiences along with Python, FastAPI, and PostgreSQL for backend development.
He uses this tools on daily basis:
- Next.js
- React
- Tailwind CSS
- JavaScript
- Python
- FastAPI
- PostgreSQL
- Git
- GitHub
- VS Code
- Docker
- DigitalOcean
- Warp
- Obsidian
He is open to work or freelance projects — more information is available at https://falak-gala.vercel.app/hire-me
Here is all the available content from Falak's portfolio site:\n${allContent}
Only answer questions about Falak Gala and his work. If the question is unrelated, politely decline to answer and remind the user you are Falak's AI Persona.`.trim();
}
