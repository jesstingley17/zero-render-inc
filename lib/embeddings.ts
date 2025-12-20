/**
 * Embedding generation utilities
 * 
 * This file provides functions to generate embeddings using various providers.
 * Install the required package for your chosen provider:
 * 
 * For OpenAI: npm install openai
 * For Cohere: npm install cohere-ai
 * For Hugging Face: npm install @huggingface/inference
 */

// Example: OpenAI Embeddings
// Uncomment and install 'openai' package to use
/*
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateEmbedding(text: string): Promise<number[]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set')
  }

  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small', // or 'text-embedding-3-large'
    input: text,
  })
  
  return response.data[0].embedding
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is not set')
  }

  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: texts,
  })
  
  return response.data.map(item => item.embedding)
}
*/

// Example: Cohere Embeddings
// Uncomment and install 'cohere-ai' package to use
/*
import { CohereClient } from 'cohere-ai'

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
})

export async function generateEmbedding(text: string): Promise<number[]> {
  if (!process.env.COHERE_API_KEY) {
    throw new Error('COHERE_API_KEY environment variable is not set')
  }

  const response = await cohere.embed({
    texts: [text],
    model: 'embed-english-v3.0',
    inputType: 'search_document',
  })
  
  return response.embeddings[0]
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  if (!process.env.COHERE_API_KEY) {
    throw new Error('COHERE_API_KEY environment variable is not set')
  }

  const response = await cohere.embed({
    texts,
    model: 'embed-english-v3.0',
    inputType: 'search_document',
  })
  
  return response.embeddings
}
*/

// Placeholder implementation - replace with your chosen provider
export async function generateEmbedding(text: string): Promise<number[]> {
  throw new Error(
    'Embedding generation not configured. Please uncomment and configure your chosen provider in lib/embeddings.ts'
  )
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  throw new Error(
    'Embedding generation not configured. Please uncomment and configure your chosen provider in lib/embeddings.ts'
  )
}



