# Pinecone Agents & Use Cases Guide

This guide will help you plan and implement Pinecone-powered features for your ZeroRender project. After building sample apps, use this document to design and build your own use cases.

## Table of Contents

1. [Understanding Pinecone Agents](#understanding-pinecone-agents)
2. [Common Use Cases](#common-use-cases)
3. [Implementation Patterns](#implementation-patterns)
4. [Planning Your Use Case](#planning-your-use-case)
5. [Step-by-Step Implementation](#step-by-step-implementation)
6. [ZeroRender-Specific Use Cases](#zerorender-specific-use-cases)

## Understanding Pinecone Agents

Pinecone agents are intelligent systems that combine:
- **Vector Search**: Finding semantically similar content
- **LLM Integration**: Generating responses based on retrieved context
- **Metadata Filtering**: Narrowing results by specific criteria
- **RAG (Retrieval Augmented Generation)**: Enhancing LLM responses with relevant context

## Common Use Cases

### 1. Semantic Search
**What it does**: Find content based on meaning, not just keywords.

**Example**: User searches "how to build a website" and finds relevant blog posts, even if they don't contain those exact words.

### 2. RAG (Retrieval Augmented Generation)
**What it does**: Answer questions using your own knowledge base.

**Example**: Customer asks "What's included in the Starter Package?" and gets an accurate answer based on your actual package details.

### 3. Content Recommendations
**What it does**: Suggest similar content to users.

**Example**: After viewing a blog post about "AI chatbots", recommend related posts about automation and AI integration.

### 4. Intelligent FAQ
**What it does**: Answer questions by finding the most relevant FAQ entries.

**Example**: User asks "Do you offer revisions?" and the system finds the most relevant FAQ entry.

### 5. Document Q&A
**What it does**: Answer questions about specific documents or content.

**Example**: Ask questions about your service packages, pricing, or policies and get accurate answers.

## Implementation Patterns

### Pattern 1: Basic Semantic Search

```typescript
// 1. Generate embedding for user query
const queryEmbedding = await generateEmbedding(userQuery)

// 2. Search Pinecone
const results = await queryVectors('content-index', queryEmbedding, 5)

// 3. Return results
return results.matches.map(match => ({
  id: match.id,
  score: match.score,
  content: match.metadata
}))
```

### Pattern 2: RAG with LLM

```typescript
// 1. Generate embedding for question
const questionEmbedding = await generateEmbedding(question)

// 2. Retrieve relevant context
const context = await queryVectors('knowledge-base', questionEmbedding, 3)

// 3. Build prompt with context
const prompt = `
Context:
${context.matches.map(m => m.metadata.content).join('\n\n')}

Question: ${question}

Answer based on the context above:
`

// 4. Generate answer with LLM
const answer = await generateLLMResponse(prompt)
```

### Pattern 3: Filtered Search

```typescript
// Search with metadata filters
const results = await queryVectors(
  'blog-index',
  queryEmbedding,
  10,
  {
    category: 'design',
    published: true,
    date: { $gte: '2024-01-01' }
  }
)
```

## Planning Your Use Case

### Step 1: Define Your Goal
Ask yourself:
- What problem am I solving?
- What data do I need to search?
- What kind of queries will users make?

### Step 2: Identify Your Data Sources
Examples:
- Blog posts
- Service descriptions
- FAQ entries
- Documentation
- Customer inquiries

### Step 3: Choose Your Embedding Model
Options:
- **OpenAI**: `text-embedding-3-small` or `text-embedding-3-large`
- **Cohere**: `embed-english-v3.0`
- **Hugging Face**: Various models

### Step 4: Design Your Index Structure
Consider:
- **Dimension**: Match your embedding model (e.g., 1536 for OpenAI)
- **Metadata**: What filters do you need? (category, date, type, etc.)
- **Naming**: Clear, descriptive index names

### Step 5: Plan Your Workflow
1. How will data be indexed? (Batch, real-time, scheduled)
2. How will queries be processed? (API route, server component)
3. How will results be displayed? (Search results, chat interface, recommendations)

## Step-by-Step Implementation

### Example: Building a Blog Search Feature

#### Step 1: Create Indexing Script

```typescript
// scripts/index-blog-posts.ts
import { upsertVectors } from '@/lib/pinecone'
import { generateEmbedding } from '@/lib/embeddings' // You'll create this

async function indexBlogPosts() {
  // 1. Fetch blog posts from HubSpot
  const posts = await fetchBlogPosts()
  
  // 2. Generate embeddings for each post
  const vectors = await Promise.all(
    posts.map(async (post) => {
      const embedding = await generateEmbedding(
        `${post.title} ${post.content}`
      )
      
      return {
        id: `blog-${post.id}`,
        values: embedding,
        metadata: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          publishedAt: post.publishedAt,
          category: post.category,
        }
      }
    })
  )
  
  // 3. Upsert to Pinecone
  await upsertVectors('blog-index', vectors)
  console.log(`Indexed ${vectors.length} blog posts`)
}
```

#### Step 2: Create Embedding Utility

```typescript
// lib/embeddings.ts
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  })
  
  return response.data[0].embedding
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: texts,
  })
  
  return response.data.map(item => item.embedding)
}
```

#### Step 3: Create Search API Route

```typescript
// app/api/search/blog/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { queryVectors } from '@/lib/pinecone'
import { generateEmbedding } from '@/lib/embeddings'

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 5 } = await request.json()
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }
    
    // Generate embedding for query
    const queryEmbedding = await generateEmbedding(query)
    
    // Search Pinecone
    const results = await queryVectors(
      'blog-index',
      queryEmbedding,
      limit
    )
    
    // Format results
    const matches = results.matches.map(match => ({
      id: match.id,
      score: match.score,
      title: match.metadata?.title,
      slug: match.metadata?.slug,
      excerpt: match.metadata?.excerpt,
    }))
    
    return NextResponse.json({ matches })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
```

#### Step 4: Create Frontend Search Component

```typescript
// components/blog-search.tsx
'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export function BlogSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  
  const handleSearch = async () => {
    if (!query.trim()) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/search/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      })
      
      const data = await response.json()
      setResults(data.matches || [])
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search blog posts..."
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 bg-black text-white rounded"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((result) => (
            <a
              key={result.id}
              href={`/blog/${result.slug}`}
              className="block p-4 border rounded hover:bg-gray-50"
            >
              <h3 className="font-semibold">{result.title}</h3>
              <p className="text-sm text-gray-600">{result.excerpt}</p>
              <p className="text-xs text-gray-400 mt-1">
                Score: {result.score.toFixed(3)}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
```

## ZeroRender-Specific Use Cases

### Use Case 1: Service Package Recommendations

**Goal**: Help users find the right package based on their needs.

**Implementation**:
1. Index service packages with descriptions and features
2. Allow users to describe their needs
3. Find the most relevant packages
4. Display recommendations with explanations

**Index Structure**:
```typescript
{
  id: 'package-starter',
  values: embedding,
  metadata: {
    name: 'Starter Website',
    price: 999,
    features: ['1-3 pages', 'Domain setup', 'Mobile optimized'],
    category: 'website'
  }
}
```

### Use Case 2: Intelligent Contact Form Assistant

**Goal**: Pre-fill or suggest information based on user's inquiry.

**Implementation**:
1. Analyze user's message
2. Find similar past inquiries
3. Suggest relevant packages or solutions
4. Pre-fill form fields when possible

### Use Case 3: Blog Content Recommendations

**Goal**: Show related blog posts to increase engagement.

**Implementation**:
1. When viewing a blog post, generate embedding
2. Query Pinecone for similar posts
3. Display recommendations sidebar

### Use Case 4: FAQ Chatbot

**Goal**: Answer common questions automatically.

**Implementation**:
1. Index FAQ entries
2. Generate embeddings for questions and answers
3. When user asks a question:
   - Find most relevant FAQ entry
   - Return answer or use RAG for more detailed response

### Use Case 5: Portfolio/Project Search

**Goal**: Help clients find similar projects to what they want.

**Implementation**:
1. Index project descriptions and features
2. Allow clients to describe their vision
3. Show similar past projects as examples

## Advanced Patterns

### Pattern: Hybrid Search (Vector + Keyword)

```typescript
// Combine vector search with keyword matching
const vectorResults = await queryVectors(index, embedding, 10)
const keywordResults = await searchByKeywords(query)

// Merge and deduplicate results
const combined = mergeResults(vectorResults, keywordResults)
```

### Pattern: Multi-Index Search

```typescript
// Search across multiple indexes
const [blogResults, packageResults, faqResults] = await Promise.all([
  queryVectors('blog-index', embedding, 5),
  queryVectors('package-index', embedding, 3),
  queryVectors('faq-index', embedding, 3),
])

// Combine and rank
const allResults = [...blogResults.matches, ...packageResults.matches, ...faqResults.matches]
```

### Pattern: Reranking

```typescript
// Get more results than needed
const candidates = await queryVectors(index, embedding, 20)

// Rerank using additional signals
const reranked = candidates.matches
  .map(match => ({
    ...match,
    finalScore: match.score * 0.7 + (match.metadata.popularity || 0) * 0.3
  }))
  .sort((a, b) => b.finalScore - a.finalScore)
  .slice(0, 5)
```

## Best Practices

1. **Batch Operations**: When indexing, process in batches of 100-1000 vectors
2. **Error Handling**: Always handle API errors gracefully
3. **Caching**: Cache embeddings for frequently accessed content
4. **Monitoring**: Track query performance and result quality
5. **Testing**: Test with various query types and edge cases
6. **Metadata**: Store all searchable/filterable data in metadata
7. **Index Management**: Regularly clean up old or unused vectors

## Next Steps

1. **Choose your first use case** from the ZeroRender-specific examples
2. **Set up your embedding model** (OpenAI, Cohere, etc.)
3. **Create your indexing script** to populate Pinecone
4. **Build your search/query API** route
5. **Create the frontend component** to interact with it
6. **Test and iterate** based on user feedback

## Resources

- [Pinecone Documentation](https://docs.pinecone.io/)
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)
- [RAG Best Practices](https://www.pinecone.io/learn/retrieval-augmented-generation/)
- [Vector Search Tutorials](https://www.pinecone.io/learn/)

## Getting Help

If you get stuck:
1. Check the error messages - they're usually descriptive
2. Review the Pinecone console for index status
3. Test your embeddings separately before indexing
4. Start with small datasets to validate your approach
5. Use the setup guide in `PINECONE_SETUP.md` for reference

Happy building! 🚀

