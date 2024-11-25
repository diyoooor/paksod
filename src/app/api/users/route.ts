import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { lineUserId, displayName, pictureUrl, idToken } = await req.json();

    if (!lineUserId || !displayName) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { lineUserId },
      {
        $set: {
          displayName,
          pictureUrl,
          idToken,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    return NextResponse.json({
      message: "User saved or updated successfully",
      result,
    });
  } catch (error) {
    console.error("Error saving user to the database:", error);
    return NextResponse.json(
      { error: "Failed to save user to the database" },
      { status: 500 }
    );
  }
}
