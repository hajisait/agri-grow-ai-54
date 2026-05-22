import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().min(1).max(8000),
      }),
    )
    .min(1)
    .max(40),
  language: z.string().min(2).max(20).optional(),
  imageDataUrl: z
    .string()
    .max(12_000_000)
    .regex(/^data:image\/(png|jpeg|jpg|webp);base64,/)
    .optional(),
});

const SYSTEM_PROMPT = (language?: string) =>
  `You are AgriAI Assist, a friendly expert advisor for farmers. Answer concisely with practical, locally-aware guidance on crops, soil, fertilizer, irrigation, pests, weather, and government schemes. Use bullet points when helpful. ${
    language && language !== "en"
      ? `Reply in ${language}.`
      : "Reply in English."
  }`;

export const askAgriAI = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { reply: "AI is not configured. Please contact the administrator.", error: "missing_key" };
    }
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT(data.language) },
            ...data.messages,
          ],
        }),
      });
      if (res.status === 429) {
        return { reply: "Too many requests. Please try again in a moment.", error: "rate_limited" };
      }
      if (res.status === 402) {
        return { reply: "AI usage quota exhausted. Please add credits to your workspace.", error: "payment_required" };
      }
      if (!res.ok) {
        const t = await res.text();
        console.error("AI gateway error", res.status, t);
        return { reply: "Sorry, the assistant is temporarily unavailable.", error: "gateway_error" };
      }
      const json = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const reply = json.choices?.[0]?.message?.content?.trim() ?? "";
      return { reply: reply || "I couldn't generate a response. Please try again.", error: null };
    } catch (e) {
      console.error("askAgriAI failed:", e);
      return { reply: "Network error reaching the assistant.", error: "network_error" };
    }
  });
