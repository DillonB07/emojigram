export default function emojify(sentence, emojiMap) {
	var answerMap = [];
	var emojifiedSentence = "";
	for (var char of sentence.toLowerCase()) {
		if (char in emojiMap) {
			emojifiedSentence += emojiMap[char];
			answerMap.push({ emoji: emojiMap[char], character: char });
		} else {
			emojifiedSentence += char;
		}
	}
	// Remove duplicate answers
	answerMap = answerMap.filter(
		(answer, index, self) =>
			index === self.findIndex((t) => t.character === answer.character)
	);

	console.log("Func-answerMap: ", answerMap);
	return { emojifiedSentence, answerMap };
}
