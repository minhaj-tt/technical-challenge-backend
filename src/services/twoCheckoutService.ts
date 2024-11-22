import axios from "axios";

const TWOCHECKOUT_MERCHANT_CODE = process.env.TWOCHECKOUT_MERCHANT_CODE || "";
const TWOCHECKOUT_PRIVATE_KEY = process.env.TWOCHECKOUT_PRIVATE_KEY || "";

interface TwoCheckoutPaymentData {
  sellerId: string;
  privateKey: string;
  currency: string;
  amount: number;
  description: string;
  returnUrl: string;
  cancelUrl: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  billingAddress: {
    name: string;
    email: string;
  };
}

export const createTwoCheckoutPayment = async (
  userId: string,
  subscriptionType: "standard" | "premium"
): Promise<string> => {
  try {
    const amount = subscriptionType === "standard" ? 10 : 50;
    const description =
      subscriptionType === "standard"
        ? "Standard Subscription"
        : "Premium Subscription";

    const data: TwoCheckoutPaymentData = {
      sellerId: TWOCHECKOUT_MERCHANT_CODE,
      privateKey: TWOCHECKOUT_PRIVATE_KEY,
      currency: "USD",
      amount,
      description,
      returnUrl: `${process.env.FRONTEND_URL}/payment-success`,
      cancelUrl: `${process.env.FRONTEND_URL}/payment-cancel`,
      items: [
        {
          name: description,
          price: amount,
          quantity: 1,
        },
      ],
      billingAddress: {
        name: "John Doe",
        email: "customer@example.com",
      },
    };

    const response = await axios.post(
      "https://api.2checkout.com/v1/payments",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.paymentUrl;
  } catch (error: any) {
    console.error(
      "Error creating 2Checkout payment:",
      error.response?.data || error.message
    );
    throw new Error("Error initiating payment");
  }
};
