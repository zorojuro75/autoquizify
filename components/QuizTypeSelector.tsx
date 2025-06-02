import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LayoutList, FileText } from "lucide-react";

interface QuizTypeSelectorProps {
  onChange: (type: "mcq" | "descriptive") => void;
  defaultValue?: "mcq" | "descriptive";
}

export function QuizTypeSelector({
  onChange,
  defaultValue = "mcq",
}: QuizTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState(defaultValue);

  const handleChange = (value: string) => {
    const type = value as "mcq" | "descriptive";
    setSelectedType(type);
    onChange(type);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutList className="w-5 h-5" />
          Quiz Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          defaultValue={defaultValue}
          value={selectedType}
          onValueChange={handleChange}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <RadioGroupItem
              value="mcq"
              id="mcq"
              className="peer sr-only"
            />
            <Label
              htmlFor="mcq"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
                <span className="font-medium">Multiple Choice (MCQ)</span>
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Questions with multiple answer options
              </p>
            </Label>
          </div>
          
          <div>
            <RadioGroupItem
              value="descriptive"
              id="descriptive"
              className="peer sr-only"
            />
            <Label
              htmlFor="descriptive"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center">
                  <FileText className="w-3 h-3 text-yellow-500" />
                </div>
                <span className="font-medium">Descriptive</span>
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Open-ended questions requiring written answers
              </p>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}