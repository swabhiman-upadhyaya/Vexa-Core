// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash-lite",
//   apiKey: "process.env.GOOGLE_API_KEY",
// });

import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";

const model = new ChatMistralAI({
  model: "mistral-small",
  apiKey: process.env.MISTRALAI_API_KEY,
  temperature: 0
});

export const testAi = async (messages) => {
  try {
    model.invoke("What is the capital of France?").then((response) => {
      console.log(response.text);
    });
  }
  catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}


export async function generateResponse(messages) {

  const formattedMessages = messages.map((msg) => {

    if (msg.role === "user") {
      return new HumanMessage(msg.content);
    }

    if (msg.role === "ai") {
      return new AIMessage(msg.content);
    }

  }).filter(Boolean); // remove undefined values

  const response = await model.invoke(formattedMessages);

  return response.content;
}

export async function generateChatTitle(message) {
  const response = await model.invoke
  ([
    new SystemMessage
    (`
      You are a helpful assistant that generates concise and descriptive titles for chat conversations.
      
      User will provide you with the first message of a chat conversation, and you will generate a title that
      captures the essence of the conversation in 2 - 4 words.The title should be clear, relevant, and engaging,
      giving users a quick understanding of the chat's topic.
    `),
    
    new HumanMessage
    (`
      Generate a title for the following chat message: "${message}"
    `)
  ])

  return response.text;
}