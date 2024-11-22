import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as userService from "../services/userServices";
import multer from "multer";
import path from "path";
import moment from "moment";
import Stripe from "stripe";

declare module "express-session" {
  interface SessionData {
    user: {
      id: string | number | undefined;
      username: string;
      email: string;
      subscription: string | undefined;
      trialEndDate: Date | undefined;
    };
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

const STRIPE_SECRET_KEY =
  process.env.STRIPE_SECRET_KEY || "sk_test_XXXXXXXXXXXXXXXXXXXXXX";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15" as Stripe.LatestApiVersion,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export const register = [
  upload.single("image"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        res
          .status(400)
          .json({ message: "Username, email, and password are required" });
        return;
      }

      const existingUser = await userService.getUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const image = req.file ? req.file.path : null;

      const trial_end_date = moment().add(7, "days").toDate();

      const user = await userService.registerUser({
        username,
        email,
        password: hashedPassword,
        image,
        subscription: "free_trial",
        trial_end_date,
        save: function (): unknown {
          throw new Error("Function not implemented.");
        },
      });

      if (!user) {
        res.status(500).json({ message: "Error creating user" });
        return;
      }

      console.log("user", user);

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          image: user.image,
          subscription: user.subscription,
          trialEndDate: user.trial_end_date,
        },
      });
    } catch (error) {
      console.error("Error in registration:", error);
      res.status(500).json({ message: "Error registering user" });
    }
  },
];

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await userService.getUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      subscription: user.subscription,
      trialEndDate: user.trial_end_date,
    };

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.json({
      message: "Logged in successfully",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function upgradeSubscription(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { userId, newSubscription } = req.body;

    if (!["standard", "premium"].includes(newSubscription)) {
      res.status(400).json({ message: "Invalid subscription type" });
      return;
    }

    const updatedUser = await userService.upgradeSubscription(
      userId,
      newSubscription
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found or update failed" });
      return;
    }

    res.json({
      message: "Subscription updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error upgrading subscription:", error);
    res.status(500).json({ message: "Error upgrading subscription" });
  }
}

export async function cancelSubscription(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { userId } = req.body;

    const updatedUser = await userService.downgradeSubscription(userId);

    if (!updatedUser) {
      res
        .status(404)
        .json({ message: "User not found or cancellation failed" });
      return;
    }

    res.json({
      message: "Subscription cancelled successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error cancelling subscription:", error);
    res.status(500).json({ message: "Error cancelling subscription" });
  }
}

export async function createStripeCheckoutSession(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { userId, subscriptionType } = req.body;

    if (!["standard", "premium"].includes(subscriptionType)) {
      res.status(400).json({ message: "Invalid subscription type" });
      return;
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const priceIds: { [key: string]: string } = {
      standard: "price_1QMxeRGDjVerw5izOS7LkidL",
      premium: "price_1QNGq8GDjVerw5izQBXkhha3",
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceIds[subscriptionType],
          quantity: 1,
        },
      ],
      customer_email: user.email,
      success_url: `http://localhost:5173`,
      cancel_url: `http://localhost:5173`,
    });

    res.json({
      message: "Stripe checkout session created",
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error);
    res.status(500).json({ message: "Error creating Stripe Checkout session" });
  }
}

export function logout(req: Request, res: Response): void {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ message: "Error logging out" });
    } else {
      res.clearCookie("authToken");
      res.json({ message: "Logged out successfully" });
    }
  });
}

const locations = [
  {
    id: 1,
    name: "Central Park SOLE",
    latitude: 40.785091,
    longitude: -73.968285,
  },
  {
    id: 2,
    name: "Times Square",
    latitude: 40.758896,
    longitude: -73.98513,
  },
  {
    id: 3,
    name: "Empire State Building",
    latitude: 40.748817,
    longitude: -73.985428,
  },
];

export async function getLocations(req: Request, res: Response): Promise<void> {
  try {
    res.status(200).json({
      message: "Locations retrieved successfully",
      locations,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Server error" });
  }
}
