# Backend Application

## Overview

This backend application provides a gRPC-based API for managing stores. It allows creating stores and interacting with the `StoreServiceClient` using `protobuf` definitions.

This application uses the following key technologies:

- **gRPC**: For communication between services.
- **Protobuf**: For defining data structures and service methods.
- **Node.js**: Backend server runtime.
- **TypeScript**: For better development experience with type safety.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (>= 14.x)
- **npm** (>= 6.x)
- **Protocol Buffers Compiler (protoc)** (for generating `.js` files from `.proto`)
- **gRPC Tools** (for Node.js)
- **TypeScript** (if you're using TypeScript)

### Installation

1. **Clone the repository**:

   git clone https://github.com/your-username/your-repository.git
   cd your-repository

2. **Install dependencies**:

- **npm install**

3. **Generate Protobuf Files:**

You must have protoc installed to generate JavaScript files from the .proto files. To generate the files, run:

# For grpc-tools

- **npx grpc-tools compile ./src/proto/\*_/_.proto --js_out=import_style=commonjs,binary:./src/proto/generated --grpc_out=grpc_js:./src/proto/generated**

npm run start
