import dotenv from 'dotenv';
dotenv.config();

import { Pinecone } from "@pinecone-database/pinecone";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { NextResponse } from "next/server";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});
// console.log("Pincone Api" , pinecone)
export async function POST(req: Request) {
  try {

    const formData = await req.formData();
    const file = formData.get("file") as File;
    // console.log("Formdat" , file)

    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    //Generate a document id
    const documentId = crypto.randomUUID();

    //convert file to blob
    const blob = new Blob([await file.arrayBuffer()], { type: file.type });
    // console.log("Binary File", blob);

    // Load and parse PDF
    const loader = new PDFLoader(blob);
    const docs = await loader.load();
    // console.log("Docs" , docs) ;

    // Split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(docs);

    // Add documentId to metadata of each chunk
    const docsWithMetadata = splitDocs.map((doc) => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        documentId,
      },
    }));
    // console.log("text" , docsWithMetadata);

    // Generate summary
    const openai = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY!,
    });


    const summary = await Promise.all(
      splitDocs.map(async (doc) => {
        const summar = await openai.invoke(
          `Summarize the following document: ${doc.pageContent}`
        );
        return summar;
      })
    );
    // console.log("Summarizes" , summary)

    // Store in Pinecone with metadata
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY!,
    });

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

    await PineconeStore.fromDocuments(docsWithMetadata, embeddings, {
      pineconeIndex: index,
    });
   
    return NextResponse.json({
      summary,
      documentId,
      pageCount: docs.length,
    });

  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error(errorMessage);
    return new Response(errorMessage, { status: 500 });
  }
}