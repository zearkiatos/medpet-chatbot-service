import whatsappService from "@services/whatsappService";
import messageHandler from "@services/messageHandler";
import MessageBuilder from "@builders/messageBuilder";
import SenderInfoBuilder from "@builders/senderInfoBuilder";

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

    await messageHandler.handleIncomingMessage(messageMock, senderInfoMock);

    expect(markAsReadSpyOn).toHaveBeenCalled();
    expect(sendMessageSpyOn).toHaveBeenCalled();
  });
});
