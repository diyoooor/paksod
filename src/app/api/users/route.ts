import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection("users").find().toArray();
  return NextResponse.json(user);
}
