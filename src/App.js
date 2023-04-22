import React, { useState, useEffect } from "react";
import Feed from "./components/Feed/Feed";
import Profile from "./components/Profile/Profile";
import NotFound from "./components/NotFound/NotFound";
import { Routes, Route, Navigate } from "react-router-dom";
import Conversations from "./components/Conversations/Conversations";
import UserContext from "./utils/UserContext";
import { fetchUserById } from "./utils/store";
import Wallet from "./components/Wallet/Wallet";
import Inscription from "./components/Inscription/Inscription";

function App() {
	const [user, setUser] = useState(null);
	const userId = localStorage.getItem("userId");

	useEffect(() => {
		if (userId || user?.id) {
			fetchUserById(userId, setUser);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, user?.id]);

	const updateUserContext = (column, newValue, isIncrementable) => {
		if (isIncrementable) {
			setUser((user) => ({ ...user, [column]: user[[column]] + newValue }));
		} else {
			setUser((user) => ({ ...user, [column]: newValue }));
		}
	};

	return (
		<UserContext.Provider value={{ user, updateUserContext }}>
			<div className="App">
				<Routes>
					<Route
						path="/"
						element={!!userId ? <Navigate to="/feed" /> : <Inscription />}
					/>
					<Route
						path="/feed"
						element={!userId ? <Navigate to="/" /> : <Feed />}
					/>
					<Route
						path="/wallet"
						element={!userId ? <Navigate to="/" /> : <Wallet />}
					/>
					<Route
						path="/profile/:userId"
						element={!userId ? <Navigate to="/" /> : <Profile />}
					/>
					<Route
						path="/conversations"
						element={!userId ? <Navigate to="/" /> : <Conversations />}
					/>
					<Route
						path="/conversations/:channelId"
						element={!userId ? <Navigate to="/" /> : <Conversations />}
					/>
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</div>
		</UserContext.Provider>
	);
}

export default App;
