"use client";

import { useEffect, useState } from "react";

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
    <main>
      <h1>{messages}</h1>
      {/* <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul> */}
    </main>
  );
}
