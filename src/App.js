import "./App.css";
import React, { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import Profiles from "./components/Profiles/Profiles";
import NotFound from "./components/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";
import Conversations from "./components/Conversations/Conversations";
import UserContext from "./utils/UserContext";
import { fetchUserById } from "./utils/store";

function App() {
	const [user, setUser] = useState(null);
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		fetchUserById(userId, setUser);
	}, []);

	return (
		<UserContext.Provider value={user}>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/profiles" element={<Profiles />} />
					<Route path="/conversations" element={<Conversations />} />
					<Route path="/conversations/:username" element={<Conversations />} />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</div>
		</UserContext.Provider>
	);
}

export default App;
