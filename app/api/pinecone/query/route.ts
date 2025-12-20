import { NextRequest, NextResponse } from "next/server"
import { queryVectors } from "@/lib/pinecone"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { indexName, queryVector, topK = 5, filter } = body

    if (!indexName || !queryVector) {
      return NextResponse.json(
        { error: "indexName and queryVector are required" },
        { status: 400 }
      )
    }

    if (!Array.isArray(queryVector)) {
      return NextResponse.json(
        { error: "queryVector must be an array of numbers" },
        { status: 400 }
      )
    }

    const results = await queryVectors(indexName, queryVector, topK, filter)

    return NextResponse.json({
      success: true,
      matches: results.matches,
      namespace: results.namespace,
    })
  } catch (error: any) {
    console.error("Pinecone query error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to query Pinecone" },
      { status: 500 }
    )
  }
}



