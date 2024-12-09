import grpc from "@grpc/grpc-js";
import protoLoader from "../protoLoader";
import authServer from "./authServer";

const PORT = 50051;
const server = new grpc.Server();

// Load Protobuf
const authProto = protoLoader("src/proto/auth.proto");

// Add services
server.addService(
  authProto.auth.AuthService.service,
  authServer.implementation
);

server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`gRPC server running at http://localhost:${port}`);
    server.start();
  }
);
