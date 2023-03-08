import "./App.css";
import DCA from "./components/DCA/DCA";
import Inscription from "./components/Inscription/Inscription";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Profiles from "./components/Profiles/Profiles";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Inscription />
			<DCA />
			<Footer />

			{/* <Profiles /> */}
		</div>
	);
}

export default App;
