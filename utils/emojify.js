export default function emojify(sentence, emojiMap) {
	let emojifiedSentence = sentence
		.toLowerCase()
		.split("")
		.map((char) => (emojiMap[char] ? emojiMap[char] : char));
	emojifiedSentence = emojifiedSentence.join("");
	return emojifiedSentence;
}
