import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "ID token is required" },
        { status: 400 }
      );
    }

    // Verify the LINE ID token (Replace this with your LINE token verification logic)
    const LINE_CLIENT_ID = process.env.NEXT_PUBLIC_LINE_CLIENT_ID;
    const payload = jwt.verify(idToken, LINE_CLIENT_ID, {
      algorithms: ["HS256"], // Use LINE's verification algorithm
    });

    const lineUserId = payload.sub; // Extract LINE user ID from token

    // Generate your app-specific JWT
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
    const token = jwt.sign({ userId: lineUserId }, secret, { expiresIn: "1h" });

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
