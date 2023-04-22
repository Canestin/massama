import React from "react";
// import supabase from "../../utils/supabase";
// import { iLike } from "../../data";

export default function NotFound() {
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

	return (
		<h1 style={{ textAlign: "center", color: "white", marginTop: 20 }}>
			NotFound
		</h1>
	);
}
