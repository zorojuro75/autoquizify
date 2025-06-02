// types/index.ts
export type QuizQuestion = MCQQuestion | DescriptiveQuestion;

export interface BaseQuestion {
  type: string;
  question: string;
}

export interface MCQQuestion extends BaseQuestion {
  type: "mcq";
  options: string[];
  answer: string;
}

export interface DescriptiveQuestion extends BaseQuestion {
  type: "descriptive";
  answer: string;
}