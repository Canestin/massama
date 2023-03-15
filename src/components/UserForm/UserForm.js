import React, { useState } from "react";
import supabase from "../../utils/supabase";
import styles from "./UserForm.module.css";

function UserForm() {
	const [username, setUsername] = useState("");
	const [avatar, setAvatar] = useState("");
	// const [city, setCity] = useState("");
	// const [gender, setGender] = useState("");
	// const [nixoups, setNixoups] = useState(false);
	const [age, setAge] = useState(0);
	const [formError, setFormError] = useState("");
	const [formSuccess, setFormSuccess] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { data, error } = await supabase.from("profiles").insert([
			{
				username,
				avatar,
				// city,
				// gender,
				// nixoups,
				age,
			},
		]);

		if (error) {
			setFormError(error.message);
			setFormSuccess(false);
		} else {
			setFormError("");
			setFormSuccess(true);
			console.log("Data de chez data", data);
			setUsername("");
			setAvatar(avatar);
			// setCity("");
			// setGender("");
			// setNixoups(false);
			setAge(0);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<label>
					Username:
					<input
						type="text"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value);
							setFormSuccess(false);
						}}
					/>
				</label>
				<br />
				<label>
					Avatar:
					<input
						type="number"
						value={avatar}
						onChange={(e) => setAvatar(e.target.value)}
					/>
				</label>
				<br />
				{/* <label>
				City:
				<input
					type="text"
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
			</label>
			<br />
			<label>
				Gender:
				<input
					type="text"
					value={gender}
					onChange={(e) => setGender(e.target.value)}
				/>
			</label>
			<br />
			<label>
				Nixoups:
				<input
					type="checkbox"
					checked={nixoups}
					onChange={(e) => setNixoups(e.target.checked)}
				/>
			</label>
			<br /> */}
				<label>
					Age:
					<input
						type="number"
						value={age}
						onChange={(e) => setAge(e.target.value)}
					/>
				</label>
				<br />
				<button type="submit">Create User</button>
			</form>
			<h2 style={{ color: "red" }}>{formError}</h2>
			{formSuccess && <h2 style={{ color: "green" }}>Success</h2>}
		</>
	);
}

export default UserForm;
