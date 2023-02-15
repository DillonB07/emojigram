import Head from "next/head";
import { useState } from "react";
import Swal from "sweetalert2";
import { generateEmojiMap, generateRandomSentence, emojify } from "../utils";

export default function Home({
	defaultEmojiMap,
	defaultSentence,
	defaultAnswerMap,
	defaultEmojifiedSentence,
	defaultGuessMap,
	defaultTheme,
}) {
	const [sentence, setSentence] = useState(defaultSentence);
	const [emojiMap, setEmojiMap] = useState(defaultEmojiMap);
	const [emojifiedSentence, setEmojifiedSentence] = useState(
		defaultEmojifiedSentence
	);
	const [answerMap, setAnswerMap] = useState(defaultAnswerMap);
	const [guessMap, setGuessMap] = useState(defaultGuessMap);
	const [correct, setCorrect] = useState(false);
	const [theme, setTheme] = useState(defaultTheme);
	const [hintAllowed, setHintAllowed] = useState(false);

	const Toast = Swal.mixin({
		toast: true,
		position: "right",
		showConfirmButton: true,
	});

	const getHint = () => {
		let hints = [];
		guessMap.forEach((guess) => {
			let chance = Math.floor(Math.random() * guessMap.length);
			// Check if it's not the correct character
			if (guess.character !== answerMap[guessMap.indexOf(guess)].character) {
				if (chance <= 2) {
					hints.push({
						emoji: guess.emoji,
						character: answerMap[guessMap.indexOf(guess)].character,
					});
				}
			}
		});
		let hint = hints[Math.floor(Math.random() * hints.length)];

		if (hint) {
			Toast.fire({
				icon: "success",
				title: "You got a hint!",
				text:
					'The gods have given you a hint: "' +
					hint.character +
					'" is "' +
					hint.emoji +
					'"',
			});
		} else {
			Toast.fire({
				icon: "error",
				title: "The gods decided to not give you a hint this time.",
			});
		}
		setHintAllowed(false);
	};

	const regenSentence = () => {
		// let { sentence, theme } = generateRandomSentence();
		// let { emojifiedSentence, answerMap } = emojify(sentence, emojiMap);
		// let guessMap = [];
		// for (let i = 0; i < answerMap.length; i++) {
		// 	let chance = Math.floor(Math.random() * answerMap.length);
		// 	guessMap.push({
		// 		emoji: answerMap[i].emoji,
		// 		character: chance <= 2 ? answerMap[i].character : "",
		// 	});
		// }

		// guessMap = guessMap.filter((item, index) => {
		// 	return guessMap.indexOf(item) === index;
		// });

		// answerMap.forEach((char) => {
		// 	return JSON.stringify(char);
		// });

		// setSentence(sentence);
		// setEmojifiedSentence(emojifiedSentence);
		// setAnswerMap(answerMap);
		// setGuessMap(guessMap);
		// setCorrect(false);
		// setTheme(theme);
		window.location.reload();
	};

	const answerChange = (e, char) => {
		guessMap.forEach((guess) => {
			if (char.emoji === guess.emoji) {
				guess.character = e.target.value.toLowerCase();
				return guess;
			}
		});

		if (e.target.value.toLowerCase() == char.character) {
			e.target.disabled = true;
			e.target.style.borderColor = "green";
			setHintAllowed(true);
		} else {
			e.target.style.borderColor = "red";
		}
		setGuessMap(guessMap);
	};

	const checkAnswer = () => {
		let correct = true;
		guessMap.forEach((guess) => {
			if (guess.character !== "") {
				if (guess.character !== answerMap[guessMap.indexOf(guess)].character) {
					correct = false;
				}
			} else {
				correct = false;
			}
		});
		setCorrect(correct);
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
					{/* <p id="emoji-text" className="mx-auto">
						{sentence}
					</p> */}
					<p id="emoji-text" className="mx-auto">
						{emojifiedSentence}
						{/* <br />
						Guess:
						{sentence.split('').map(
							(char, index) => {
								
								if (
									guessMap[
										answerMap.indexOf({
											emoji: emojifiedSentence[index],
											character: char,
										})
									] === ""
								) {
									return char;
								}
							}
						)} */}
					</p>
				</section>
				{/* <button
					onClick={regenSentence}
					className="p-2 m-2 bg-cyan-500 rounded-md"
				>
					Regen
				</button> */}
				<section className="flex-col flex justify-center items-center">
					<div className="list-none inline-flex justify-center items-center flex-wrap">
						{answerMap.map((char) => (
							<div key={char.character} className="">
								<span>{char.emoji} :</span>
								<input
									className={`border-2 w-10 h-10 m-4 rounded-md text-center`}
									contentEditable
									defaultValue={guessMap[answerMap.indexOf(char)].character}
									disabled={
										guessMap[answerMap.indexOf(char)].character ===
										char.character
									}
									style={{
										borderColor:
											guessMap[answerMap.indexOf(char)].character ===
											char.character
												? "green"
												: guessMap[answerMap.indexOf(char)].character === ""
												? "lightgrey"
												: "red",
									}}
									onChange={(e) => answerChange(e, char)}
									maxLength="1"
								/>
							</div>
						))}
					</div>
					<button
						onClick={getHint}
						disabled={!hintAllowed}
						className={"p-2 m-2 bg-cyan-500 rounded-md" + (hintAllowed ? "" : " opacity-50 cursor-not-allowed")}
					>
						{hintAllowed ? 'Get Hint!' : 'Hint unavailable'}
					</button>
					{!correct ? (
						<button
							onClick={checkAnswer}
							className="p-2 m-2 bg-cyan-500 rounded-md "
						>
							Check answer
						</button>
					) : (
						<p className="text-3xl text-cyan-500">
							Congratulations! You completed the emojigram.
						</p>
					)}
				<textarea className="m-2 p-4" placeholder="Notes...." />
				</section>
			</main>
		</div>
	);
}

export function getServerSideProps() {
	let emojiMap = generateEmojiMap();
	let { sentence, theme } = generateRandomSentence();
	let { emojifiedSentence, answerMap } = emojify(sentence, emojiMap);
	let guessMap = [];
	for (let i = 0; i < answerMap.length; i++) {
		let chance = Math.floor(Math.random() * answerMap.length);
		guessMap.push({
			emoji: answerMap[i].emoji,
			character: chance <= 2 ? answerMap[i].character : "",
		});
	}

	guessMap = guessMap.filter((item, index) => {
		return guessMap.indexOf(item) === index;
	});

	answerMap.forEach((char) => {
		char = JSON.stringify(char);
	});
	return {
		props: {
			defaultEmojiMap: emojiMap,
			defaultSentence: sentence,
			defaultAnswerMap: answerMap,
			defaultEmojifiedSentence: emojifiedSentence,
			defaultGuessMap: guessMap,
			defaultTheme: theme,
		},
	};
}
