// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash-lite",
//   apiKey: "process.env.GOOGLE_API_KEY",
// });

import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage, tool, createAgent } from "langchain";

import * as z from "zod";
import { searchInternet } from "./internet.service.js";

const model = new ChatMistralAI({
  model: "mistral-small",
  apiKey: process.env.MISTRALAI_API_KEY,
  temperature: 0
});

const searchInternetTool = tool(
  searchInternet,
  {
    name: "searchInternet",
    description: "Use only when the user asks for current, recent, or real-time information from the internet. Do not use for general questions.",
    schema: z.object({
      query: z.string().describe("The search query to find relevant information on the internet")
    })
  }
)

const agent = createAgent({
  model: model,
  tools: [searchInternetTool],
})

export async function generateResponse(messages) {

  const formattedMessages = messages.map((msg) => {

    if (msg.role === "user") {
      return new HumanMessage(msg.content);
    }

    if (msg.role === "ai") {
      return new AIMessage(msg.content);
    }

  }).filter(Boolean); // remove undefined values

  formattedMessages.unshift(
    new SystemMessage(`
    You are a helpful AI assistant.

    RULES:

    1. If the user asks about:
    - current prices
    - weather
    - news
    - sports
    - stock market
    - crypto
    - gold rate
    - live data
    - latest updates
    - today's information
    - recent events

    You MUST use the "searchInternet" tool.

    2. Never answer current or real-time questions from memory.

    3. After using the tool:
    - summarize the result
    - give the final answer
    - DO NOT call the tool again

    4. For normal knowledge questions, answer directly without tools.
    `)
  );

  const response = await agent.invoke(
    {
      messages: formattedMessages
    },
    {
      recursionLimit: 5
    }
  )

  return response.messages[response.messages.length - 1].text;
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