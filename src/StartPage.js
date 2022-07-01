import Button from "./components/Button";
import BlobOne from "../src/img/blob1.png";
import BlobTwo from "../src/img/blob2.png";
import Dropdown from "./components/Dropdown";
import { categories, difficulties } from "./components/data";

export default function StartPage({ onClick }) {
	return (
		<main className="startPage">
			<img src={BlobTwo} className="blob-2" alt=""></img>
			<h1 className="title">Quizzical</h1>
			<p className="description">
				Five trivia questions to see how much you know about anything!
			</p>
			<form>
				<Dropdown items={categories} />
				<Dropdown items={difficulties} />
				<Button text="Start quiz" onClick={onClick} />
			</form>
			<img src={BlobOne} className="blob-1" alt=""></img>
		</main>
	);
}
