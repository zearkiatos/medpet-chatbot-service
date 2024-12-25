import { faker } from "@faker-js/faker";
import whatsappService from "@services/whatsappService";
import messageHandler from "@services/messageHandler";
import MessageBuilder from "@builders/messageBuilder";
import TextBuilder from "@builders/textBuilder";
import SenderInfoBuilder from "@builders/senderInfoBuilder";
import ProfileBuilder from "@builders/profileBuilder";

describe("Unit test suite for messageHandler", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Should handle incoming message and mark as read", async () => {
    const messageMock = new MessageBuilder().build();
    const senderInfoMock = new SenderInfoBuilder().build();
    const markAsReadSpyOn = jest
      .spyOn(whatsappService, "markAsRead")
      .mockResolvedValue(true);
    const sendMessageSpyOn = jest
      .spyOn(whatsappService, "sendMessage")
      .mockResolvedValue(true);
    const sendWelcomeMenuSpyOn = jest
      .spyOn(whatsappService, "sendInteractiveButtons")
      .mockResolvedValue(true);

    await messageHandler.handleIncomingMessage(messageMock, senderInfoMock);

    expect(markAsReadSpyOn).toHaveBeenCalled();
    expect(sendMessageSpyOn).toHaveBeenCalled();
    expect(sendWelcomeMenuSpyOn).toHaveBeenCalled();
  });

  test("Should handle incoming message and mark as read", async () => {
    const messageMock = new MessageBuilder().build();
    const senderInfoMock = new SenderInfoBuilder().build();
    const markAsReadSpyOn = jest
      .spyOn(whatsappService, "markAsRead")
      .mockResolvedValue(true);
    const sendMessageSpyOn = jest
      .spyOn(whatsappService, "sendMessage")
      .mockResolvedValue(true);
    const sendWelcomeMenuSpyOn = jest
      .spyOn(whatsappService, "sendInteractiveButtons")
      .mockResolvedValue(true);

    await messageHandler.handleIncomingMessage(messageMock, senderInfoMock);

    expect(markAsReadSpyOn).toHaveBeenCalled();
    expect(sendMessageSpyOn).toHaveBeenCalled();
    expect(sendWelcomeMenuSpyOn).toHaveBeenCalled();
  });

  test("Should handle incoming different to a message type text and not doing nothing", async () => {
    const messageMock = new MessageBuilder()
      .withParam("type", "is-not-text")
      .build();
    const senderInfoMock = new SenderInfoBuilder().build();
    const markAsReadSpyOn = jest
      .spyOn(whatsappService, "markAsRead")
      .mockResolvedValue(true);
    const sendMessageSpyOn = jest
      .spyOn(whatsappService, "sendMessage")
      .mockResolvedValue(true);
    const sendWelcomeMenuSpyOn = jest
      .spyOn(whatsappService, "sendInteractiveButtons")
      .mockResolvedValue(true);

    await messageHandler.handleIncomingMessage(messageMock, senderInfoMock);

    expect(markAsReadSpyOn).not.toHaveBeenCalled();
    expect(sendMessageSpyOn).not.toHaveBeenCalled();
    expect(sendWelcomeMenuSpyOn).not.toHaveBeenCalled();
  });

  test("Should handle incoming message different to a greeting", async () => {
    const messageText = faker.lorem.sentence();
    const messageMock = new MessageBuilder()
      .withParam(
        "text",
        new TextBuilder().withParam("body", messageText).build()
      )
      .build();
    const senderInfoMock = new SenderInfoBuilder().build();
    const markAsReadSpyOn = jest
      .spyOn(whatsappService, "markAsRead")
      .mockResolvedValue(true);
    const sendMessageSpyOn = jest
      .spyOn(whatsappService, "sendMessage")
      .mockResolvedValue(true);
    const sendWelcomeMenuSpyOn = jest
      .spyOn(whatsappService, "sendInteractiveButtons")
      .mockResolvedValue(true);

    await messageHandler.handleIncomingMessage(messageMock, senderInfoMock);

    expect(markAsReadSpyOn).toHaveBeenCalled();
    expect(sendMessageSpyOn).toHaveBeenCalled();
    expect(sendWelcomeMenuSpyOn).not.toHaveBeenCalled();
  });

  test("Should send a greeting message without a name if it is not defined", async () => {
    const expectedArgs = [
      "user",
      "Hello 12345678, Welcome to Medpet, your online Pet Shop 🐕🐈🦜. How can I help you, today?",
      "1",
    ];
    const messageMock = new MessageBuilder().build();
    const senderInfoMock = new SenderInfoBuilder()
      .withParam(
        "profile",
        new ProfileBuilder().withParam("name", undefined).build()
      )
      .build();
    const markAsReadSpyOn = jest
      .spyOn(whatsappService, "markAsRead")
      .mockResolvedValue(true);
    const sendMessageSpyOn = jest
      .spyOn(whatsappService, "sendMessage")
      .mockResolvedValue(true);
    const sendWelcomeMenuSpyOn = jest
      .spyOn(whatsappService, "sendInteractiveButtons")
      .mockResolvedValue(true);

    await messageHandler.handleIncomingMessage(messageMock, senderInfoMock);

    expect(markAsReadSpyOn).toHaveBeenCalled();
    expect(sendMessageSpyOn).toHaveBeenCalledWith(...expectedArgs);
    expect(sendWelcomeMenuSpyOn).toHaveBeenCalled();
  });
});
