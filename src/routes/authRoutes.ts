import express, { Request, Response } from "express";
import * as authController from "../controllers/authController";
import * as locationController from "../controllers/locationController";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.put("/upgrade-subscription", authController.upgradeSubscription);
router.put("/cancel-subscription", authController.cancelSubscription);
router.post(
  "/create-checkout-session",
  authController.createStripeCheckoutSession
);
router.get("/locations", locationController.getLocations);
router.post("/verify-email", authController.verifyEmail);
router.put("/profile/:id", authController.updateProfile);
router.put("/update-password/:id", authController.updatePassword);

export default router;
