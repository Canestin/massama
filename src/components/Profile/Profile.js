import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserById, useStore } from "../../utils/store";
import { AiOutlineLoading3Quarters, AiOutlineArrowLeft } from "react-icons/ai";
import styles from "./Profile.module.css";
import { imageMap } from "../../utils/helpers";

export default function Profile() {
	const [user, setUser] = useState(null);
	const { userId } = useParams();
	const { channels } = useStore();
	const navigate = useNavigate();

	useEffect(() => {
		const fu = async () => {
			const u = await fetchUserById(userId, setUser);
			setTimeout(() => {
				if (!u) {
					navigate("/feed");
				}
			}, 2000);
		};

		fu();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	console.log("userId de chez user : ", userId);
	console.log("channels de chez channels : ", channels);
	const handleGoToChat = () => {
		const existingChannel = channels.find(
			(channel) => channel.speaker.id === userId
		);
		if (existingChannel) navigate(`/conversations/${existingChannel.id}`);
		else navigate(`/conversations/new-channel`, { state: user });
	};

	return (
		<div className={styles.container}>
			{!user ? (
				<div className={styles.loadingContainer}>
					<AiOutlineLoading3Quarters className={styles.loading} color="white" />
				</div>
			) : (
				<div className={styles.userDiv}>
					<div className={styles.user}>
						<img
							className={styles.profileImg}
							src={imageMap[user.avatar]}
							alt={`profile de ${user.username}`}
						/>
						<div className={styles.containerName}>
							<div className={styles.online} />
							<p className={styles.name}> {user.username}</p>
						</div>
						<span className={styles.userInfos}>
							{user?.age} ans - {user?.city}
						</span>

						<div onClick={handleGoToChat} className={styles.sendMessage}>
							Envoyer un message
						</div>
					</div>
					<div className={styles.like}>
						<span className={styles.title}>Ce que j'aime</span>
						<div className={styles.likeWords}>
							{user?.ilike.map((like, index) => (
								<span key={index}>{like}</span>
							))}
						</div>
					</div>

					<div className={`${styles.like} ${styles.informations}`}>
						<span className={styles.title}>Informations</span>
						<div className={styles.infosList}>
							<div>
								<span>Sexe</span>
								<span>Femme</span>
							</div>
							<div>
								<span>Recherche</span>
								<span>Homme</span>
							</div>

							<div>
								<span>Taille</span>
								<span>{user?.height} m</span>
							</div>
							<div>
								<span>Poids</span>
								<span>Non cmmuniqué</span>
							</div>
							<div>
								<span>Couleur des yeux</span>
								<span>Marron</span>
							</div>
							<div>
								<span>Situation</span>
								<span>Célibataire</span>
							</div>
							<div>
								<span>Origine</span>
								<span>Ivoirienne</span>
							</div>
							<div>
								<span>Enfants</span>
								<span>Pas d'enfants</span>
							</div>
							<div>
								<span>Logement</span>
								<span>Je vis seule</span>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className={styles.goBack}>
				<AiOutlineArrowLeft
					size={25}
					color="white"
					onClick={() => navigate(-1)}
				/>
			</div>
		</div>
	);
}
