import { CommonErrorCode } from "@/constants/error-message";
import clientPromise from "@/lib/mongodb";
import { verifyLineTokens } from "@/lib/verifyToken";
import { commonErrorResponse, commonSuccessResponse } from "@/utility/response";
import { BSON } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const authorizationHeader = req.headers.get("authorization");
    if (!authorizationHeader) {
      return NextResponse.json(commonErrorResponse(401, "Invalid authorization header", ""));
    }

    const token = authorizationHeader.split(" ")[1];
    const userData = await verifyLineTokens(token);

    if (!userData || !userData.userId) {
      return NextResponse.json(commonErrorResponse(404, "Invalid", "Invalid"));
    }

    const client = await clientPromise;
    const db = client.db();

    const cartCollection = db.collection("cart");
    const productCollection = db.collection("products");

    const userCart = await cartCollection.findOne({ userId: userData.userId });

    if (!userCart) {
      const newCart = {
        userId: userData.userId,
        products: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await cartCollection.insertOne(newCart);
    }

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

    return NextResponse.json(commonSuccessResponse(200, 'Get Cart Success', {
      userId: userCart.userId,
      items: productsWithDetails,
      createdAt: userCart.createdAt,
      updatedAt: userCart.updatedAt,
    }))
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(commonErrorResponse(400, error.message, error));
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

    if (!productId || !priceId || quantity <= 0 || !unit) {
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

export async function PUT(req: NextRequest) {
  try {
    // Parse request payload
    const { productId, priceId, quantity, unit } = await req.json();

    // Check authorization header
    const authorizationHeader = req.headers.get("authorization");

    console.log(`authorization: ${authorizationHeader}`)

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return NextResponse.json(commonErrorResponse(401, "Invalid authorization header", "")
      );
    }

    // Verify token and extract user data
    const token = authorizationHeader.split(" ")[1];
    const userData = await verifyLineTokens(token);

    if (!userData || !userData.userId) {
      return NextResponse.json(commonErrorResponse(403, "Invalid user data", ""));
    }

    // Validate request payload
    if (
      !productId ||
      !priceId ||
      typeof quantity !== "number" ||
      quantity < 0 ||
      !unit
    ) {
      return NextResponse.json(
        commonErrorResponse(CommonErrorCode.BAD_REQUEST, "Invalid product, price, unit, or quantity", "Invalid")
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const cartCollection = db.collection("cart");

    // Find user's cart
    const userCart = await cartCollection.findOne({ userId: userData.userId });

    if (userCart) {
      // Check if the product exists in the cart
      const existingProductIndex = userCart.products.findIndex(
        (item: { productId: string }) => item.productId === productId
      );

      if (existingProductIndex > -1) {
        // If quantity is 0 or less, remove the product
        if (quantity === 0) {
          userCart.products.splice(existingProductIndex, 1);
        } else {
          // Update the existing product
          userCart.products[existingProductIndex] = {
            productId,
            priceId,
            quantity,
            unit,
          };
        }
      } else if (quantity > 0) {
        // Add the new product
        userCart.products.push({ productId, priceId, quantity, unit });
      }

      // Update the cart in the database
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
        products: quantity > 0 ? [{ productId, priceId, quantity, unit }] : [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await cartCollection.insertOne(newCart);
    }

    // Retrieve the updated cart
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

export async function DELETE(req: NextRequest) {
  try {
    // Extract authorization header
    const authorizationHeader = req.headers.get("authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }

    // Verify token and extract user data
    const token = authorizationHeader.split(" ")[1];
    const userData = await verifyLineTokens(token);

    if (!userData || !userData.userId) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 403 }
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const cartCollection = db.collection("cart");

    // Delete only the cart for the specific user
    const deleteResult = await cartCollection.deleteOne({
      userId: userData.userId,
    });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json(
        { error: "Cart not found for the user" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
