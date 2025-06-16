"use client";

import dynamic from "next/dynamic";
const BrowserComponent = dynamic(() => import("../components/BrowserComponent"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome to My Portfolio</h1>

      <div className="section">
        <h2>About Me</h2>
        <p>This content is server-rendered safely</p>
      </div>

      <BrowserComponent />

      <div className="section">
        <h2>My Projects</h2>
        <p>Check out my latest work</p>
      </div>
    </main>
  );
}

