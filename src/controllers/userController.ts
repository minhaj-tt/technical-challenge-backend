import { Request, Response } from "express";
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from "../services/userServices";

export const getProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = "47e348d5-9b2f-449f-8e02-367ad1e97944";
    if (!userId) {
      res.status(400).json({ error: "User ID is missing" });
      return;
    }

    const userProfile = await getUserProfile(userId);

    if (!userProfile) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ user: userProfile });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = "47e348d5-9b2f-449f-8e02-367ad1e97944";
    if (!userId) {
      res.status(400).json({ error: "User ID is missing" });
      return;
    }

    const updatedData = req.body;

    const userProfile = await updateUserProfile(userId, updatedData);

    if (!userProfile) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ user: userProfile });
  } catch (error) {
    res.status(500).json({ error: error || "Server error" });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
