import { GeminiAgent } from "../src/geminiAgent";

const agent = new GeminiAgent();

async function testChat() {
  await agent.startChat();

  console.log("User: Hello!");
  let response = await agent.sendMessage("Hello!");
  console.log("Gemini:", response);

  console.log("\nUser: What can you do?");
  response = await agent.sendMessage("What can you do?");
  console.log("Gemini:", response);
}

testChat();
