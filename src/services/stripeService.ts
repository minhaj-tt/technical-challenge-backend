import Stripe from "stripe";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "default_secret_key"
);

export const createCheckoutSession = async (
  userId: any,
  subscriptionType: "standard" | "premium"
) => {
  const prices: Record<"standard" | "premium", string> = {
    standard: "price_standard_id",
    premium: "price_premium_id",
  };

  if (!(subscriptionType in prices)) {
    throw new Error("Invalid subscription type");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: prices[subscriptionType],
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    metadata: { userId },
  });

  return session;
};
