import React, { useState } from "react";
import { FaUserAlt, FaCalendarAlt, FaBuilding, FaMarker } from "react-icons/fa";
import styles from "./Inscription.module.css";
import Img1 from "../../images/profiles/1.jpeg";
import Img2 from "../../images/profiles/100.jpeg";
import Img3 from "../../images/profiles/32.jpeg";
import Img4 from "../../images/profiles/4.jpeg";
import Img5 from "../../images/profiles/5.jpeg";
import Img6 from "../../images/profiles/51.jpeg";
import Img7 from "../../images/profiles/45.jpeg";
import Img8 from "../../images/profiles/33.jpeg";
import Img9 from "../../images/profiles/67.jpeg";
import { useNavigate } from "react-router-dom";
import { addNixMessage, addUser } from "../../utils/store";
import Header from "../Header/Header";
import { useContext } from "react";
import UserContext from "../../utils/UserContext";
import { welcomeMessage } from "../../utils/store";
import { Helmet } from "react-helmet";

export default function Inscription() {
	return (
		<>
			<Helmet>
				<title>MeetBlack</title>
				<meta name="theme-color" content="#ffffff" />

				<meta
					name="description"
					content="Rencontrer des filles sympas à Abidjan"
				/>
				<meta property="og:title" content="MeetBlack" />
				<meta
					property="og:description"
					content="Rencontrer des filles sympas à Abidjan"
				/>
				<meta property="og:url" content="https://meetblack.fun/conversations" />
				<meta property="og:type" content="website" />
			</Helmet>

			<div className={styles.biggy}>
				<Header />
				<div className={styles.biggyContainer}>
					<div className={styles.title}>
						<p style={{ marginBottom: 10 }}>
							Des femmes cherchent des coups d'un soir à{" "}
							<span style={{ color: "rgb(64, 64, 211)" }}>Abidjan</span>
						</p>
						<span>Seras-tu à la hauteur de leurs attentes ?</span>
					</div>

					<div className={styles.container}>
						<div className={styles.images}>
							{[Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9].map(
								(img, index) => {
									return (
										<div key={index}>
											<img src={img} alt="" />
										</div>
									);
								}
							)}
						</div>
						<div className={styles.formContainer}>
							<span className={styles.inscription}>INSCRIPTION RAPIDE</span>
							<Form />
						</div>
					</div>
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
	const [pseudoError, setPseudoError] = useState(false);
	const { updateUserContext } = useContext(UserContext);

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { user_id, error } = await addUser(
			pseudo,
			0,
			city,
			gender,
			false,
			age
		);

		if (error?.message.includes("duplicate")) {
			setPseudoError(true);
		}
		if (user_id) {
			setTimeout(async () => {
				await addNixMessage(
					"Bonjour mon chou ça va ?",
					"1503aa79-aaf3-4522-a85f-e37764cc78b4"
				);
				await addNixMessage(
					"Salut, tu recherches une personne de quelle tranche d'âge ?",
					"e58b844d-bb90-4b43-afb5-928b227018e8"
				);
				await addNixMessage(
					"Salut, tu veux aussi un coup d'un soir ?",
					"d210e011-2e97-4bed-a83a-1fd4f9d18343"
				);
			}, 30000);
			localStorage.setItem("isFirsTime", "YES");
			localStorage.setItem("userId", user_id);
			updateUserContext("id", user_id);
			navigate("/feed");
		}
	};

	const handleAgeChange = (event) => {
		setAge(event.target.value);
	};

	const handlePseudoChange = (event) => {
		if (pseudoError) setPseudoError(false);
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
					min={18}
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
			{pseudoError && (
				<span style={{ color: "red", fontSize: 14 }}>
					Ce pseudo est déjà pris !
				</span>
			)}

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
