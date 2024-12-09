declare module "../proto/generated/store_grpc_pb.js" {
  export class StoreServiceClient {
    constructor(address: string, credentials: any);

    createStore(
      request: any,
      callback: (error: any, response: any) => void
    ): void;
  }

  export class CreateStoreRequest {
    setName(name: string): void;
    setMerchantId(merchantId: string): void;
    setDescription(description: string): void;
    setActive(active: boolean): void;
  }
}
