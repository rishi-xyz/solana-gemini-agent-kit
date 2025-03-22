import { ChatSession, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export class GeminiAgent {
    private model: GenerativeModel;
    private chatSession: ChatSession | null = null;
    private chatHistory: {
        role: "user" | "model";
        content: string
    }[];

    constructor() {
        this.model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash"
        })
        this.chatHistory = []
    }

    async chat(prompt: string): Promise<string> {
        try {
            this.chatHistory.push({ role: "user", content: prompt });
            const result1 = await this.model.generateContentStream({
                contents: this.chatHistory.map(({ role, content }) => ({
                    role,
                    parts: [{ text: content }]
                })),
            })
            const result = await this.model.generateContent({
                contents: this.chatHistory.map(({ role, content }) => ({
                    role,
                    parts: [{ text: content }]
                })),
            });
            const response = result.response.text();

            this.chatHistory.push({ role: "model", content: response });

            return response;
        } catch (error) {
            console.error("Error in chat:", error);
            return "Error generating response";
        }
    }

    async generateTextStream(prompt: string, onData: (chunk: string) => void): Promise<void> {
        try {
            const result = await this.model.generateContentStream(prompt);
            for await (const chunk of result.stream) {
                if (chunk.text()) {
                    onData(chunk.text());
                }
            }
        } catch (error) {
            console.error("Error generating streaming response:", error);
            onData("Error generating response");
        }
    }

    async generateText(prompt: string): Promise<string> {
        try {
            const result = await this.model.generateContent(prompt);
            return result.response.text();
        } catch (error) {
            console.error("Error generating text:", error);
            return "Error generating response";
        }
    }

    async startChat(): Promise<void> {
        this.chatSession = this.model.startChat();
    }

    async sendMessage(message: string): Promise<string> {
        if (!this.chatSession) {
            this.startChat();
        }
        try {
            const result = await this.chatSession?.sendMessage(message);
            return result?.response.text() || "Error in response";
        } catch (error) {
            console.error("Error in chat session:", error);
            return "Error generating chat response";
        }
    }
}
