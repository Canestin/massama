import React, { useState } from "react";
import { FaUserAlt, FaCalendarAlt, FaBuilding, FaMarker } from "react-icons/fa";
import styles from "./Inscription.module.css";
import Img1 from "../../images/profiles/1.jpeg";
import Img2 from "../../images/profiles/100.jpeg";
import Img3 from "../../images/profiles/32.jpeg";
import Img4 from "../../images/profiles/4.jpeg";
import Img5 from "../../images/profiles/5.jpeg";
import Img6 from "../../images/profiles/51.jpeg";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/store";

export default function Inscription() {
	return (
		<>
			<p className={styles.title}>
				Hommes et Femmes cherchent des coups d'un soir à Abidjan
			</p>
			<div className={styles.container}>
				<div className={styles.images}>
					<div className={styles.Img1}>
						<img src={Img1} alt="" />
					</div>
					<div>
						<img className={styles.Img2} src={Img2} alt="" />
					</div>

					<div>
						<img className={styles.Img3} src={Img3} alt="" />
					</div>

					<div>
						<img className={styles.Img4} src={Img4} alt="" />
					</div>
					<div>
						<img className={styles.Img5} src={Img5} alt="" />
					</div>

					<div>
						<img className={styles.Img6} src={Img6} alt="" />
					</div>
				</div>
				<div className={styles.formContainer}>
					<span className={styles.inscription}>INSCRIPTION RAPIDE</span>
					<Form />
				</div>
			</div>
		</>
	);
}

function Form() {
	const [age, setAge] = useState("");
	const [pseudo, setPseudo] = useState("");
	const [gender, setGender] = useState("");
	const [city, setCity] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!pseudo && !city && !gender && !age) {
			alert("Veuillez remplir tous les champs !");
			return;
		}

		if (age < 18) {
			alert("Vous devez être majeur pour vous inscrire !");
			return;
		}

		addUser(pseudo, 0, city, gender, true, age);
		navigate("/feed");
		localStorage.setItem("isFirsTime", "YES");
		// window.location.reload();
	};

	const handleAgeChange = (event) => {
		setAge(event.target.value);
	};

	const handlePseudoChange = (event) => {
		setPseudo(event.target.value);
	};

	const handleCityChange = (event) => {
		setCity(event.target.value);
	};

	const handleGenderChange = (event) => {
		setGender(event.target.value);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div>
				<div>
					<FaUserAlt className={styles.icon} />
				</div>
				<select
					id="gender"
					name="gender"
					value={gender}
					onChange={handleGenderChange}
					required
				>
					<option value="">Je suis</option>
					<option value="man">Homme</option>
					<option value="woman">Femme</option>
				</select>
			</div>
			<div>
				<div>
					<FaBuilding className={styles.icon} />
				</div>
				<select
					required
					id="city"
					name="city"
					value={city}
					onChange={handleCityChange}
				>
					<option value="">Sélectionnez votre ville</option>
					<option value="Abidjan">Abidjan</option>
					{/* <option value="canada">Yamoussoukro</option> */}
				</select>
			</div>
			<div>
				<div>
					<FaCalendarAlt className={styles.icon} />
				</div>
				<input
					type="number"
					id="age"
					name="age"
					value={age}
					placeholder="Age"
					onChange={handleAgeChange}
					required
				/>
			</div>
			<div>
				<div>
					<FaMarker className={styles.icon} />
				</div>
				<input
					type="text"
					id="pseudo"
					name="pseudo"
					value={pseudo}
					placeholder="Votre pseudo"
					onChange={handlePseudoChange}
					required
				/>
			</div>

			<div className={styles.CGU}>
				<input type="checkbox" id="cgu" name="cgu" required />
				<label>
					Je suis majeur(e) et j'accepte les{" "}
					<a href="http" target="_blank" rel="nofollow">
						CGU
					</a>{" "}
					et la{" "}
					<a href="http" target="_blank" rel="nofollow">
						Politique de vie privée
					</a>
				</label>
			</div>

			<button type="submit">DÉMARRER LA RECHERCHE</button>
		</form>
	);
}
