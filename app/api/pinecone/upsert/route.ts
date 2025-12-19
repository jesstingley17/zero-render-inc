import { NextRequest, NextResponse } from "next/server"
import { upsertVectors } from "@/lib/pinecone"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { indexName, vectors } = body

    if (!indexName || !vectors) {
      return NextResponse.json(
        { error: "indexName and vectors are required" },
        { status: 400 }
      )
    }

    if (!Array.isArray(vectors)) {
      return NextResponse.json(
        { error: "vectors must be an array" },
        { status: 400 }
      )
    }

    // Validate vector structure
    for (const vector of vectors) {
      if (!vector.id || !Array.isArray(vector.values)) {
        return NextResponse.json(
          { error: "Each vector must have an 'id' and 'values' array" },
          { status: 400 }
        )
      }
    }

    const result = await upsertVectors(indexName, vectors)

    return NextResponse.json({
      success: true,
      message: `Successfully upserted ${result.count} vectors`,
    })
  } catch (error: any) {
    console.error("Pinecone upsert error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to upsert vectors" },
      { status: 500 }
    )
  }
}

