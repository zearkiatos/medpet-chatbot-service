import whatsappService from "@services/whatsappService";
import googleSheetsService from "@services/googleSheetsService";
import openAIService from "@services/openAIService";
import config from "@config";
class MessageHandler {
  constructor() {
    this.appointmentState = {};
    this.assistantState = {};
  }
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === "text") {
      const incomingMessage = message.text.body.toLowerCase().trim();

      if (this.isGreeting(incomingMessage)) {
        await this.sendWelcomeMessage(message.from, message.id, senderInfo);
        await this.sendWelcomeMenu(message.from);
      } else if (
        ["video", "audio", "image", "document"].includes(incomingMessage)
      ) {
        await this.sendMedia(message.from, incomingMessage);
      } else if (this.assistantState[message.from]) {
        await this.handleAssistantFlow(message.from, incomingMessage);
      } else {
        this.handleAppointmentFlow(message.from, incomingMessage);
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
        this.appointmentState[to] = {
          step: "name",
        };
        response = "Please, could you type your name?";
        break;
      case "request 🤔":
        this.assistantState[to] = {
          step: "question"
        };
        response = "What is your request?";
        break;
      case "location 📍":
        response = "This is our location";
        break;
      default:
        response = "Sorry, we didn't understand that option";
    }

    await whatsappService.sendMessage(to, response);
  }

  mediaActions = {
    audio: {
      url: `${config.CDN_BASE_URL}/medpet-audio.aac`,
      caption: "Welcome 🔉",
    },
    image: {
      url: `${config.CDN_BASE_URL}/medpet-imagen.png`,
      caption: "¡This is an image! 🏞️",
    },
    video: {
      url: `${config.CDN_BASE_URL}/medpet-video.mp4`,
      caption: "¡This is a video! 🎥",
    },
    document: {
      url: `${config.CDN_BASE_URL}/medpet-file.pdf`,
      caption: "¡This is a PDF! 📄",
    },
  };

  async sendMedia(to, media) {
    const { url, caption } = this.mediaActions[media];

    await whatsappService.sendMediaMessage(to, media, url, caption);
  }

  async handleAppointmentFlow(to, message) {
    const state = this.appointmentState[to];
    let response = null;

    if (!state) {
      return;
    }

    switch (state.step) {
      case "name":
        state.name = message;
        state.step = "petName";
        response = "What is your pet's name?";
        break;
      case "petName":
        state.petName = message;
        state.step = "petType";
        response = "What type of pet do you have? for example: dog, cat, bird";
        break;
      case "petType":
        state.petType = message;
        state.step = "reason";
        response = "Which is the reason for your request?";
        break;
      case "reason":
        state.reason = message;
        response = this.completeAppointment(to);
    }

    await whatsappService.sendMessage(to, response);
  }

  completeAppointment(to) {
    const appointment = this.appointmentState[to];
    delete this.appointmentState[to];

    const userData = [
      to,
      appointment.name,
      appointment.petName,
      appointment.petType,
      appointment.reason,
      new Date().toISOString(),
    ];

    googleSheetsService.appendToSheet(userData);

    return `Thank you to scheduled your appointment
    Summary of your appointment:
    
    Name: ${appointment.name}
    Pet's name: ${appointment.petName}
    Pet's type: ${appointment.petType}
    Reason: ${appointment.reason}
    
    We will contact you soon to confirm the date and time of your appointment.`;
  }

  async handleAssistantFlow(to, message) {
    const state = this.assistantState[to];
    let response = null;
    const menuMessage = "Was the answer helpful?";
    const buttons = [
      {
        type: "reply",
        reply: {
          id: "option_4",
          title: "Yes, thanks",
        },
      },
      {
        type: "reply",
        reply: {
          id: "option_5",
          title: "Ask another question",
        },
      },
      {
        type: "reply",
        reply: {
          id: "option_6",
          title: "Emergency 🆘",
        },
      }
    ];

    if (state.step === "question") {
      response = await openAIService(message);
    }

    delete this.assistantState[to];

    await whatsappService.sendMessage(to, response);
    await whatsappService.sendInteractiveButtons(to, menuMessage, buttons);
  }
}

export default new MessageHandler();
