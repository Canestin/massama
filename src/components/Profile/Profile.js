import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchUserById, useStore } from "../../utils/store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styles from "./Profile.module.css";
import { imageMap } from "../../utils/helpers";

export default function Profile() {
	const [user, setUser] = useState(null);
	const { userId } = useParams();
	const { channels } = useStore();
	const navigate = useNavigate();

	useEffect(() => {
		fetchUserById(userId, setUser);
	}, [userId]);

	const handleGoToChat = () => {
		const existingChannel = channels.find((speaker) => speaker.id === userId);
		if (existingChannel) navigate(`/conversations/${existingChannel.id}`);
		else navigate(`/conversations/new-channel`, { state: user });
	};

	return !user ? (
		<div className={styles.loadingContainer}>
			<AiOutlineLoading3Quarters className={styles.loading} color="white" />
		</div>
	) : (
		<div className={styles.div}>
			<img
				className={styles.profileImg}
				src={imageMap[user.avatar]}
				alt={`profile de ${user.username}`}
			/>
			<h1 className={styles.h1}> {user.username}</h1>
			<div onClick={handleGoToChat} className={styles.a}>
				Envoyer un message
			</div>
		</div>
	);
}
