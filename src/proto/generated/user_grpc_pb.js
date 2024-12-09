// GENERATED CODE -- DO NOT EDIT!

"use strict";
import { makeGenericClientConstructor } from "@grpc/grpc-js";
import { UserRequest, UserResponse } from "./user_pb.js";

function serialize_user_UserRequest(arg) {
  if (!(arg instanceof UserRequest)) {
    throw new Error("Expected argument of type user.UserRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserRequest(buffer_arg) {
  return UserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserResponse(arg) {
  if (!(arg instanceof UserResponse)) {
    throw new Error("Expected argument of type user.UserResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserResponse(buffer_arg) {
  return UserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

var UserServiceService = (exports.UserServiceService = {
  getUser: {
    path: "/user.UserService/GetUser",
    requestStream: false,
    responseStream: false,
    requestType: UserRequest,
    responseType: UserResponse,
    requestSerialize: serialize_user_UserRequest,
    requestDeserialize: deserialize_user_UserRequest,
    responseSerialize: serialize_user_UserResponse,
    responseDeserialize: deserialize_user_UserResponse,
  },
});

export const UserServiceClient =
  makeGenericClientConstructor(UserServiceService);
