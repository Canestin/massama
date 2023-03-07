import "./App.css";
import DCA from "./components/DCA/DCA";
import Inscription from "./components/Inscription/Inscription";
import Navbar from "./components/Navbar/Navbar";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Inscription />
			<DCA />
		</div>
	);
}

export default App;
