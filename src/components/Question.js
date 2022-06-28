export default function Question({ key, question, options }) {
	return (
		<div className="wrapper__question">
			<h2 className="question">{question}</h2>
			<p className="question__options">{options}</p>
		</div>
	);
}
