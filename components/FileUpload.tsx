// components/FileUpload.tsx
import { useCallback, useState, ChangeEvent } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UploadCloud, FileText, Text } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

interface FileUploadProps {
  onTextExtracted: (content: string) => void;
}

export function FileUpload({ onTextExtracted }: FileUploadProps) {
  const [textInput, setTextInput] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"file" | "text">("file");

  const parseTxt = (file: File) => {
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onTextExtracted(content);
      setFileName(file.name);
      setTextInput(content); // Sync with text area
    };
    reader.onerror = () => setError("Failed to read text file");
    reader.readAsText(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    parseTxt(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
    },
    maxFiles: 1,
  });

  const handleTextSubmit = () => {
    if (textInput.trim().length === 0) {
      setError("Please enter some text");
      return;
    }
    onTextExtracted(textInput);
    setFileName("Manual Input");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UploadCloud className="w-5 h-5" />
          Input Content
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex border-b mb-4">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "file"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("file")}
          >
            Upload File
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === "text"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("text")}
          >
            Enter Text
          </button>
        </div>

        {activeTab === "file" ? (
          <div>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-primary bg-primary/10" : "border-muted"
              }`}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-3">
                <FileText className="w-10 h-10 text-muted-foreground" />
                {isDragActive ? (
                  <p className="font-medium">Drop the text file here...</p>
                ) : (
                  <>
                    <p className="font-medium">Drag & drop a .txt file here</p>
                    <p className="text-sm text-muted-foreground">or</p>
                    <Button variant="outline">Select File</Button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="file-upload" className="block mb-2">
                Or select file manually:
              </Label>
              <input
                id="file-upload"
                type="file"
                accept=".txt"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) parseTxt(file);
                }}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-primary-foreground
                  hover:file:bg-primary/90"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste your text content here..."
              rows={8}
              className="min-h-[200px]"
            />
            <Button onClick={handleTextSubmit} className="w-full">
              Use This Text
            </Button>
          </div>
        )}

        {fileName && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Text className="w-4 h-4" />
            <span className="truncate">{fileName}</span>
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-destructive font-medium">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}