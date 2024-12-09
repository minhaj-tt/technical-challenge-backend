import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

const loadProto = (filePath: string) => {
  const packageDefinition = protoLoader.loadSync(filePath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });
  return grpc.loadPackageDefinition(packageDefinition);
};

export default loadProto;
