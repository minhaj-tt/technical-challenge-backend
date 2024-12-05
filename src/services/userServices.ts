import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, findByEmail, User } from "../models/users";
import db from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const registerUser = async (userData: User): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return createUser({ ...userData, password: hashedPassword });
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  const user = await findByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return { user, token };
};

export const logoutUser = (): void => {};

export const getUserProfile = async (userId: string): Promise<User | null> => {
  const query = `
    SELECT id, email, role, first_name, last_name, created_at
    FROM users
    WHERE id = $1;
  `;
  const { rows } = await db.query(query, [userId]);
  return rows[0] || null;
};

export const updateUserProfile = async (
  userId: string,
  updatedData: Partial<User>
): Promise<User | null> => {
  const fields = Object.keys(updatedData);
  const values = Object.values(updatedData);

  if (fields.length === 0) {
    throw new Error("No valid fields to update");
  }

  const setString = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");
  const query = `
    UPDATE users
    SET ${setString}
    WHERE id = $${fields.length + 1}
    RETURNING id, email, role, first_name, last_name, created_at;
  `;

  const { rows } = await db.query(query, [...values, userId]);
  return rows[0] || null;
};

export const getAllUsers = async (): Promise<User[]> => {
  const query = `
    SELECT id, email, role, first_name, last_name, created_at
    FROM users
    WHERE role != 'admin';  -- Exclude users with role 'admin'
  `;
  const { rows } = await db.query(query);
  return rows;
};
