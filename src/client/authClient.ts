import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

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

const client = new authProto.AuthService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

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
