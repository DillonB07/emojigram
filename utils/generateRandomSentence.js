import { themes, vowels } from "./constants";

export default function generateRandomSentence() {
	let theme = themes[Math.floor(Math.random() * themes.length)];
	let type = Math.floor(Math.random() * 10);
	let sentence;
	if (type == 10) {
		sentence =
			theme.sentences[Math.floor(Math.random() * theme.sentences.length)];
	} else {
		let starter =
			theme.starters[Math.floor(Math.random() * theme.starters.length)];
		let article =
			theme.articles[Math.floor(Math.random() * theme.articles.length)];
		let adjective =
			theme.adjectives &&
			theme.adjectives[Math.floor(Math.random() * theme.adjectives.length)];

		if (adjective) {
			if (vowels.includes(adjective[0])) {
				article = article.replace(" a", " an");
			}
		}
		let end = theme.ends[Math.floor(Math.random() * theme.ends.length)];
		sentence = `${starter} ${article} ${
			adjective ? adjective + " " : ""
		}${end}`;
	}
	return sentence;
}
