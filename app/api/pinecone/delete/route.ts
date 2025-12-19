import { NextRequest, NextResponse } from "next/server"
import { deleteVectors } from "@/lib/pinecone"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { indexName, ids } = body

    if (!indexName || !ids) {
      return NextResponse.json(
        { error: "indexName and ids are required" },
        { status: 400 }
      )
    }

    if (!Array.isArray(ids)) {
      return NextResponse.json(
        { error: "ids must be an array of strings" },
        { status: 400 }
      )
    }

    const result = await deleteVectors(indexName, ids)

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${result.count} vectors`,
    })
  } catch (error: any) {
    console.error("Pinecone delete error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to delete vectors" },
      { status: 500 }
    )
  }
}

