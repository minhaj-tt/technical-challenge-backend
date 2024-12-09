import { createStore } from "../client/storeClient.ts";
import { StoreServiceClient } from "../proto/generated/store_pb_service.js";
import sinon from "sinon";

describe("createStore function", () => {
  let createStoreStub;

  beforeAll(() => {
    createStoreStub = sinon.stub(StoreServiceClient.prototype, "createStore");
  });

  afterAll(() => {
    createStoreStub.restore();
  });

  it("should create a store and return the store details", async () => {
    const storeDetails = {
      name: "Store Name",
      merchantId: "merchant123",
      description: "Store Description",
      active: true,
    };
    const mockResponse = {
      getStore: () => ({
        name: "Store Name",
        merchantId: "merchant123",
        description: "Store Description",
        active: true,
      }),
    };

    createStoreStub.yields(null, mockResponse);

    const result = await createStore(storeDetails);

    expect(result).toEqual(mockResponse.getStore());
    expect(createStoreStub.calledOnce).toBe(true);
  });

  it("should handle errors if the store creation fails", async () => {
    const storeDetails = {
      name: "Store Name",
      merchantId: "merchant123",
      description: "Store Description",
      active: true,
    };
    const error = new Error("Failed to create store");
    createStoreStub.yields(error, null);

    await expect(createStore(storeDetails)).rejects.toThrow(
      "Failed to create store"
    );
    expect(createStoreStub.calledOnce).toBe(true);
  });
});
