import { Request, Response } from "express";
import { registerUser, loginUser, logoutUser } from "../services/userServices";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ user });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  logoutUser();
  res.status(200).json({ message: "Logged out successfully." });
};
