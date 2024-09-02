import "dotenv/config";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import {getEmbeddingsCollection} from "../src/lib/astradb.mjs";
import {getVectorStore} from "../src/lib/astradb.mjs";

async function generateEmbeddings() {
  const vectorStore = await getVectorStore();

  (await getEmbeddingsCollection()).deleteMany({});

  // const gripsetPDFPath = "src/data/Gripset_38FC_Technical_Data_Sheet.pdf";

  const gripsetPDFPath = "src/data/";

  const directoryLoader = new DirectoryLoader(gripsetPDFPath, {
    ".pdf": (path) => new PDFLoader(path),
  });

  const directoryDocs = await (
    await directoryLoader.load()
  ).map((doc) => {
    const url = doc.metadata.source;
    return {
      pageContent: doc.pageContent,
      metadata: { url },
    };
  });

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const splitDocs = await textSplitter.splitDocuments(directoryDocs);

  console.log(splitDocs);
  await vectorStore.addDocuments(splitDocs);
}
generateEmbeddings();

// const normalLoader = new PDFLoader(gripsetPDFPath);

// const noExtraSpacesLoader = new PDFLoader(gripsetPDFPath, {
//   parsedItemSeparator: "",
// });

// const singleDocPerFileLoader = new PDFLoader(gripsetPDFPath, {
//   splitPages: false,
// });

// const singleDoc = await singleDocPerFileLoader.load();
// console.log(singleDoc[0].pageContent.slice(0, 100));

// const docs = await normalLoader.load();

// console.log(docs)
// console.log(docs[0]);
// console.log(parse(docs));
// console.log({ docs });
