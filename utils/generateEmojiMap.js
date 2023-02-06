import { emojis } from "./constants";

export default function generateEmojiMap() {
	const alphabet = "abcdefghijklmnopqrstuvwxyz1234567890".split("");

	let emojiMap = {};
	let emojiList = [...emojis];
	for (let i = 0; i < alphabet.length; i++) {
		let index = Math.floor(Math.random() * emojiList.length);
		const emoji = emojiList[index];
		emojiList.splice(index, 1);
		const letter = alphabet[i];
		emojiMap[letter] = emoji;
	}
	return emojiMap;
}
let map = generateEmojiMap();
console.log(map);
