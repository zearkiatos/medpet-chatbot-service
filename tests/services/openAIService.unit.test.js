import OpenAIService from "@services/openAIService";

jest.mock("openai", () => {
  let createMock = ({ message }) => {
    if (message[1].content === "Hello") {
      return {
        choices: [
          {
            message: {
              content: "Hi",
            },
          },
        ],
      };
    } else {
      throw new Error("Error");
    }
  };
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: createMock,
          },
        },
      };
    }),
  };
});
describe("Unit test suite for Open AI Service", () => {
  test("Should return a response from Open AI API", async () => {
    const response = await OpenAIService("Hello");

    expect(response).toBe("Hi");
  });
});
