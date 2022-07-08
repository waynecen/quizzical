export default function Button({ text, onClick }) {
	return (
		<button className="button__start" onClick={onClick}>
			{text}
		</button>
	);
}
