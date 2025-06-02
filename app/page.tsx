"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "@/components/FileUpload";
import { QuizTypeSelector } from "@/components/QuizTypeSelector";
import { GenerateButton } from "@/components/GenerateButton";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorAlert } from "@/components/ErrorAlert";
import { generateQuiz } from "@/lib/gemini";

export default function Home() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [quizType, setQuizType] = useState<"mcq" | "descriptive">("mcq");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextExtracted = (content: string) => {
    setText(content);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError("Please provide content first");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const questions = await generateQuiz(text, quizType);
      
      // Redirect to quiz page with results
      router.push(`/quiz?type=${quizType}&questions=${encodeURIComponent(JSON.stringify(questions))}`);
    } catch (err: any) {
      setError(err.message || "Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Auto<span className="text-primary">Quiz</span>ify
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform text content into interactive quizzes with AI
          </p>
        </header>

        <div className="space-y-8">
          <FileUpload onTextExtracted={handleTextExtracted} />
          
          {text && (
            <>
              <QuizTypeSelector 
                onChange={setQuizType} 
                defaultValue={quizType} 
              />
              
              <GenerateButton 
                onGenerate={handleGenerate}
                loading={loading}
                text={text}
              />
            </>
          )}
          
          {loading && (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          )}
          
          {error && (
            <ErrorAlert message={error} />
          )}
        </div>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Upload a text file or paste content directly to generate quizzes</p>
        </footer>
      </div>
    </div>
  );
}