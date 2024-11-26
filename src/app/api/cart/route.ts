import clientPromise from "@/lib/mongodb";
import { verifyLineTokens } from "@/lib/verifyToken";
import { BSON } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
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

    const client = await clientPromise;
    const db = client.db();

    const cartCollection = db.collection("cart");
    const productCollection = db.collection("products"); // Related table

    // Fetch user's cart
    const userCart = await cartCollection.findOne({ userId: userData.userId });

    if (!userCart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    // Fetch related product details for each item in the cart
    const productsWithDetails = await Promise.all(
      userCart.products.map(async (item) => {
        const productDetails = await productCollection.findOne(
          { _id: new BSON.ObjectId(item.productId) },
          { projection: { _id: 0, name: 1, image: 1, prices: 1 } }
        );

        return {
          ...item,
          ...productDetails,
        };
      })
    );

    return NextResponse.json({
      userId: userCart.userId,
      products: productsWithDetails,
      createdAt: userCart.createdAt,
      updatedAt: userCart.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { productId, priceId, quantity, unit } = await req.json();

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

    if (
      !productId ||
      !priceId ||
      typeof quantity !== "number" ||
      quantity <= 0 ||
      !unit
    ) {
      return NextResponse.json(
        { error: "Invalid product, price, unit, or quantity" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const cartCollection = db.collection("cart");

    const userCart = await cartCollection.findOne({ userId: userData.userId });

    if (userCart) {
      const existingProductIndex = userCart.products.findIndex(
        (item: { productId }) => item.productId === productId
      );

      if (existingProductIndex > -1) {
        userCart.products[existingProductIndex] = {
          productId,
          priceId,
          quantity,
          unit,
        };
      } else {
        userCart.products.push({ productId, priceId, quantity, unit });
      }

      // Update the user's cart in the database
      await cartCollection.updateOne(
        { userId: userData.userId },
        {
          $set: {
            products: userCart.products,
            updatedAt: new Date(),
          },
        }
      );
    } else {
      const newCart = {
        userId: userData.userId,
        products: [{ productId, priceId, quantity, unit }],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await cartCollection.insertOne(newCart);
    }

    const updatedCart = await cartCollection.findOne({
      userId: userData.userId,
    });

    return NextResponse.json({
      message: "Cart updated successfully",
      cart: updatedCart,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
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
