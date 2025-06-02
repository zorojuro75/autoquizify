// app/quiz/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { QuizQuestion } from "@/types";
import { useEffect, useState } from "react";
import { QuizViewer } from "@/components/QuizViewer";

export default function QuizPage() {
  const searchParams = useSearchParams();
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const raw = searchParams.get("questions");
    if (!raw) {
      setError("No quiz data found.");
      return;
    }

    try {
      const decoded = decodeURIComponent(raw);
      const parsed: QuizQuestion[] = JSON.parse(decoded);
      setQuiz(parsed);
    } catch (err) {
      console.error("❌ Failed to parse quiz from URL", err);
      setError("Invalid quiz data.");
    }
  }, [searchParams]);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (!quiz) {
    return <div className="text-gray-500 p-4">Loading quiz...</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quiz</h1>
      <QuizViewer questions={quiz} />
    </div>
  );
}
