// lib/pdfParser.ts
let pdfjs: any;

if (typeof window !== "undefined") {
  pdfjs = await import("pdfjs-dist");
}

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // Set worker path dynamically
    if (typeof window !== "undefined") {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    }

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument(arrayBuffer).promise;
    let fullText = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      fullText += textContent.items
        .map((item) => (item as any).str)
        .join(" ") 
        + "\n\n";
    }
    
    return fullText.trim();
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw new Error("Failed to extract text from PDF. The file might be corrupted or encrypted.");
  }
}