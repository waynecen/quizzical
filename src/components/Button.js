export default function Button({ text, onClick, onSubmit }) {
	return (
		<button className="button__start" onClick={onClick} onSubmit={onSubmit}>
			{text}
		</button>
	);
}
