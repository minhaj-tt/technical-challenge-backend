// // routes/webhookRouter.js
// import express from "express";
// import Stripe from "stripe";
// import * as userService from "../services/userServices";

// const stripe = new Stripe(
//   process.env.STRIPE_SECRET_KEY || "default_secret_key"
// );
// const webhookRouter = express.Router();

// webhookRouter.post(
//   "/stripe-webhook",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     const sig = req.headers["stripe-signature"];
//     const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
//     } catch (err) {
//       console.error("Webhook Error:", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     switch (event.type) {
//       case "invoice.payment_succeeded":
//         const succeededInvoice = event.data.object;
//         await userService.updateUserSubscription(
//           succeededInvoice.metadata.userId,
//           "active"
//         );
//         break;
//       case "invoice.payment_failed":
//         const failedInvoice = event.data.object;
//         await userService.updateUserSubscription(
//           failedInvoice.metadata.userId,
//           "past_due"
//         );
//         break;
//       default:
//         console.warn(`Unhandled event type ${event.type}`);
//     }

//     res.status(200).json({ received: true });
//   }
// );

// export default webhookRouter;
