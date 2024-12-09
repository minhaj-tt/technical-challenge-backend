import grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import authServer from "./authServer";

const PORT = 50051;
const server = new grpc.Server();

const PROTO_PATH = "src/proto/auth.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const proto = grpc.loadPackageDefinition(packageDefinition) as grpc.GrpcObject;

const authProto = proto.auth as { AuthService: grpc.ServiceClientConstructor };

server.addService(authProto.AuthService.service, authServer.implementation);

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
