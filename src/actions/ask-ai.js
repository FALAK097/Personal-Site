"use server";

import { OpenAI } from "openai";
import { aiContext } from "@/lib/ai-context";

export async function askFalakAI(question) {
  const prompt = `
Context:
${aiContext}

User Question:
${question}

Answer:
`;

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 500,
  });

  const answer =
    completion.choices[0].message.content?.trim() ??
    "Sorry, I don't know the answer to that.";

  return answer;
}
