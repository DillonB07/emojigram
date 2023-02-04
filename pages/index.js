import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [sentence, setSentence] = useState("This is some dummy text");
  const emojiMap = {}
  return (
    <div className="flex justify-center items-center text-center">
      <Head>
        <title>Emojigram</title>
        <meta
          name="description"
          content="Cryptograms are boring. Let's do emojigrams!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold">Emojigram</h1>
          <h3 className="text-xl">
            Cryptograms are boring. Let&apos;s do emojigrams! &#128047;
          </h3>
        </header>

        <section id="game" className="flex flex-col items-center space-y-4">
          <p id="emoji-text" className="mx-auto">
            {sentence
              .split("")
              .map((char) => (emojiMap[char] ? emojiMap[char] : char))}
          </p>
        </section>
      </main>
    </div>
  );
}
