import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { Helmet } from "react-helmet";
// import supabase from "../../utils/supabase";
// import { iLike } from "../../data";

export default function NotFound() {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	// useEffect(() => {
	// 	const date = new Date(
	// 		Date.now() + 100 * 1000 * 60 * 60 * 24 * 365
	// 	).toUTCString();
	// 	document.title = "Page introuvable";
	// 	document.cookie = "uuid1=Canestin; expires=" + date + "; path=/";
	// 	document.cookie =
	// 		"auth-uuid=Canestin; expires=" + date + "; domaine=meetblack.fun";
	// }, []);

	// useEffect(() => {
	// 	const updateUser = async (userId) => {
	// 		try {
	// 			await supabase.from("profiles").update({ wallet: 0 }).eq("id", userId);
	// 		} catch (error) {
	// 			alert("Erreur lors de la mise à jour des users !");
	// 			console.log("error", error);
	// 		}
	// 	};

	// 	// eslint-disable-next-line no-unused-expressions
	// 	updateUser();
	// }, []);

	useEffect(() => {
		setTimeout(() => {
			if (!user) navigate("/");
			else navigate("/feed");
		}, 2000);
	}, []);

	return (
		<>
			<Helmet>
				<title>Page non trouvée</title>
				<meta property="og:image" content="https://meetblack.fun/logo.png" />
				<meta property="og:title" content="Page non trouvée" />
			</Helmet>

			<div
				style={{
					width: "100vw",
					height: "70vh",
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
					color: "white",
					marginTop: 20,
				}}
			>
				<h1 style={{ marginBottom: 50 }}>Page non trouvée</h1>
				<p>Redirection...</p>
			</div>
		</>
	);
}
