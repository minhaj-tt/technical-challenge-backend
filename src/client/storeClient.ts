//Binary Communication Method

const grpc = require("@grpc/grpc-js");
const { StoreServiceClient } = require("../proto/generated/store_grpc_pb.js");
const { CreateStoreRequest } = require("../proto/generated/store_pb");

// Create a new store
const createStoreRequest = new CreateStoreRequest();
createStoreRequest.setName("Store Name");
createStoreRequest.setMerchantId("merchant123");
createStoreRequest.setDescription("Store Description");
createStoreRequest.setActive(true);

const client = new StoreServiceClient(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.createStore(
  createStoreRequest,
  (error: any, response: { getStore: () => any }) => {
    if (error) {
      console.error("Error creating store:", error);
    } else {
      console.log("Store created:", response.getStore());
    }
  }
);

// JSON Communication Method

// import { StoreServiceClient } from "../proto/generated/store_pb_service.js";
// import { CreateStoreRequest } from "../proto/generated/store_pb.js";
// import { grpc } from "@improbable-eng/grpc-web";

// // Create a new store request
// const createStoreRequest = new CreateStoreRequest();
// createStoreRequest.setName("Store Name");
// createStoreRequest.setMerchantId("merchant123");
// createStoreRequest.setDescription("Store Description");
// createStoreRequest.setActive(true);

// // Set up the client with grpc-web (which supports JSON)
// const client = new StoreServiceClient("http://localhost:8080", null, null); // URL is the Envoy proxy or your server endpoint

// // Method to create a store via JSON-based communication
// client.createStore(createStoreRequest, {}, (error, response) => {
//   if (error) {
//     console.error("Error creating store:", error);
//   } else {
//     console.log("Store created:", response.getStore());
//   }
// });
