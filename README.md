# AutoQuizify – Quiz Generator from Text using Gemini

AutoQuizify is a modern web application that enables users to effortlessly generate quizzes from text files using advanced AI (Gemini API). Built with Next.js (App Router), TypeScript, Tailwind CSS, and Shadcn UI, it provides an intuitive interface for educators, students, and content creators to create interactive quizzes in seconds.

## Features
- Upload `.txt` files for quiz generation
- Select quiz type: Multiple Choice Questions (MCQ) or Descriptive
- Utilizes Gemini API for AI-powered question generation
- Interactive quiz viewer for generated questions
- Responsive and clean UI with Shadcn components
- Error handling and loading indicators

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **AI Integration:** Gemini API

## Setup Instructions
1. **Clone the repository:**
   ```powershell
   git clone <your-repo-url>
   cd autoquizify
   ```
2. **Install dependencies:**
   ```powershell
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your Gemini API key and any other required variables:
     ```env
     NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
     ```
4. **Run the development server:**
   ```powershell
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Folder Structure (Brief)
```
app/            # Next.js app directory (routing, pages, layouts)
components/     # Reusable UI and feature components
  ui/           # Shadcn UI components
lib/            # Utility libraries (AI integration, utils etc.)
public/         # Static assets (images, icons)
types/          # TypeScript type definitions
```

## How to Run Locally
1. Follow the setup instructions above.
2. Access the app at [http://localhost:3000](http://localhost:3000).
3. Upload a `.txt` file, select the quiz type, and generate your quiz!

## Future Improvements
- Support for direct PDF uploads and parsing
- Export quizzes to PDF or CSV
- User authentication and quiz history
- More quiz types and customization options
- Enhanced error messages and validation

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
