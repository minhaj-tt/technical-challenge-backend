import { login, register } from "../client/authClient.ts";
import protoLoader from "../protoLoader";
import sinon from "sinon";

// Mock the AuthService using a stub
jest.mock("@grpc/grpc-js", () => ({
  credentials: {
    createInsecure: jest.fn(),
  },
}));

jest.mock("../protoLoader", () =>
  jest.fn(() => ({
    auth: {
      AuthService: jest.fn(),
    },
  }))
);

describe("authClient", () => {
  let client;
  let loginStub;
  let registerStub;

  beforeEach(() => {
    client = {
      Login: jest.fn(),
      Register: jest.fn(),
    };

    // Mock protoLoader to return a mock client
    protoLoader.mockReturnValue({
      auth: {
        AuthService: jest.fn(() => client),
      },
    });

    // Create a stub for the login and register methods
    loginStub = sinon.stub(client, "Login");
    registerStub = sinon.stub(client, "Register");
  });

  afterEach(() => {
    // Restore the original methods after each test
    sinon.restore();
  });

  it("should login successfully", async () => {
    const mockResponse = { success: true, message: "Login successful" };
    const mockError = null;
    const username = "testUser";
    const password = "testPassword";

    loginStub.yields(mockError, mockResponse); // Simulate a successful login response

    const result = await login(username, password); // Call the login function

    expect(result).toEqual(mockResponse); // Check that the response matches the mock response
    expect(client.Login).toHaveBeenCalledWith(
      { username, password },
      expect.any(Function)
    ); // Ensure Login was called correctly
  });

  it("should handle login error", async () => {
    const mockError = new Error("Login failed");
    const username = "testUser";
    const password = "testPassword";

    loginStub.yields(mockError, null); // Simulate an error during login

    await expect(login(username, password)).rejects.toThrow("Login failed"); // Expect the error to be thrown
    expect(client.Login).toHaveBeenCalledWith(
      { username, password },
      expect.any(Function)
    ); // Ensure Login was called correctly
  });

  it("should register successfully", async () => {
    const mockResponse = { success: true, message: "Registration successful" };
    const mockError = null;
    const username = "testUser";
    const password = "testPassword";
    const email = "test@example.com";

    registerStub.yields(mockError, mockResponse); // Simulate a successful register response

    const result = await register(username, password, email); // Call the register function

    expect(result).toEqual(mockResponse); // Check that the response matches the mock response
    expect(client.Register).toHaveBeenCalledWith(
      { username, password, email },
      expect.any(Function)
    ); // Ensure Register was called correctly
  });

  it("should handle register error", async () => {
    const mockError = new Error("Registration failed");
    const username = "testUser";
    const password = "testPassword";
    const email = "test@example.com";

    registerStub.yields(mockError, null); // Simulate an error during registration

    await expect(register(username, password, email)).rejects.toThrow(
      "Registration failed"
    ); // Expect the error to be thrown
    expect(client.Register).toHaveBeenCalledWith(
      { username, password, email },
      expect.any(Function)
    ); // Ensure Register was called correctly
  });
});
