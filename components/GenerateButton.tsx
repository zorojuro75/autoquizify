import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onGenerate: () => void;
  loading: boolean;
  text: string;
}

export function GenerateButton({
  onGenerate,
  loading,
  text,
}: GenerateButtonProps) {
  const isDisabled = loading || text.length === 0;
  
  return (
    <div className="w-full max-w-2xl mt-6">
      <Button
        onClick={onGenerate}
        disabled={isDisabled}
        size="lg"
        className="w-full py-6 text-lg font-semibold transition-all"
        aria-busy={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Generating Quiz...
          </>
        ) : (
          "Generate Quiz"
        )}
      </Button>
      
      {text.length === 0 && !loading && (
        <p className="mt-2 text-sm text-muted-foreground text-center">
          Please upload a document first
        </p>
      )}
    </div>
  );
}