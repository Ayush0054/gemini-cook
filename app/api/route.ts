import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
export async function GET(req: Request, res: NextResponse) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  console.log(response.text());

  const text = response.text();
  return NextResponse.json({ text }, { status: 200 });
}
