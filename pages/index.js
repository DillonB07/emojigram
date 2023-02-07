import Head from "next/head";
import { useState } from "react";
import { generateEmojiMap, generateRandomSentence, emojify } from "../utils";

export default function Home({ defaultMap, defaultSentence }) {
	const [sentence, setSentence] = useState(defaultSentence);
	const [emojiMap, setEmojiMap] = useState(defaultMap);
	const [emojifiedSentence, setEmojifiedSentence] = useState(
		emojify(defaultSentence, emojiMap)
	);
	const regenMap = () => {
		let newEmojiMap = generateEmojiMap();
		setEmojiMap(newEmojiMap);
		setEmojifiedSentence(emojify(sentence, newEmojiMap));
	};
	const regenSentence = () => {
		let newSentence = generateRandomSentence();
		setSentence(newSentence);
		setEmojifiedSentence(emojify(newSentence, emojiMap));
	};
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
				</header>

				<section id="game" className="flex flex-col items-center space-y-4">
					<p id="emoji-text" className="mx-auto">
						{sentence}
					</p>
					<p id="emoji-text" className="mx-auto">
						{emojifiedSentence}
					</p>
					<ul>
						
					</ul>
					<button
						className="p-2 m-2 bg-cyan-500 rounded-md "
						onClick={regenMap}
					>
						Regenerate EmojiMap
					</button>
					<button className="p-2 m-2 bg-cyan-500 rounded-md " onClick={emojify}>
						Emojify sentence
					</button>
					<button
						className="p-2 m-2 bg-cyan-500 rounded-md "
						onClick={regenSentence}
					>
						Regenerate sentence
					</button>
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
