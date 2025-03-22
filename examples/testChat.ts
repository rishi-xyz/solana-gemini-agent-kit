import { GeminiAgent } from "../src/geminiAgent";
import readline from "readline";

const agent = new GeminiAgent();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function chatLoop() {
  rl.question("You: ", async (userInput) => {
    if (userInput.toLowerCase() === "exit") {
      console.log("Chat ended.");
      rl.close();
      return;
    }

    const response = await agent.chat(userInput);
    console.log("Gemini:", response);

    chatLoop(); // Continue conversation
  });
}


console.log("Chat started! Type 'exit' to stop.");
chatLoop();
