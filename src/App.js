import React, { useState, useEffect } from "react";
import "./style.css";
import StartPage from "./StartPage";
import Question from "./components/Question";
import { nanoid } from "nanoid";

function App() {
	const [quizStarted, setQuizStarted] = useState(false);
	const [triviaData, setTriviaData] = useState([]);
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		async function getQuestions() {
			const res = await fetch(
				`https://opentdb.com/api.php?amount=5&type=multiple`
			);
			const data = await res.json();
			data.results.map((result) => {
				return setQuestions((prev) => [
					...prev,
					{
						question: result.question,
						options: result.options,
					},
				]);
			});
			setTriviaData(data);
		}
		getQuestions();
	}, []);

	function handleStartQuiz() {
		setQuizStarted(true);
		console.log(triviaData);
		console.log(triviaData.results);
	}

	const quizElements = questions.map((item) => {
		return (
			<Question
				key={item.question}
				question={item.question}
				options={item.options}
			/>
		);
	});

	return (
		<div className="App">
			{!quizStarted ? (
				<StartPage onClick={handleStartQuiz} />
			) : (
				{ quizElements }
			)}
		</div>
	);
}

export default App;
