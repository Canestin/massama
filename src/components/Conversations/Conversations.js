import React, { useEffect, useRef, useState } from "react";
import styles from "./Conversations.module.css";
import { Link } from "react-router-dom";
import { imageMap } from "../../utils/helpers";
import { IoSend } from "react-icons/io5";
import Menu from "../Menu/Menu";
import { useParams } from "react-router-dom";
import { fetchUserByUsername, useStore, addMessage } from "../../utils/store";

const loggedUserId = localStorage.getItem("userId");

export default function Conversations() {
	const [inputValue, setInputValue] = React.useState("");
	// const [channelss, setChannels] = useState([]);
	const [user, setUser] = useState(null);
	const messagesEndRef = useRef(null);
	const { username } = useParams();
	const channelId = username;
	const { channels, messages } = useStore({ channelId });

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	console.log("messages de chez messages : ", messages);
	console.log("channels de chez channels : ", channels);

	useEffect(() => {
		messagesEndRef.current.scrollIntoView({
			block: "end",
			// behavior: "smooth",
		});
	}, [messages]);

	useEffect(() => {
		// let speaker;

		// for (const user in channels) {
		// 	if (channel[user].id !== loggedUserId) {
		// 		speaker = channel[user];
		// 		console.log("Speaker de chez Speaker", speaker);
		// 	}
		// }

		fetchUserByUsername(username, setUser);
		// const u = channels.find((u) => u.username === username);
		// setUser(u);
	}, [username]);

	const handleSendMessage = () => {
		addMessage(inputValue, channelId, loggedUserId);
		setInputValue("");
	};

	return (
		<div className={styles.bigContainer}>
			<div className="menu">
				<Menu />
			</div>
			<div className={styles.container}>
				<div className={styles.containerProfiles}>
					<div className={styles.containerListConv}>
						{channels.map((channel) => {
							let speaker;

							for (const user in channel) {
								if (channel[user].id !== loggedUserId) {
									speaker = channel[user];
									console.log("Speaker de chez Speaker", speaker);
								}
							}

							return (
								<Link
									key={`conversations/${speaker?.id}`}
									to={`/conversations/${speaker?.username}`}
								>
									<Conv profile={speaker} />
								</Link>
							);
						})}
					</div>
				</div>
				<div className={styles.containerConv}>
					<div className={styles.userInfosMessage}>
						<img
							style={{ objectFit: "cover", objectPosition: "top" }}
							src={imageMap[user?.avatar]}
							alt="women"
						/>
						<div>
							<span style={{ color: "white" }}>
								{user?.username}, {user?.age} ans
							</span>
							<span style={{ color: "gray" }}>{user?.city}</span>
						</div>
					</div>

					<div className={styles.messagesConv}>
						{messages.map((message) => (
							<Message message={message} />
						))}
						<div ref={messagesEndRef} style={{ height: 0 }} />
					</div>

					<div className={styles.inputMesssage}>
						<div>
							<input
								value={inputValue}
								onChange={handleInputChange}
								placeholder="Entrer votre message"
								type="text"
							/>
							<div onClick={handleSendMessage}>
								<IoSend size={22} color="white" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function Conv({ profile }) {
	return (
		<div className={styles.conv}>
			<div>
				<img
					style={{ objectFit: "cover", objectPosition: "top" }}
					src={imageMap[profile?.avatar]}
					alt="women"
				/>
			</div>

			<div className={styles.infosprofile}>
				<div className={styles.nameAndHour}>
					<span style={{ color: "white" }}>{profile.username}</span>
					<span style={{ color: "gray", fontSize: "11px" }}>
						Il y a 10 minutes
					</span>
				</div>
				<span style={{ color: "gray" }}>Bonjour Luck ! Comment tu vas ?</span>
			</div>
		</div>
	);
}

function Message({ message }) {
	const type = message.author_id === loggedUserId ? "me" : "other";

	return (
		<div
			className={`${styles.message} ${
				type === "other" ? styles.otherMessage : styles.myMessage
			}`}
		>
			<span>{message.message}</span>
		</div>
	);
}
