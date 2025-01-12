import OpenAI from "openai";
import config from "@config";

const client = new OpenAI({
  apiKey: config.CHATGPT_API_KEY,
});

const openAIService = async (message) => {
  try {
    const response = await client.chat.completions.create({
      message: [
        { role: "system", content: "prompt" },
        { role: "user", content: message },
      ],
      model: "gpt-4o",
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
};


export default openAIService;