import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { verifyLineTokens } from "@/lib/verifyToken"; // Assuming you have a function to verify the token
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    // Verify Authorization Header
    const authorizationHeader = req.headers.get("authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }

    const token = authorizationHeader.split(" ")[1];
    const userData = await verifyLineTokens(token);

    if (!userData || !userData.userId) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 403 }
      );
    }

    // Parse Request Body
    const { address, paymentMethod } = await req.json();
    if (!address || !paymentMethod) {
      return NextResponse.json(
        { error: "Address and payment method are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Fetch User's Cart
    const cartCollection = db.collection("cart");
    const orderCollection = db.collection("orders");

    const userCart = await cartCollection.findOne({ userId: userData.userId });
    if (!userCart || userCart.products.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or not found" },
        { status: 404 }
      );
    }

    // Create New Order
    const newOrder = {
      userId: userData.userId,
      products: userCart.products,
      totalAmount: userCart.products.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      ),
      address,
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await orderCollection.insertOne(newOrder);

    // Clear Cart
    await cartCollection.updateOne(
      { userId: userData.userId },
      { $set: { products: [], updatedAt: new Date() } }
    );

    return NextResponse.json(
      {
        message: "Order placed successfully",
        orderId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error placing order:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}
