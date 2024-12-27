import whatsappService from "./whatsappService";
class MessageHandler {
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === "text") {
      const incomingMessage = message.text.body.toLowerCase().trim();

      if (this.isGreeting(incomingMessage)) {
        await this.sendWelcomeMessage(message.from, message.id, senderInfo);
        await this.sendWelcomeMenu(message.from);
      } else {
        const response = `Echo: ${message.text.body}`;
        await whatsappService.sendMessage(message.from, response, message.id);
      }
      await whatsappService.markAsRead(message.id);
    } else if (message?.type === "interactive") {
      const option = message?.interactive?.button_reply?.title
        .toLowerCase()
        .trim();
      await this.handleMenuOption(message.from, option);
      await whatsappService.markAsRead(message.id);
    }
  }

  isGreeting(message) {
    const greetings = [
      "hola",
      "hello",
      "hi",
      "buenas tardes",
      "good afternoon",
    ];
    return greetings.includes(message);
  }

  getFirstName(fullName) {
    if (!fullName || typeof fullName !== "string") return "";
    const nameParts = fullName
      .trim()
      .split(" ")
      .filter((part) => part);
    return nameParts[0] || "";
  }

  getSenderName(senderInfo) {
    const name = this.getFirstName(senderInfo.profile?.name);
    return name || senderInfo.wa_id || "User";
  }

  async sendWelcomeMessage(to, messageId, senderInfo) {
    const name = this.getSenderName(senderInfo);
    const welcomeMessage = `Hello ${name}, Welcome to Medpet, your online Pet Shop 🐕🐈🦜. How can I help you, today?`;
    await whatsappService.sendMessage(to, welcomeMessage, messageId);
  }

  async sendWelcomeMenu(to) {
    const menuMessage = "Choose an option:";
    const buttons = [
      {
        type: "reply",
        reply: {
          id: "option_1",
          title: "Sheduled ✅",
        },
      },
      {
        type: "reply",
        reply: {
          id: "option_2",
          title: "Request 🤔",
        },
      },
      {
        type: "reply",
        reply: {
          id: "option_3",
          title: "Location 📍",
        },
      },
    ];

    await whatsappService.sendInteractiveButtons(to, menuMessage, buttons);
  }

  async handleMenuOption(to, option) {
    let response = null;
    switch (option) {
      case "sheduled ✅":
        response = "Scheduled an appointment";
        break;
      case "request 🤔":
        response = "Make a request";
        break;
      case "location 📍":
        response = "This is our location";
        break;
      default:
        response = "Sorry, we didn't understand that option";
    }

    await whatsappService.sendMessage(to, response);
  }
}

export default new MessageHandler();
