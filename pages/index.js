import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function index() {
	return (
		<div className="flex flex-col justify-center items-center text-center">
			<Head>
				<title>Emojigram</title>
				<meta
					name="description"
					content="Cryptograms are boring. Let's do emojigrams!"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header className="space-y-2 m-auto my-[8vh]">
				<h1 className="text-6xl font-bold">Emojigram</h1>
				<h3 className="text-2xl text-[#686868] dark:text-[#ABABAB]">
					<em>Cryptograms are boring. Let&apos;s do emojigrams!</em>
				</h3>
			</header>
			<main className="flex flex-col justify-center items-center text-center">
				<section className="flex-col flex justify-center items-center space-y-4 bg-[#686868] dark:bg-[#ABABAB] m-6 rounded-md p-4 max-w-xl dark:text-black text-white">
					<h2 className="text-3xl font-semibold text-[#ABABAB] dark:text-[#686868] ">
						<u>How to Play</u>
					</h2>
					<p>
						Are you new to emojigrams? Fear, not it&apos;s extremely simple to
						learn!
					</p>
					<ol className="mx-8">
						<li>
							1. You&apos;re given a sentence with all of the letters replaced
							with emojis.
						</li>
						<li>
							2. All of the characters are{" "}
							<strong>alphanumeric (numbers or letters)</strong> with no
							punctuation or case sensitive characters.
						</li>
						<li>3. You need to figure out what each emoji represents.</li>
						<li>
							4. Once you&apos;ve figured out what each emoji represents, you
							can type it in the box besides the emoji.
						</li>
						<li>
							5. Once you&apos;ve figured out all of the emojis, you can click
							the &quot;Check Answer&quot; button to see if you&apos;re correct!
						</li>
					</ol>
					<br />
					<p>
						If you enjoy, the project, leaving a like, follow or tip on Replit
						will be appreciated and go into more projects!
					</p>
					<br />
					<p>
						<em>Tutorial video coming soon...</em>
					</p>
					<div className="flex">
                        <Link href='/game'>
							<button className="p-2 m-2 bg-cyan-500 rounded-md hover:scale-125 duration-150">
								Get Started!
							</button>
                        </Link>
						<Link href="/__repl">
							<button className="p-2 m-2 bg-cyan-500 rounded-md hover:scale-125 duration-150">
								View Repl!
							</button>
						</Link>
					</div>
				</section>
			</main>
		</div>
	);
}
