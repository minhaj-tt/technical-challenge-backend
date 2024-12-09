// GENERATED CODE -- DO NOT EDIT!

"use strict";
import { makeGenericClientConstructor } from "@grpc/grpc-js";
import { StoreRequest, StoreResponse } from "./store_pb.js";

function serialize_store_StoreRequest(arg) {
  if (!(arg instanceof StoreRequest)) {
    throw new Error("Expected argument of type store.StoreRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_StoreRequest(buffer_arg) {
  return StoreRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_store_StoreResponse(arg) {
  if (!(arg instanceof StoreResponse)) {
    throw new Error("Expected argument of type store.StoreResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_store_StoreResponse(buffer_arg) {
  return StoreResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

var StoreServiceService = (exports.StoreServiceService = {
  getStores: {
    path: "/store.StoreService/GetStores",
    requestStream: false,
    responseStream: false,
    requestType: StoreRequest,
    responseType: StoreResponse,
    requestSerialize: serialize_store_StoreRequest,
    requestDeserialize: deserialize_store_StoreRequest,
    responseSerialize: serialize_store_StoreResponse,
    responseDeserialize: deserialize_store_StoreResponse,
  },
});

export const StoreServiceClient =
  makeGenericClientConstructor(StoreServiceService);
