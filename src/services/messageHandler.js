import whatsappService from "./whatsappService";
class MessageHandler {
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === "text") {
      const incomingMessage = message.text.body.toLowerCase().trim();

      if (this.isGreeting(incomingMessage)) {
        await this.sendWelcomeMessage(message.from, message.id, senderInfo);
      } else {
        const response = `Echo: ${message.text.body}`;
        await whatsappService.sendMessage(message.from, response, message.id);
      }
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
    if (!fullName || typeof fullName !== 'string') return '';
    const nameParts = fullName.trim().split(' ').filter(part => part);
    return nameParts[0] || '';
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
}

export default new MessageHandler();
