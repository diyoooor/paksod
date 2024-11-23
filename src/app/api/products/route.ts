import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const products = await db.collection("products").find().toArray();
  return NextResponse.json(products);
}
