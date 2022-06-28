import Button from "./components/Button";
import BlobOne from "../src/img/blob1.png";
import BlobTwo from "../src/img/blob2.png";
import SelectCategory from "./components/SelectCategory";
import SelectDifficulty from "./components/SelectDifficulty";

export default function StartPage({ onClick }) {
	return (
		<main className="startPage">
			<img src={BlobTwo} className="blob-2" alt=""></img>
			<h1 className="title">Quizzical</h1>
			<p className="description">
				Five trivia questions to see how much you know about anything!
			</p>
			<SelectCategory />
			<SelectDifficulty />
			<Button text="Start quiz" onClick={onClick} />
			<img src={BlobOne} className="blob-1" alt=""></img>
		</main>
	);
}
