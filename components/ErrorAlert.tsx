import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorAlertProps {
  message: string;
  className?: string;
  onRetry?: () => void;
}

export function ErrorAlert({ 
  message, 
  className = "",
  onRetry 
}: ErrorAlertProps) {
  return (
    <Alert 
      variant="destructive"
      className={`border-red-500 bg-red-50 dark:bg-red-900/20 ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
        <div className="flex-1">
          <AlertTitle className="text-red-800 dark:text-red-200 font-medium">
            Error
          </AlertTitle>
          <AlertDescription className="text-red-700 dark:text-red-300">
            {message}
          </AlertDescription>
        </div>
        
        {onRetry && (
          <Button 
            variant="outline" 
            size="sm"
            className="text-red-700 border-red-300 bg-white hover:bg-red-100"
            onClick={onRetry}
          >
            Retry
          </Button>
        )}
      </div>
    </Alert>
  );
}