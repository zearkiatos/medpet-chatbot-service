import axios from "axios";
import config from "@config";

const sendToWhatsApp = async (data) => {
  const baseUrl = `${config.FACEBOOK_GRAPH_BASE_URL}/${config.API_VERSION}/${config.BUSINESS_PHONE}/messages`;
  const headers = {
    Authorization: `Bearer ${config.API_TOKEN}`,
  };

  try {
    await axios({
      method: "POST",
      url: baseUrl,
      headers,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export default sendToWhatsApp;
