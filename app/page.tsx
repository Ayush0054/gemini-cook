"use client";

import { Avatar, Button, Card, Input, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ScrollShadow } from "@nextui-org/react";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
export default function Home() {
  const [messages, setMessages] = useState();
  const output = async () => {
    const response = await fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      // body: JSON.stringify({ messages }),
    });
    const data = await response.json();
    console.log(data);

    setMessages(data.text);
  };
  useEffect(() => {
    output();
  }, []);
  return (
    <div className=" flex bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ">
      <main className="flex min-h-screen flex-col items-center justify-between md:px-24 py-5  bg-black/40 ">
        <div className="flex md:w-[73%] w-[95%] md:p-3 p-2 flex-col items-center ">
          {/* <div className=" h-full flex flex-col gap-2 overflow-y-auto bg-scroll  py-8 px-3 w-full"> */}
          <div>
            <h1 className=" text-lg font-semibold text-black">Bot</h1>

            <ScrollShadow
              hideScrollBar
              offset={100}
              orientation="horizontal"
              className=" min-h-[730px] max-h-[730px] "
            >
              <h1 className=" md:text-base text-xs text-white">{messages}</h1>
            </ScrollShadow>
          </div>
          {/* </div> */}
          <div className="relative  md:w-[100%] w-[95%] bottom-4 gap-2 flex justify-center items-center ">
            <Textarea
              variant="underlined"
              className="
          resize-none overflow-y-auto text-black   rounded-l outline-none"
            />
            <Button className="py-2" variant="">
              send
            </Button>
          </div>
        </div>
      </main>
      {/* <ThemeSwitcher /> */}
    </div>
  );
}
