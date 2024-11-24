import clientPromise from "@/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const cartCollection = db.collection("cart");

    const cart = await cartCollection.find().toArray();

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { productId, priceId, quantity } = await req.json();

    if (!productId || !priceId || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: "Invalid product or quantity" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const cartCollection = db.collection("cart");

    const existingItem = await cartCollection.findOne({ productId, priceId });

    if (existingItem) {
      await cartCollection.updateOne(
        { productId, priceId },
        { $set: { updatedAt: new Date() }, $inc: { quantity } }
      );
    } else {
      await cartCollection.insertOne({
        productId,
        priceId,
        quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const cart = await cartCollection.find().toArray();
    return NextResponse.json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const cartCollection = db.collection("cart");

    await cartCollection.deleteMany({});

    return NextResponse.json({ message: "Cart cleared" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
