"use client";

import { Avatar, Button, Card, Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import axios from "axios";

export default function Home() {
  const [messages, setMessages] = useState();
  const [inputMessage, setInputMessage] = useState("");

  const [chatHistory, setChatHistory] = useState([
    {
      role: "user",
      parts: ["Hello, I have 2 dogs in my house."],
    },
    {
      role: "model",
      parts: "Great to meet you. What would you like to know?",
    },
  ]);
  useEffect(() => {
    setChatHistory([
      {
        role: "user",
        parts: "Hello, I have 2 dogs in my house.",
      },
      {
        role: "model",
        parts: "Great to meet you. What would you like to know?",
      },
    ]);
  }, []);
  const sendMessage = async () => {
    const emptyUserMessage = { role: "user", parts: "" };

    const newHistory = [
      ...chatHistory,
      { role: "user", parts: inputMessage },
      { role: "model", parts: "" },
    ];
    setChatHistory(newHistory);
    console.log("Sending request:", { history: newHistory, msg: inputMessage });
    console.log(inputMessage);
    console.log(newHistory);

    const response = await axios.post("/api", {
      history: newHistory,
      msg: inputMessage,
    });
    console.log(response);

    const data = await response.data;

    console.log(data);

    setMessages(data.text);
    // const updatedHistory = [...newHistory, { role: "model", parts: data.text }];
    const updatedHistory = [...newHistory];
    updatedHistory[newHistory.length - 1] = { role: "model", parts: data.text };

    setChatHistory(updatedHistory);
  };

  return (
    <div className="  bg-gradient-to-l from-rose-100 to-teal-100  ">
      <main className="flex min-h-screen flex-col items-center justify-between md:px-24 py-5    ">
        <div className="flex md:w-[73%] w-[95%] md:p-3 p-2 flex-col items-center  ">
          {/* <div className=" h-full flex flex-col gap-2 overflow-y-auto bg-scroll  py-8 px-3 w-full"> */}
          <div>
            <h1 className=" text-lg font-semibold text-black">Bot</h1>

            <div className=" min-h-[730px] max-h-[730px] ">
              {chatHistory.map((message, index) => (
                <div key={index}>
                  <h5>{message.role} </h5>
                  <ScrollShadow
                    offset={100}
                    orientation="horizontal"
                    className="  max-h-[730px] "
                  >
                    <h1 className=" md:text-lg font-medium  text-xs text-gray-700">
                      {" "}
                      {message.parts}{" "}
                    </h1>
                  </ScrollShadow>
                </div>
              ))}
            </div>
          </div>
          {/* </div> */}
          <div className="relative  md:w-[100%] w-[95%] bottom-4 gap-2 flex justify-center items-center ">
            <Textarea
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              variant="underlined"
              color="success"
              className="
          resize-none overflow-y-auto text-black   rounded-l outline-none"
            />
            <Button
              className="py-2"
              variant="ghost"
              color="success"
              onClick={sendMessage}
            >
              send
            </Button>
          </div>
        </div>
      </main>
      {/* <ThemeSwitcher /> */}
    </div>
  );
}
