import Head from "next/head";
import { useState } from "react";
import { generateEmojiMap, generateRandomSentence } from "../utils";

export default function Home({ defaultMap, defaultSentence }) {
	const [sentence, setSentence] = useState(defaultSentence);
	const [emojiMap, setEmojiMap] = useState(defaultMap);
	const regenMap = () => {
		let newEmojiMap = generateEmojiMap();
		setEmojiMap(newEmojiMap);
	};
	const regenSentence = () => {
		let newSentence = generateRandomSentence();
		setSentence(newSentence);
	}
	const emojify = () => {
		let emojified = sentence
			.split("")
			.map((char) => (emojiMap[char] ? emojiMap[char] : char));
		console.log(emojified);
	};
	const [emojifiedSentence, setEmojifiedSentence] = useState(
		emojify(defaultSentence)
	);
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
					<h1>{sentence}</h1>
					{/* <h1>{emojifiedSentence.map((char, i) => (char))}</h1> */}
				</header>
				<button onClick={regenMap}>Regenerate EmojiMap</button>
				<button onClick={emojify}>Emojify sentence</button>
				<button onClick={regenSentence}>Regenerate sentence</button>

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
	let sentence = generateRandomSentence();
	console.log(`sentence: ${sentence}`);
	return {
		props: {
			defaultMap: emojiMap,
			defaultSentence: sentence,
		},
	};
}
