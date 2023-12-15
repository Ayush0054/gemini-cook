import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { Chat } from "openai/resources/index.mjs";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// ...

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
  },
];

const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
export async function POST(req: Request, res: NextResponse) {
  try {
    const { history, msg } = await req.json();

    console.log("Received history:", history);
    console.log("Received msg:", msg);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings,
    });

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      },
    });

    const result = await await chat.sendMessage(msg);
    const response = await result.response;
    console.log(response.text());

    const text = response.text();
    return NextResponse.json({ text }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err }, { status: 500 });
  }
}
