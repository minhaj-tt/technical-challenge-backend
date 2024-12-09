import grpc from "@grpc/grpc-js";
import { AuthService } from "../proto/generated/auth_pb.js";

const authServiceImplementation = {
  Login: (call: any, callback: any) => {
    const { username, password } = call.request;

    // Mock validation
    if (username === "admin" && password === "password") {
      callback(null, { token: "abc123", message: "Login successful" });
    } else {
      callback({
        code: grpc.status.UNAUTHENTICATED,
        message: "Invalid credentials",
      });
    }
  },
  Register: (call: any, callback: any) => {
    const { username, password, email } = call.request;

    // Mock user creation
    callback(null, {
      userId: "12345",
      message: "User registered successfully",
    });
  },
};

export default {
  service: AuthService,
  implementation: authServiceImplementation,
};
