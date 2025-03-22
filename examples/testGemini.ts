import { GeminiAgent } from "../src/geminiAgent";

const agent = new GeminiAgent();

async function test() {
  const response = await agent.generateText("Hello, what can you do?");
  console.log("Gemini Response:", response);
}

test();
