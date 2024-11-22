import { Request, Response } from "express";
import * as userService from "../services/userServices";

export const handleTwoCheckoutNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { status, userId, subscriptionType } = req.body;

    if (status === "completed") {
      const updatedUser = await userService.upgradeSubscription(
        userId,
        subscriptionType
      );
      if (!updatedUser) {
        res.status(400).json({ message: "Failed to update user subscription" });
        return;
      }

      console.log(
        `Subscription for user ${userId} upgraded to ${subscriptionType}`
      );
    }

    res.status(200).send("Payment notification received");
  } catch (error) {
    console.error("Error handling payment notification:", error);
    res.status(500).send("Error processing notification");
  }
};
