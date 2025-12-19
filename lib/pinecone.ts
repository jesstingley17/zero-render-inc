import { Pinecone } from "@pinecone-database/pinecone"

// Initialize Pinecone client
export function getPineconeClient() {
  const apiKey = process.env.PINECONE_API_KEY

  if (!apiKey) {
    throw new Error("PINECONE_API_KEY environment variable is not set")
  }

  return new Pinecone({
    apiKey,
  })
}

// Get or create an index
export async function getPineconeIndex(indexName: string) {
  const client = getPineconeClient()
  
  // Check if index exists, create if it doesn't
  const indexList = await client.listIndexes()
  const indexExists = indexList.indexes?.some((idx) => idx.name === indexName)

  if (!indexExists) {
    // Default dimension is 1536 (OpenAI embeddings) - adjust as needed
    const dimension = parseInt(process.env.PINECONE_INDEX_DIMENSION || "1536")
    
    await client.createIndex({
      name: indexName,
      dimension,
      metric: "cosine", // or "euclidean" or "dotproduct"
      spec: {
        serverless: {
          cloud: "aws", // or "gcp" or "azure"
          region: "us-east-1", // adjust to your preferred region
        },
      },
    })

    // Wait for index to be ready
    console.log(`Waiting for index ${indexName} to be ready...`)
    await new Promise((resolve) => setTimeout(resolve, 10000)) // Wait 10 seconds
  }

  return client.index(indexName)
}

// Helper function to upsert vectors
export async function upsertVectors(
  indexName: string,
  vectors: Array<{
    id: string
    values: number[]
    metadata?: Record<string, any>
  }>
) {
  const index = await getPineconeIndex(indexName)
  await index.upsert(vectors)
  return { success: true, count: vectors.length }
}

// Helper function to query vectors
export async function queryVectors(
  indexName: string,
  queryVector: number[],
  topK: number = 5,
  filter?: Record<string, any>
) {
  const index = await getPineconeIndex(indexName)
  const queryResponse = await index.query({
    vector: queryVector,
    topK,
    includeMetadata: true,
    ...(filter && { filter }),
  })
  return queryResponse
}

// Helper function to delete vectors
export async function deleteVectors(indexName: string, ids: string[]) {
  const index = await getPineconeIndex(indexName)
  await index.deleteMany(ids)
  return { success: true, count: ids.length }
}

