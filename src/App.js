import React, { useState, useEffect } from "react";
import "./style.css";
import StartPage from "./StartPage";
import Question from "./components/Question";
import { nanoid } from "nanoid";

function App() {
	// eslint-disable-next-line
	const [fetchData, setFetchData] = useState(false);
	const [quizStarted, setQuizStarted] = useState(false);
	const [triviaData, setTriviaData] = useState([]);

	useEffect(() => {
		async function getQuestions() {
			const res = await fetch(
				`https://opentdb.com/api.php?amount=2&type=multiple`
			);
			const data = await res.json();

			data.results.map((result) => {
				return setTriviaData((prev) => [
					...prev,
					{
						id: nanoid(),
						question: decodeString(result.question),
						answers: scrambleAnswers([
							...result.incorrect_answers,
							result.correct_answer,
						]),
					},
				]);
			});
		}
		getQuestions();

		// eslint-disable-next-line
	}, [fetchData]);

	function handleStartQuiz() {
		setQuizStarted(true);
	}

	function decodeString(question) {
		const txt = document.createElement("textarea");
		txt.innerHTML = question;
		return txt.value;
	}

	function scrambleAnswers(arr) {
		const answer = decodeString(arr.pop());
		const newArray = arr.map((ans) => decodeString(ans));
		const randomNumber = Math.floor(Math.random() * 4);

		newArray.splice(randomNumber, 0, answer);

		const answersArray = newArray.map((item) => {
			return {
				value: item,
				isCorrect: item === answer ? true : false,
				isSelected: false,
			};
		});
		return answersArray;
	}

	const quizElements = triviaData.map((item) => {
		return (
			<Question
				key={item.id}
				id={item.id}
				question={item.question}
				answers={item.answers}
			/>
		);
	});

	return (
		<div className="App">
			{!quizStarted ? (
				<StartPage onClick={handleStartQuiz} />
			) : (
				<div className="Quiz">{quizElements}</div>
			)}
		</div>
	);
}

export default App;
