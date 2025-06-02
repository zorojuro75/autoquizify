// lib/gemini.ts
import { QuizQuestion } from "@/types";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function generateQuiz(
  content: string,
  type: "mcq" | "descriptive"
): Promise<QuizQuestion[]> {
  if (!GEMINI_API_KEY) throw new Error("Gemini API key not configured");

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: createPrompt(content, type)
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("No content returned from Gemini");

    return parseResponse(text, type);
  } catch (error) {
    console.error("Gemini quiz generation failed:", error);
    throw new Error("Failed to generate quiz. Please try again later.");
  }
}

function createPrompt(content: string, type: "mcq" | "descriptive"): string {
  return `Create a quiz based on the following text:

${content}

INSTRUCTIONS:
- Generate 5 ${type === "mcq" ? "multiple choice" : "descriptive"} questions
- Return ONLY a JSON object with a "questions" array
- ${type === "mcq"
    ? 'Each question format: { "question": "", "options": ["", "", "", ""], "answer": "" }'
    : 'Each question format: { "question": "", "answer": "" }'}
- Questions should cover key points from the content

RESPONSE JSON ONLY:
{
  "questions": [...]
}`;
}

function parseResponse(text: string, type: "mcq" | "descriptive"): QuizQuestion[] {
  try {
    // Remove ```json and ``` if present
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // Support both wrapped and unwrapped formats
    const questions = Array.isArray(parsed)
      ? parsed
      : parsed.questions;

    if (!questions || !Array.isArray(questions)) {
      throw new Error("Quiz data not found");
    }

    return questions.map((q: any) => {
      if (type === "mcq") {
        return {
          type: "mcq",
          question: q.question?.trim() || "",
          options: (q.options || []).map((opt: string) => opt.trim()),
          answer: q.answer?.trim() || ""
        };
      } else {
        return {
          type: "descriptive",
          question: q.question?.trim() || "",
          answer: q.answer?.trim() || ""
        };
      }
    });
  } catch (error) {
    console.error("❌ Failed to parse Gemini response:", error, "\nRaw Gemini Text:", text);
    throw new Error("Quiz data not found");
  }
}


