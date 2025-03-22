import { GeminiAgent } from "../src/geminiAgent";

const agent = new GeminiAgent();

async function testStreamingChat() {
  console.log("User: Tell me a story about a lion in 50 words.");
  await agent.generateTextStream(
    "Tell me a story about a lion in 50 words.",
    (chunk) => {
      process.stdout.write(chunk);
    }
  );
  console.log("\n\n End Of Response \n")
}

testStreamingChat();
