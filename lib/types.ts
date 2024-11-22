export interface DocumentMetadata {
    id: string;
    filename: string;
    summary: string;
    pageCount: number;
    fileSize: number;
  }
  
  export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    documentId: string;
  }
  