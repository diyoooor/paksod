import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const client = await clientPromise;
  const db = client.db();
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    const products = await db.collection("products").find().toArray();
    return NextResponse.json(products);
  } else {
    const productId = new ObjectId(id);
    try {
      const product = await db
        .collection("products")
        .findOne({ _id: productId });
      if (product) {
        return NextResponse.json(product);
      } else {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
