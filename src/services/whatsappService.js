import sendToWhatsApp from "@services/httpRequest/sendToWhatsApp";

class WhatsappService {
  async sendMessage(to, body, messageId) {
    const data = {
      messaging_product: "whatsapp",
      to,
      text: {
        body,
      },
    };

    await sendToWhatsApp(data);
  }

  async markAsRead(messageId) {
    const data = {
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
    };

    await sendToWhatsApp(data);
  }

  async sendInteractiveButtons(to, bodyText, buttons) {
    const data = {
      messaging_product: "whatsapp",
      to,
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: bodyText,
        },
        action: {
          buttons,
        },
      },
    };

    await sendToWhatsApp(data);
  }

  async sendMediaMessage(to, type, mediaUrl, caption) {
    const mediaObject = {};

    switch (type) {
      case "image":
        mediaObject.image = {
          link: mediaUrl,
          caption,
        };
        break;
      case "audio":
        mediaObject.audio = {
          link: mediaUrl,
        };
        break;
      case "video":
        mediaObject.video = {
          link: mediaUrl,
          caption,
        };
        break;
      case "document":
        mediaObject.document = {
          link: mediaUrl,
          caption,
          filename: "medpet.pdf",
        };
        break;
      default:
        throw new Error("Invalid media type");
    }

    const data = {
      messaging_product: "whatsapp",
      to,
      type,
      ...mediaObject,
    };

    await sendToWhatsApp(data);
  }

  async sendContactMessage(to, contact) {
    const data = {
      messaging_product: "whatsapp",
      to,
      type: "contacts",
      contacts: [contact],
    };

    await sendToWhatsApp(data);
  }
}

export default new WhatsappService();
