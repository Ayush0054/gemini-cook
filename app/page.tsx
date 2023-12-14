"use client";

import { Button, Card, Input, Textarea } from "@nextui-org/react";
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
      <main className="flex min-h-screen flex-col items-center justify-between md:px-24 py-5">
        <Card className="flex md:w-[73%] w-[95%] md:p-3 p-2 flex-col items-center  bg-black/40 rounded-xl">
          {/* <div className=" h-full flex flex-col gap-2 overflow-y-auto bg-scroll  py-8 px-3 w-full"> */}
          <ScrollShadow
            hideScrollBar
            offset={100}
            orientation="horizontal"
            className=" min-h-[730px] max-h-[730px]"
          >
            <h1 className=" md:text-base text-xs">{messages}</h1>
            {/* <h1 className=" md:text-base text-xs">
              Once upon a time, a young girl named Lily received a special gift
              on her 10th birthday - a magic backpack. The enchanting bag
              glistened in an array of vibrant colors and was adorned with
              intricate patterns. Lily was captivated by its beauty and eager to
              discover its magical abilities. As Lily gleefully put on the
              backpack, she felt a surge of energy coursing through her body.
              Little did she know that this extraordinary bag possessed the
              power to fulfill her every wish. Curious and excited, she
              whispered her first request: "I wish for a delicious chocolate
              cake." To her astonishment, as soon as the words left her mouth,
              the backpack began to hum and shake gently. In a whirl of colors,
              a scrumptious chocolate cake materialized, tempting her with its
              rich aroma. Overwhelmed with joy, Lily savored the sweetness of
              the magical cake. Encouraged by the backpack's abilities, Lily
              decided to test its limits. She wished for a beautiful doll to
              accompany her on her adventures. In an instant, a life-sized doll
              with twinkling eyes and a vibrant red dress appeared by her side.
              They became inseparable friends, sharing laughter and fun.
              However, as Lily continued to indulge in her desires, she realized
              that the backpack's magic came with a catch. Each wish fulfilled
              would drain some of her own energy, leaving her feeling tired and
              weak. Concerned about the consequences, she decided to use the
              backpack responsibly. With newfound wisdom, Lily began to use the
              magic backpack for noble purposes. She wished for warm clothes and
              nutritious food for the needy. She wished for books and supplies
              for underprivileged children, eager to share the joy of knowledge.
              One day, a massive earthquake struck, causing widespread
              devastation in her town. Without hesitation, Lily utilized the
              magic backpack to assist in rescue efforts. She wished for sturdy
              tents, first-aid supplies, and clean drinking water for the
              survivors. The backpack responded with unwavering generosity,
              providing solace and hope to those affected by the disaster. News
              of Lily's selfless acts of kindness spread far and wide, inspiring
              others to use their own unique abilities to make a difference. The
              magic backpack became a symbol of compassion and unity, reminding
              everyone of the power that lies within each of us. As the years
              passed, Lily grew into a wise and compassionate woman, her heart
              overflowing with love and gratitude for the magical backpack that
              had taught her the true meaning of magic - the magic of giving and
              the joy of sharing with others.
            </h1> */}
          </ScrollShadow>
        </Card>
        {/* </div> */}
        <div className="relative  md:w-[80%] w-[95%] bottom-4 gap-2 flex justify-center items-center">
          <Textarea
            className="w-[85%]  
          resize-none overflow-y-auto text-black   rounded-l outline-none"
          />
          <Button className="">send</Button>
        </div>
      </main>
      {/* <ThemeSwitcher /> */}
    </div>
  );
}
