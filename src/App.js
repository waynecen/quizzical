import React, { useState, useEffect } from "react";
import { difficulties, categories } from "./components/data";
import { nanoid } from "nanoid";
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
	const [count, setCount] = React.useState(0);
	const [review, setReview] = React.useState(false);

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
		setTriviaData([]);
		setFetchData((prev) => !prev);
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

	function selectAnswer(e, selectedAnswer) {
		const selectedQuestion = triviaData.find((item) => {
			return item.answers.find((answer) => {
				return answer.value === selectedAnswer;
			});
		});

		let activeSelection = selectedQuestion.answers.find(
			(answer) => answer.isSelected
		);

		if (!activeSelection || activeSelection.value === selectedAnswer) {
			e.target.classList.toggle("selected");
			setTriviaData((prevData) => {
				return prevData.map((item) => {
					return {
						...item,
						answers: item.answers.map((answer) => {
							return answer.value === selectedAnswer
								? { ...answer, isSelected: !answer.isSelected }
								: answer;
						}),
					};
				});
			});
		}
	}

	function checkAnswers(text) {
		if (text === "Play Again") {
			setTriviaData([]);
			setQuizStarted(false);
			setCount(0);
			setReview(false);
			setFetchData((prev) => !prev);
		} else {
			triviaData.forEach((item) => {
				item.answers.forEach((answer) => {
					if (answer.isSelected && answer.isCorrect) {
						setCount((prev) => prev + 1);
					}
				});
			});
			setReview(true);
		}
	}

	const quizElements = triviaData.map((item) => {
		return (
			<Question
				key={nanoid()}
				id={item.id}
				question={item.question}
				answers={item.answers}
				selectAnswer={selectAnswer}
				isSelected={item.isSelected}
				review={review}
			/>
		);
	});

	return (
		<div className="App">
			{!quizStarted ? (
				<StartPage onClick={handleStartQuiz} />
			) : (
				<div className="Quiz">
					{quizElements}
					<div className="wrapper__result">
						{review && (
							<p className="result">You scored: {count}/5</p>
						)}
						<Button
							text={review ? "Play Again" : "Check Answers"}
							onClick={(e) => checkAnswers(e.target.textContent)}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
