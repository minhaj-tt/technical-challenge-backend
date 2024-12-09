// GENERATED CODE -- DO NOT EDIT!

"use strict";
import { makeGenericClientConstructor } from "@grpc/grpc-js";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./auth_pb.js";

function serialize_auth_LoginRequest(arg) {
  if (!(arg instanceof LoginRequest)) {
    throw new Error("Expected argument of type auth.LoginRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_LoginRequest(buffer_arg) {
  return LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_auth_LoginResponse(arg) {
  if (!(arg instanceof LoginResponse)) {
    throw new Error("Expected argument of type auth.LoginResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_LoginResponse(buffer_arg) {
  return LoginResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_auth_RegisterRequest(arg) {
  if (!(arg instanceof RegisterRequest)) {
    throw new Error("Expected argument of type auth.RegisterRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_RegisterRequest(buffer_arg) {
  return RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_auth_RegisterResponse(arg) {
  if (!(arg instanceof RegisterResponse)) {
    throw new Error("Expected argument of type auth.RegisterResponse");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_auth_RegisterResponse(buffer_arg) {
  return RegisterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

var AuthServiceService = (exports.AuthServiceService = {
  login: {
    path: "/auth.AuthService/Login",
    requestStream: false,
    responseStream: false,
    requestType: LoginRequest,
    responseType: LoginResponse,
    requestSerialize: serialize_auth_LoginRequest,
    requestDeserialize: deserialize_auth_LoginRequest,
    responseSerialize: serialize_auth_LoginResponse,
    responseDeserialize: deserialize_auth_LoginResponse,
  },
  register: {
    path: "/auth.AuthService/Register",
    requestStream: false,
    responseStream: false,
    requestType: RegisterRequest,
    responseType: RegisterResponse,
    requestSerialize: serialize_auth_RegisterRequest,
    requestDeserialize: deserialize_auth_RegisterRequest,
    responseSerialize: serialize_auth_RegisterResponse,
    responseDeserialize: deserialize_auth_RegisterResponse,
  },
});

export const AuthServiceClient =
  makeGenericClientConstructor(AuthServiceService);
