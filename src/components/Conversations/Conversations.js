import React, { useEffect, useRef, useState } from "react";
import styles from "./Conversations.module.css";
import { Link, useLocation } from "react-router-dom";
import { imageMap } from "../../utils/helpers";
import { IoSend } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";
import Menu from "../Menu/Menu";
import { useParams } from "react-router-dom";
import {
	useStore,
	addMessage,
	addChannel,
	updateChannel,
	getUserFromChannels,
} from "../../utils/store";

const loggedUserId = localStorage.getItem("userId");

export default function Conversations() {
	const [inputValue, setInputValue] = React.useState("");
	const [user, setUser] = useState(null);
	const messagesEndRef = useRef(null);
	const { channelId } = useParams();
	const { channels, messages } = useStore({ channelId });

	const location = useLocation();

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	// console.log("messages de chez messages : ", messages);
	useEffect(() => {
		if (!channelId) {
			if (channels.length > 0) {
				setUser(channels[0].speaker);
			}
		} else if (channelId === "new-channel") {
			setUser(location.state);
		} else {
			getUserFromChannels(channels, channelId, setUser);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [channelId, channels]);
	useEffect(() => {
		messagesEndRef.current.scrollIntoView({
			block: "end",
			// behavior: "smooth",
		});
		// if (!!channelId && channelId !== "new-channel")
		// 	getUserFromMessages(messages, setUser);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [messages]);

	const handleKeyDown = async (event) => {
		if (event.key === "Enter") {
			await handleSendMessage();
		}
	};

	const handleSendMessage = async () => {
		const existingChannel = channels.find(
			(channel) => channel.speaker.id === user.id
		);

		if (!existingChannel) {
			const newChannelId = await addChannel(user.id, inputValue);
			addMessage(inputValue, loggedUserId, user.id, newChannelId);
		} else {
			updateChannel(existingChannel.id, inputValue);
			addMessage(inputValue, loggedUserId, user.id, existingChannel.id);
		}

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
						{!!channels &&
							channels.map((channel) => {
								return (
									<Link
										key={`conversations/${channel?.id}`}
										to={`/conversations/${channel?.id}`}
									>
										<Conv profile={channel} />
									</Link>
								);
							})}
					</div>
				</div>
				<div className={styles.containerConv}>
					<div className={styles.userInfosMessage}>
						<div style={{ position: "relative" }}>
							<img
								style={{ objectFit: "cover", objectPosition: "top" }}
								src={imageMap[user?.avatar]}
								alt="women"
							/>
							<div className={`${styles.statusLine} ${styles.online}`} />
						</div>
						<div style={{ marginLeft: 15 }}>
							<span style={{ color: "white" }}>
								{user?.username}, {user?.age} ans
							</span>
							<span style={{ color: "gray" }}>{user?.city}</span>
						</div>
					</div>

					<div className={styles.messagesConv}>
						{messages?.map((message) => (
							<Message key={message?.id} message={message} />
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
								onKeyDown={handleKeyDown}
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
	const [formattedDate, setFormattedDate] = useState("");

	useEffect(() => {
		const date = new Date(profile.lastMessageDate);
		const today = new Date();
		const yesterday = new Date(today.setDate(today.getDate() - 1));
		const lastWeek = new Date(today.setDate(today.getDate() - 7));

		const dayNames = [
			"Dimanche",
			"Lundi",
			"Mardi",
			"Mercredi",
			"Jeudi",
			"Vendredi",
			"Samedi",
		];
		const options = {
			hour: "numeric",
			minute: "numeric",
			hour12: false,
		};
		if (date.toDateString() === today.toDateString()) {
			// If the message was sent today
			const time = date.toLocaleTimeString("fr-FR", options);
			setFormattedDate(time);
		} else if (date.toDateString() === yesterday.toDateString()) {
			// If the message was sent yesterday
			setFormattedDate("Hier");
		} else if (date.toDateString() === lastWeek.toDateString()) {
			// If the message was sent last week
			const dayName = dayNames[date.getDay()];
			setFormattedDate(dayName);
		} else {
			// If the message was sent last week
			// const d = date.toLocaleDateString("fr-FR");
			// setFormattedDate(d);
			const time = date.toLocaleTimeString("fr-FR", options);
			setFormattedDate(time);
		}
	}, [profile, profile.lastMessageDate]);

	let lastMessage = "";
	const sizeOfLastMessage = profile.lastMessage.length;
	if (sizeOfLastMessage > 20)
		lastMessage = profile.lastMessage.slice(0, 20).concat("...");
	else lastMessage = profile.lastMessage;

	return (
		<div className={styles.conv}>
			<div>
				<img
					style={{ objectFit: "cover", objectPosition: "top" }}
					src={imageMap[profile?.speaker?.avatar]}
					alt="women"
				/>
				<div className={`${styles.statusLine} ${styles.online}`} />
			</div>

			<div className={styles.infosprofile}>
				<div className={styles.nameAndHour}>
					<span style={{ color: "white", fontSize: "13px" }}>
						{profile.speaker.username}
					</span>
					<span style={{ color: "gray", fontSize: "11px" }}>
						{formattedDate}
					</span>
				</div>
				<div className={styles.lastMessageContainer}>
					<span style={{ color: "gray" }}>{lastMessage}</span>
					<div className={styles.messageCheck}>
						<AiOutlineCheck />
					</div>
				</div>
			</div>
		</div>
	);
}

function Message({ message }) {
	const type = message.sender_id === loggedUserId ? "me" : "other";
	return (
		<div
			className={`${styles.message} ${
				type === "me" ? styles.myMessage : styles.otherMessage
			}`}
		>
			<span>{message.content}</span>
		</div>
	);
}
