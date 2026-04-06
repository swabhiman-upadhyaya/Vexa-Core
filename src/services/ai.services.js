// import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// const model = new ChatGoogleGenerativeAI({
//   model: "gemini-2.5-flash-lite",
//   apiKey: "process.env.GOOGLE_API_KEY",
// });

import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
model: "mistral-small-latest",
apiKey: process.env.MISTRALAI_API_KEY,
temperature: 0
});

export const testAi = async (prompt) => {
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