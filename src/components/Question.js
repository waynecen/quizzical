import { nanoid } from "nanoid";

export default function Question({
	id,
	question,
	answers,
	selectAnswer,
	review,
}) {
	function setClass(answer) {
		if (review) {
			if (answer.isSelected && !answer.isCorrect) {
				return "btn-incorrect";
			} else if (answer.isCorrect) {
				return "btn-correct";
			} else {
				return "notSelected";
			}
		} else if (answer.isSelected) {
			return "selected";
		} else {
			return "notSelected";
		}
	}

	const answerElements = answers.map((item) => {
		return (
			<button
				id={id}
				key={nanoid()}
				className={setClass(item)}
				onClick={(event) => selectAnswer(event, item.value)}
			>
				{item.value}
			</button>
		);
	});

	return (
		<div className="wrapper__question">
			<h2 className="question">{question}</h2>
			<p className="question__answer">{answerElements}</p>
		</div>
	);
}
