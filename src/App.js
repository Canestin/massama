import "./App.css";
import Home from "./components/Home/Home";
import Profiles from "./components/Profiles/Profiles";
import NotFound from "./components/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";
import Conversations from "./components/Conversations/Conversations";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/profiles" element={<Profiles />} />
				<Route path="/conversations" element={<Conversations />} />
				<Route path="/conversations/:userId" element={<Conversations />} />
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
