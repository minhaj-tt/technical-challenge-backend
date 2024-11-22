import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    req.body.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
}
