import OpenAIService from "@services/openAIService";

jest.mock("openai", () => {
  let createMock = ({ messages }) => {
    if (messages[1].content === "Hello") {
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

  test("Should throw an error when calling Open AI API", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error");

    await OpenAIService("Invalid message");

    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Error"));
  });
});
