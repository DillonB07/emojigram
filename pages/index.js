import Head from "next/head";
import { useState } from "react";
import generateEmojiMap from "../utils/generateEmojiMap";

export default function Home({defaultMap}) {
  const [sentence, setSentence] = useState("This is some dummy text");
  const [emojiMap, setEmojiMap] = useState(defaultMap)
  const regen = () => {
	let newEmojiMap = generateEmojiMap()
	setEmojiMap(newEmojiMap)
  }
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
						Cryptograms are boring. Let&apos;s do emojigrams!
					</h3>
					<h1>
						Harcoded in HTML: &#8395;
						<br />From emojiMap: {emojiMap.a}
						<br />From emojiMap: {emojiMap.b}
						<br />From emojiMap: {emojiMap.c}
						<br />From emojiMap: {emojiMap.d}
						<br />From emojiMap: {emojiMap.e}
						<br />From emojiMap: {emojiMap.f}
						<br />From emojiMap: {emojiMap.g}
						<br />From emojiMap: {emojiMap.h}
						<br />From emojiMap: {emojiMap.i}
						<br />From emojiMap: {emojiMap.j}
						<br />From emojiMap: {emojiMap.k}
						<br />From emojiMap: {emojiMap.l}
						<br />From emojiMap: {emojiMap.m}
						<br />From emojiMap: {emojiMap.n}
						<br />From emojiMap: {emojiMap.o}
						<br />From emojiMap: {emojiMap.p}
						<br />From emojiMap: {emojiMap.q}
						<br />From emojiMap: {emojiMap.r}
						<br />From emojiMap: {emojiMap.s}
						<br />From emojiMap: {emojiMap.t}
						<br />From emojiMap: {emojiMap.u}
						<br />From emojiMap: {emojiMap.v}
						<br />From emojiMap: {emojiMap.w}
						<br />From emojiMap: {emojiMap.x}
						<br />From emojiMap: {emojiMap.y}
						<br />From emojiMap: {emojiMap.z}
					</h1>
				</header>
				<button onClick={regen}>Regenerate EmojiMap</button>

				<section id="game" className="flex flex-col items-center space-y-4">
					<p id="emoji-text" className="mx-auto">
						{/* {sentence
              .split("")
              .map((char) => (emojiMap[char] ? emojiMap[char] : char))} */}
					</p>
				</section>
			</main>
		</div>
	);
}

export function getServerSideProps() {
    let emojiMap = generateEmojiMap();
  console.log(emojiMap)
  return {
    props: {
      defaultMap: emojiMap
    }
  }
}