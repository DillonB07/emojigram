import { useState } from "react";
import { emojis } from "../utils";

export default function Emojis() {
	const [allEmojis, setAllEmojis] = useState(emojis);
	const [blankEmojis, setBlankEmojis] = useState([]);
    const [success, setSuccess] = useState();
	const addEmoji = (e) => {
		console.log(e.target.innerText);
		setAllEmojis(allEmojis.filter((emoji) => emoji !== e.target.innerText));
		setBlankEmojis([...blankEmojis, e.target.innerText]);
	};
	const removeEmoji = (e) => {
		console.log(e.target.innerText);
		setAllEmojis([...allEmojis, e.target.innerText]);
		setBlankEmojis(blankEmojis.filter((emoji) => emoji !== e.target.innerText));
	};
	const submit = async () => {
		console.log(blankEmojis);
		// Fetch /api/emojis and send blankEmojis in the payload
		await fetch("/api/emojis", {
			method: "POST",
			body: JSON.stringify({ blankEmojis }),
		})
			.then((res) => res.json())
			.then((res) => setSuccess(res.success));
	};
	return (
		<div className="m-4 text-center">
			<h1 className="text-5xl">Emojis</h1>
			{allEmojis.map((emoji) => (
				<span className="text-3xl" onClick={addEmoji} key={emoji}>
					{emoji}
				</span>
			))}
			<hr className="m-4" />
			<h1 className="text-5xl">Blank Emojis</h1>
			{blankEmojis.map((emoji, index) => (
				<span onClick={removeEmoji} className="text-3xl" key={index}>
					{emoji}
				</span>
			))}
			<hr />
			<button className="bg-cyan-500 rounded-md p-3 m-4" onClick={submit}>
				Submit Blank emojis
			</button>
            {success && <p>Successfully sent!</p>}
            {!success && success !== undefined && <p>Failure!</p>}
		</div>
	);
}
