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
