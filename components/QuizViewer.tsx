import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, FileText } from "lucide-react";
import { QuizQuestion, MCQQuestion, DescriptiveQuestion } from "@/types";

interface QuizViewerProps {
  questions: QuizQuestion[];
}

export function QuizViewer({ questions }: QuizViewerProps) {
  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 rounded-lg border border-dashed border-muted-foreground/50">
        <FileText className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-lg text-muted-foreground">No questions generated yet</p>
        <p className="text-sm text-muted-foreground mt-2">
          Upload a document and generate your quiz
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <Card key={index} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center">
                {index + 1}
              </span>
              <span>{question.question}</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {question.type === "mcq" ? (
              <div className="space-y-4">
                <RadioGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(question as MCQQuestion).options.map((option, optIndex) => (
                    <div 
                      key={optIndex}
                      className={`flex items-center space-x-3 rounded-md border p-4 transition-colors ${
                        option === (question as MCQQuestion).answer
                          ? "bg-green-50 border-green-300"
                          : "bg-muted/50 border-muted"
                      }`}
                    >
                      <div className="flex-1 space-y-1">
                        <Label htmlFor={`option-${index}-${optIndex}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                      {option === (question as MCQQuestion).answer && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="mt-4 flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Correct answer: {(question as MCQQuestion).answer}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-lg p-4 border border-muted">
                  <h3 className="font-medium text-muted-foreground mb-2">Answer:</h3>
                  <p className="whitespace-pre-line">{(question as DescriptiveQuestion).answer}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}