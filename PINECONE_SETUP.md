# Pinecone Setup Guide

This guide will help you get started with Pinecone vector database integration in your ZeroRender project.

## Prerequisites

1. **Pinecone Account**: Sign up for a free account at [https://www.pinecone.io/](https://www.pinecone.io/)
2. **API Key**: Get your API key from the Pinecone console

## Environment Variables

Add the following environment variables to your `.env.local` file (or your deployment platform's environment variables):

```bash
# Required
PINECONE_API_KEY=your-pinecone-api-key-here

# Optional (with defaults)
PINECONE_INDEX_DIMENSION=1536  # Default dimension for OpenAI embeddings
```

### Getting Your API Key

1. Log in to [Pinecone Console](https://app.pinecone.io/)
2. Navigate to **API Keys** section
3. Copy your API key
4. Add it to your environment variables

## Usage

### 1. Query Vectors (Search)

```typescript
// POST /api/pinecone/query
const response = await fetch('/api/pinecone/query', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    indexName: 'my-index',
    queryVector: [0.1, 0.2, 0.3, ...], // Your query vector
    topK: 5, // Number of results to return
    filter: { category: 'blog' } // Optional metadata filter
  })
})

const { matches } = await response.json()
```

### 2. Upsert Vectors (Add/Update)

```typescript
// POST /api/pinecone/upsert
const response = await fetch('/api/pinecone/upsert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    indexName: 'my-index',
    vectors: [
      {
        id: 'vector-1',
        values: [0.1, 0.2, 0.3, ...], // Your vector values
        metadata: { title: 'Blog Post', category: 'blog' } // Optional metadata
      }
    ]
  })
})
```

### 3. Delete Vectors

```typescript
// POST /api/pinecone/delete
const response = await fetch('/api/pinecone/delete', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    indexName: 'my-index',
    ids: ['vector-1', 'vector-2'] // Array of vector IDs to delete
  })
})
```

## Direct Usage in Server Components

You can also use the Pinecone utilities directly in your server-side code:

```typescript
import { queryVectors, upsertVectors } from '@/lib/pinecone'

// In a server component or API route
const results = await queryVectors('my-index', queryVector, 5)
const upsertResult = await upsertVectors('my-index', vectors)
```

## Common Use Cases

### 1. Semantic Search for Blog Posts

```typescript
// Generate embeddings for your blog posts
// Then store them in Pinecone
await upsertVectors('blog-index', [
  {
    id: 'post-1',
    values: embeddingVector,
    metadata: {
      title: 'My Blog Post',
      slug: 'my-blog-post',
      publishedAt: '2024-01-01'
    }
  }
])

// Search for similar posts
const results = await queryVectors('blog-index', userQueryVector, 5)
```

### 2. RAG (Retrieval Augmented Generation)

1. Generate embeddings for your documents
2. Store them in Pinecone with metadata
3. When a user asks a question:
   - Generate an embedding for the question
   - Query Pinecone for similar documents
   - Use the retrieved documents as context for your LLM

## Index Configuration

When you first use an index, it will be automatically created with these defaults:
- **Dimension**: 1536 (OpenAI embeddings) - configurable via `PINECONE_INDEX_DIMENSION`
- **Metric**: Cosine similarity
- **Cloud**: AWS
- **Region**: us-east-1

To customize, modify the `getPineconeIndex` function in `lib/pinecone.ts`.

## Next Steps

1. Set up your Pinecone API key
2. Generate embeddings for your content (using OpenAI, Cohere, or other embedding models)
3. Store embeddings in Pinecone
4. Build search or RAG features using the query API

## Resources

- [Pinecone Documentation](https://docs.pinecone.io/)
- [Pinecone JavaScript SDK](https://github.com/pinecone-io/pinecone-js-client)
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)



