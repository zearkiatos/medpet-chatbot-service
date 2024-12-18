import healthCheckController from "@controllers/healthCheckController";
describe("Unit test suite for healthCheckController", () => {
  test("Should return a status of 200", async () => {
    const responseMock = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await healthCheckController.healthCheck(null, responseMock);
    
    expect(responseMock.status).toHaveBeenCalledWith(200);
  });
});
