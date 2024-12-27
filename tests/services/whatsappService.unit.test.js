import axios from 'axios';
import whatsappService from "@services/whatsappService";
import AxiosBuilder from "@builders/axiosBuilder";
import HeadersBuilder from "@builders/headersBuilder";
import config from "@config";


jest.mock("axios");

describe("Unit test suite for whatsappService", () => {
  test("Should send a message calling", async () => {
    const mockResponse = { data: { success: true } };
    axios.mockResolvedValue(mockResponse);
    const data = {
      messaging_product: "whatsapp",
      to: "5511999999999",
      text: { body: "Hello, World!" }
    };
    const axiosMock = new AxiosBuilder()
      .withParam(
        "headers",
        new HeadersBuilder()
          .withParam("Authorization", `Bearer ${config.API_TOKEN}`)
          .build()
      )
      .withParam('url', `https://graph.facebook.com/v21.0/${config.BUSINESS_PHONE}/messages`)
      .withParam("data", data)
      .build();

    await whatsappService.sendMessage(
      data.to,
      data.text.body
    );

    expect(axios).toHaveBeenCalledWith(axiosMock);
  });
});
