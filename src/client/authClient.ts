//Binary Communication Method

import grpc from "@grpc/grpc-js";
import protoLoader from "../protoLoader";

const authProto = protoLoader("src/proto/auth.proto");
const AuthService = authProto.auth.AuthService;

const client = new AuthService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Login function
export const login = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    client.Login({ username, password }, (err: any, response: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

// Register function
export const register = (username: string, password: string, email: string) => {
  return new Promise((resolve, reject) => {
    client.Register(
      { username, password, email },
      (err: any, response: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      }
    );
  });
};

// JSON Communication Method

// import { AuthServiceClient } from "../proto/generated/auth_grpc_pb.js";
// import { LoginRequest, RegisterRequest } from "../proto/generated/auth_pb.js";

// // Login function
// export const login = (username: any, password: any) => {
//   const loginRequest = new LoginRequest();
//   loginRequest.setUsername(username);
//   loginRequest.setPassword(password);

//   return new Promise((resolve, reject) => {
//     client.login(loginRequest, {}, (error: any, response: unknown) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(response);
//       }
//     });
//   });
// };

// // Register function
// export const register = (username: any, password: any, email: any) => {
//   const registerRequest = new RegisterRequest();
//   registerRequest.setUsername(username);
//   registerRequest.setPassword(password);
//   registerRequest.setEmail(email);

//   return new Promise((resolve, reject) => {
//     client.register(registerRequest, {}, (error: any, response: unknown) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(response);
//       }
//     });
//   });
// };
