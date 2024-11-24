import clientPromise from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    const products = await db
      .collection("products")
      .find({
        type: category,
      })
      .toArray();
    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
