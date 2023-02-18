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
    const [userSentence, setUserSentence] = useState('')
    const [answerMap, setAnswerMap] = useState(defaultAnswerMap);
    const [guessMap, setGuessMap] = useState(defaultGuessMap);
    const [correct, setCorrect] = useState(false);
    const [theme, setTheme] = useState(defaultTheme);
    const [hintsLeft, setHintsLeft] = useState(3);
    // const[displaySentence, setDisplaySentence] = useState(defaultEmojifiedSentence.split("").map((char) => char == '' ? '!' : char).join(" "));

    const Toast = Swal.mixin({
        // toast: true,
        showConfirmButton: true,
        background: '#6C6C6C',
        color: 'white'
    });

    const getHint = () => {
        if (hintsLeft == 0) {
            Toast.fire({
                icon: "error",
                title: "You've used up all of your hints!",
            });
        }
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
        setHintsLeft(hintsLeft - 1);
    };
    // console.log('Sentence', sentence)

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
        } else {
            e.target.style.borderColor = "red";
        }
        setGuessMap(guessMap);
    };

    const checkAnswer = () => {
        if (sentence.toLocaleLowerCase() == userSentence.toLocaleLowerCase()) {
            Toast.fire({
                title: 'Congratulations!',
                icon: 'success',
                text: `You did it! The sentence was "${sentence}"`,
                confirmButtonText: 'Play Again',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    regenSentence()
                }
            })
            setCorrect(true)
        } else {
            Toast.fire({
                title: 'Oops',
                icon: 'error',
                text: 'Unfortunately, that\'s not quite right.',
                confirmButtonText: 'Try Again'
            })
        }
    };

    return (
        <div className="flex flex-col justify-center items-center text-center">
            <Head>
                <title>Em🅾️jigram 🤪</title>
                <meta
                    name="description"
                    content="Cryptograms are boring. Let's do emojigrams!"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="space-y-2 m-auto my-5">
                <h1 className="text-6xl font-bold">Em🅾️jigram 🤪</h1>
                <h3 className="text-2xl text-[#686868] dark:text-[#ABABAB]">
                    <em>Cryptograms are boring. Let&apos;s do emojigrams!</em>
                </h3>
                    <p className='mx-10'>Sentence Theme: {theme}</p>
            </header>
            <main className="flex flex-col justify-center items-center text-center max-w-[60vw] min-w-[300px]">
                <section className="flex-col flex justify-center items-center">
                    <p
                        id="emoji-text"
                        className="mx-10 rounded-md bg-[#DDDDDD] dark:bg-[#252525] p-2"
                    >
                        {emojifiedSentence
                            .split("")
                            .map((char) =>
                                char == " " ? (
                                    <span key={char}> | </span>
                                ) : (
                                    <span key={char}>{char}</span>
                                )
                            )}
                    </p>
                    <input id='sentence'
                        className='mx-10 my-3 rounded-md bg-[#DDDDDD] dark:bg-[#252525] p-2'
                        type='text'
                        placeholder="Enter the sentence..."
                        onChange={(e) => setUserSentence(e.target.value)}
                    />
                    <div className="list-none inline-flex justify-center items-center flex-wrap mx-[7vw] my-[3vh] max-w-2xl">
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
                                        cursor:
                                            guessMap[answerMap.indexOf(char)].character ===
                                            char.character && "not-allowed",
                                    }}
                                    onChange={(e) => answerChange(e, char)}
                                    maxLength="1"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex">
                    <button
                        onClick={getHint}
                        disabled={hintsLeft == 0}
                        className={
                            "p-2 m-2 bg-cyan-500 rounded-md hover:scale-125 duration-150" +
                            (hintsLeft !== 0 ? " cursor-pointer" : " opacity-50 cursor-not-allowed")
                        }
                    >
                        {hintsLeft !== 0 ? "Get Hint!" : "Hint unavailable"}
                    </button>

                    <button
                        onClick={checkAnswer}
                        className="p-2 m-2 bg-cyan-500 rounded-md hover:scale-125 duration-150"
                    >
                        Check Answer
                    </button>
                    {correct && ( <button
                        onClick={regenSentence}
                        className="p-2 m-2 bg-cyan-500 rounded-md hover:scale-125 duration-150"
                    >
                        Play again
                    </button>)}
                    </div>

                    <textarea className="m-2 p-4 rounded-md" cols={2} placeholder="A space to work and make notes...." />
                    <p className="text-[#686868] dark:text-[#ABABAB] max-w-xl">
                        <em>
                            Note: The sentence is randomly generated and is not always
                            accurate and does not represent my beliefs.
                        </em>
                    </p>
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
