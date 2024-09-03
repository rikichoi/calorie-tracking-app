import { OpenAIEmbeddings } from "@langchain/openai";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { DataAPIClient } from "@datastax/astra-db-ts";

const endpoint = process.env.ASTRA_DB_ENDPOINT || "";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "";
const collection = process.env.ASTRA_DB_COLLECTION || "";


if (!token || !endpoint || !collection) {
  throw new Error(
    "Please set ASTRA_DB_ENDPOINT, ASTRA_DB_APPLICATION_TOKEN, and ASTRA_DB_COLLECTION environment variables."
  );
}

export  async function getVectorStore() {
  return AstraDBVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ modelName: "text-embedding-3-small" }),
    {
      endpoint,
      token,
      collection,
      collectionOptions: {
        vector: {
          dimension: 1536,
          metric: "cosine",
        },
      },
    }
  );
}

export  async function getEmbeddingsCollection() {
  const client = new DataAPIClient(token);
  const db = client.db(endpoint);

  return db.collection(collection);
}
