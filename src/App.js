import React, { useState, useEffect } from "react";
import "./style.css";
import { nanoid } from "nanoid";
import { difficulties, categories } from "./components/data";
import StartPage from "./StartPage";
import Question from "./components/Question";
import Button from "./components/Button";

function App() {
	const [fetchData, setFetchData] = useState(false);
	const [quizStarted, setQuizStarted] = useState(false);
	const [triviaData, setTriviaData] = useState([]);
	const [selectedDifficulty, setSelectedDifficulty] = useState(
		difficulties[0]
	);
	const [selectedCategory, setSelectedCategory] = useState(categories[0]);

	useEffect(() => {
		async function getQuestions(category, difficulty) {
			const res = await fetch(
				`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
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
		getQuestions(selectedCategory, selectedDifficulty);
		// eslint-disable-next-line
	}, [fetchData]);

	function handleStartQuiz() {
		setFetchData(true);
		setQuizStarted(true);
		setSelectedCategory(getCategory());
		setSelectedDifficulty(getDifficulty());
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

		// insert correct answer randomly into other answers
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

	function getCategory() {
		const category = document
			.querySelector("#category")
			.getAttribute("value");

		return category;
	}

	function getDifficulty() {
		const difficulty = document.querySelector("#difficulty").innerText;

		let updatedDifficulty;
		if (difficulty === "Any Difficulty") {
			return "";
		} else {
			updatedDifficulty = difficulty.toLowerCase();
		}
		return updatedDifficulty;
	}

	return (
		<div className="App">
			{!quizStarted ? (
				<StartPage onClick={handleStartQuiz} />
			) : (
				<div className="Quiz">
					{quizElements}
					<Button text="Check Answers" />
				</div>
			)}
		</div>
	);
}

export default App;
