import { GeminiAgent } from "../src/geminiAgent";
import * as readline from "readline";

const agent = new GeminiAgent();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = () => {
  rl.question("User: ", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Chat ended. Goodbye! 👋");
      rl.close();
      return;
    }

    const response = await agent.chat(input);
    console.log("Gemini:", response);
    askQuestion();
  });
};

async function testChatStream() {
  rl.question("User:", async (input) => {
    if (input.toLowerCase() === "exit") {
      console.log("Chat ended. Goodbye! 👋");
      rl.close();
      return;
    }
    await agent.chatStream(
      input,
      (chunk) => {
        process.stdout.write(chunk);
      }
    );
    testChatStream();
  });
};

console.log("Start chatting! Type 'exit' to stop.");
testChatStream();