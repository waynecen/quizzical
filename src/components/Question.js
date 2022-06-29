import { nanoid } from "nanoid";

export default function Question({ question, answers }) {
	const answerElements = answers.map((item) => {
		return <button key={nanoid()}>{item.value}</button>;
	});

	return (
		<div className="wrapper__question">
			<h2 className="question">{question}</h2>
			<p className="question__answer">{answerElements}</p>
		</div>
	);
}
