import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export class GeminiAgent {
    async generateText(prompt: string): Promise<string> {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error("Error generating text:", error);
            return "Error generating response";
        }
    }
}
