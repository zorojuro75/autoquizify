// lib/gemini.ts
import { QuizQuestion } from "@/types";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: createPrompt(content, type),
              },
            ],
          },
        ],
      }),
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
  return `You are an AI assistant specialized in creating high-quality quizzes for learning assessment.

Your task is to read the content provided below and generate a quiz with exactly 5 questions that assess the reader’s understanding of the material.

------------------------
CONTENT:
"${content}"
------------------------

INSTRUCTIONS:
1. Identify the key concepts, facts, or ideas from the content.
2. Based on those, generate 5 unique and meaningful ${
    type === "mcq" ? "multiple-choice" : "descriptive"
  } questions.
3. Ensure questions are non-repetitive, relevant, and well-structured.
4. Keep the language simple, clear, and grammatically correct.
5. Do not add any external information not present in the content.
6. The final response must be a valid, parsable JSON object.
7. Do not include any explanations, notes, comments, or markdown (e.g., no triple backticks).

FORMAT SPECIFICATIONS:

Return the result in the following JSON format **exactly**:

{
  "questions": [
    ${
      type === "mcq"
        ? `{
      "question": "Your question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct Option (must exactly match one of the options)"
    }`
        : `{
      "question": "Your question text here?",
      "answer": "Accurate and concise answer"
    }`
    }
    // ...total 5 such question objects
  ]
}

ADDITIONAL RULES:
- For MCQ:
  - Provide exactly 4 options per question.
  - Only one correct answer per question.
  - Avoid vague or misleading distractors.
- For Descriptive:
  - The answer should be 1–3 sentences long, directly based on the content.
  - Avoid generic or overly broad questions.
- Do not generate questions outside the context of the provided content.
- Do not include introductory or closing remarks.
- Do not wrap your response in any markdown or quotation marks.

✅ OUTPUT EXAMPLE (strictly follow this style):

${
  type === "mcq"
    ? `{
  "questions": [
    {
      "question": "What is the capital city of France?",
      "options": ["Paris", "Berlin", "Madrid", "Rome"],
      "answer": "Paris"
    },
    ...
  ]
}`
    : `{
  "questions": [
    {
      "question": "Explain the importance of photosynthesis in plant biology.",
      "answer": "Photosynthesis allows plants to convert light into energy, producing glucose and oxygen essential for survival."
    },
    ...
  ]
}`
}

Now, based on the above instructions and format, generate a quiz from the given content.`;
}

function parseResponse(
  text: string,
  type: "mcq" | "descriptive"
): QuizQuestion[] {
  try {
    // Remove ```json and ``` if present
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // Support both wrapped and unwrapped formats
    const questions = Array.isArray(parsed) ? parsed : parsed.questions;

    if (!questions || !Array.isArray(questions)) {
      throw new Error("Quiz data not found");
    }

    return questions.map((q: any) => {
      if (type === "mcq") {
        return {
          type: "mcq",
          question: q.question?.trim() || "",
          options: (q.options || []).map((opt: string) => opt.trim()),
          answer: q.answer?.trim() || "",
        };
      } else {
        return {
          type: "descriptive",
          question: q.question?.trim() || "",
          answer: q.answer?.trim() || "",
        };
      }
    });
  } catch (error) {
    console.error(
      "❌ Failed to parse Gemini response:",
      error,
      "\nRaw Gemini Text:",
      text
    );
    throw new Error("Quiz data not found");
  }
}
