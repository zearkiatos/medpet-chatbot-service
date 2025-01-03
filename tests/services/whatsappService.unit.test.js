import axios from 'axios';
import whatsappService from "@services/whatsappService";
import AxiosBuilder from "@builders/axiosBuilder";
import HeadersBuilder from "@builders/headersBuilder";
import InteractiveBuilder from '@builders/interactiveBuilder';
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

  test("Should send a log error when some error ocurred in message request", async () => {
    const mockResponse = 'Some error weird ocurred 🤯';
    const jestConsoleSpyOn = jest.spyOn(console, 'error');
    const messageExpected = `Error sending message:`;
    axios.mockRejectedValue(mockResponse);
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
    expect(jestConsoleSpyOn).toHaveBeenCalledWith(messageExpected, mockResponse);
  });

  test("Should mark a message as read", async () => {
    const mockResponse = { data: { success: true } };
    axios.mockResolvedValue(mockResponse);
    const data = {
      messaging_product: "whatsapp",
      status: 'read',
      message_id: '123456789'
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

    await whatsappService.markAsRead(
      data.message_id
    );

    expect(axios).toHaveBeenCalledWith(axiosMock);
  });

  test("Should log an error when trying to mark a message as read", async () => {
    const mockResponse = 'Some error weird ocurred 🤯';
    const messageExpected = 'Error marking message as read:';
    const jestConsoleSpyOn = jest.spyOn(console, 'error');
    axios.mockRejectedValue(mockResponse);
    const data = {
      messaging_product: "whatsapp",
      status: 'read',
      message_id: '123456789'
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

    await whatsappService.markAsRead(
      data.message_id
    );

    expect(axios).toHaveBeenCalledWith(axiosMock);
    expect(jestConsoleSpyOn).toHaveBeenCalledWith(messageExpected, mockResponse);
  });

  test("Should handle interactive button option requests", async () => {
    const mockResponse = { data: { success: true } };
    axios.mockResolvedValue(mockResponse);
    const data = {
      messaging_product: "whatsapp",
      to: "5511999999999",
      type: 'interactive',
      interactive: new InteractiveBuilder().build()
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

    await whatsappService.sendInteractiveButtons(
      data.to,
      data.interactive.body.text,
      data.interactive.action.buttons
    );

    expect(axios).toHaveBeenCalledWith(axiosMock);
  });

  test("Should log when some error ocurred when handle interactive requests", async () => {
    const mockResponse = 'Some error weird ocurred 🤯';
    const messageExpected = `Error ocurred render the buttons: ${mockResponse}`;
    const jestConsoleSpyOn = jest.spyOn(console, 'error');
    axios.mockRejectedValue(mockResponse);
    const data = {
      messaging_product: "whatsapp",
      to: "5511999999999",
      type: 'interactive',
      interactive: new InteractiveBuilder().build()
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

    await whatsappService.sendInteractiveButtons(
      data.to,
      data.interactive.body.text,
      data.interactive.action.buttons
    );

    expect(axios).toHaveBeenCalledWith(axiosMock);
    expect(jestConsoleSpyOn).toHaveBeenCalledWith(messageExpected);
  });

  test("Should a message with a multimedia resource with a type image", async () => {
    const mockResponse = { data: { success: true } };
    axios.mockResolvedValue(mockResponse);
    const data = {
      messaging_product: "whatsapp",
      to: "5511999999999",
      type: 'image',
      image: {
        link: 'image.jpg',
        caption: 'This is an image caption'
      }
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

    await whatsappService.sendMediaMessage(
      data.to,
      data.type,
      data.image.link,
      data.image.caption,
    );

    expect(axios).toHaveBeenCalledWith(axiosMock);
  });

  test("Should a message with a multimedia resource with a type audio", async () => {
    const mockResponse = { data: { success: true } };
    axios.mockResolvedValue(mockResponse);
    const data = {
      messaging_product: "whatsapp",
      to: "5511999999999",
      type: 'audio',
      audio: {
        link: 'audio.mp3'
      }
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

    await whatsappService.sendMediaMessage(
      data.to,
      data.type,
      data.audio.link,
      undefined,
    );

    expect(axios).toHaveBeenCalledWith(axiosMock);
  });

  test("Should a message with a multimedia resource with a type video", async () => {
    const mockResponse = { data: { success: true } };
    axios.mockResolvedValue(mockResponse);
    const data = {
      messaging_product: "whatsapp",
      to: "5511999999999",
      type: 'video',
      video: {
        link: 'video.mp4',
        caption: "This is a video caption"
      }
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

    await whatsappService.sendMediaMessage(
      data.to,
      data.type,
      data.video.link,
      data.video.caption,
    );

    expect(axios).toHaveBeenCalledWith(axiosMock);
  });

  test("Should a message with a multimedia resource with a type document", async () => {
    const mockResponse = { data: { success: true } };
    axios.mockResolvedValue(mockResponse);
    const data = {
      messaging_product: "whatsapp",
      to: "5511999999999",
      type: 'document',
      document: {
        link: 'document.pdf',
        caption: 'This is a document caption',
        filename: 'medpet.pdf'
      }
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

    await whatsappService.sendMediaMessage(
      data.to,
      data.type,
      data.document.link,
      data.document.caption,
    );

    expect(axios).toHaveBeenCalledWith(axiosMock);
  });
});