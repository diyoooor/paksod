import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const authenticateToken = (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  try {
    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret) as { lineUserId: string };
    return payload.lineUserId;
  } catch (error) {
    throw new Error("Invalid or expired token" + error);
  }
};
