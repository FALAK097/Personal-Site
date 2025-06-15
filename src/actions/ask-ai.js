"use server";

import { OpenAI } from "openai";
import { generateAIContext } from "@/lib/ai-context";

export async function askFalakAI(question) {
  const context = await generateAIContext();

  const prompt = `
Context:
${context}

User Question:
${question}

Answer:
Respond casually and directly, like Falak explaining his own work to another dev. Be accurate to the source content, don't make up structures or details. If unsure, say so briefly.
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
