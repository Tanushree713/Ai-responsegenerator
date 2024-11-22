# Get Started 

This project is a PDF Uploader and AI-powered Response Generator that enables users to upload PDFs, extract their content, and generate AI-powered responses or summaries based on the text from the uploaded documents.

# Features
* PDF Upload: Upload PDFs and extract text content.
* AI Response Generation: Use an AI model to generate responses or summaries based on the content of the uploaded PDF.
* Frontend Interface: A user-friendly interface for interacting with the application.
* Backend: A server that handles PDF uploading, text extraction, and communication with the AI model.
Technologies Used
* Frontend: Next.js, TailwindCSS
* Backend: Node.js with Express, Python for AI response generation
* AI: OpenAI API (GPT-3/4)
* PDF Parsing: pdf-parse (Node.js package for PDF text extraction)
* Database: pinecone db 

# Installation

Prerequisites
Node.js (>= 14.0.0)
Python (>= 3.6)
Access to OpenAI API or equivalent AI service
* Step 1: Clone the Repository

bash
```
git clone https://github.com/Tanushree713/Ai-responsegenerator.git
```
cd ai-documents

* Step 2: Backend Setup
Navigate to the server directory:
bash
```
cd server

```
# Install required dependencies:
bash

```
npm install 
or
pnpm install
```
Set up the .env file for OpenAI API keys or other environment variables as needed.

Start the server:
bash
```
npm run dev
or
pnpm dev

```


Go to Browser --
Running at http://localhost:3000



* Step 5: Upload PDF and Generate AI Responses

Upload a PDF file through the user interface.
The AI will process the content and generate a response or summary based on the text in the document.

API Endpoints
POST /upload
Description: Endpoint for uploading PDF files.

Request:
file: The PDF file to upload (multipart/form-data).

Response:
Returns the extracted text from the PDF.
POST /generate-response
Description: Endpoint for generating AI responses based on the extracted PDF content.
Request:
text: The extracted text from the uploaded PDF.

-- questions:
start asking questions.
-- Response:
AI-generated response or summary.


Contributing
Contributions are welcome! Please follow these steps to contribute:

# Fork the repository.
Create a new branch.
Make your changes and ensure they are well-tested.
Submit a pull request.

# License
This project is licensed under the MIT License - see the LICENSE file for details.

This README template includes installation instructions, a basic feature list, and API documentation for the PDF upload and AI response generation functionalities. Adjust the sections based on your project's specific details and dependencies.


