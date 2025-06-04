// app/quiz/layout.tsx
import { Suspense } from "react";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading quiz...</div>}>
      {children}
    </Suspense>
  );
}
