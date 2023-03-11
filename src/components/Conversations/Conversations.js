import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Conversations.module.css";
import { Link } from "react-router-dom";
import { imageMap } from "../../utils/helpers";
import { AiFillMessage } from "react-icons/ai";
import { IoSend } from "react-icons/io5";

export default function Conversations() {
	const profiles = new Array(50).fill(0);
	const [inputValue, setInputValue] = React.useState("");

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSendMessage = () => {
		alert(inputValue);
	};

	return (
		<div>
			<Navbar />
			<div className={styles.container}>
				<div className={styles.containerProfiles}>
					<div className={styles.discussionDiv}>
						<span className={styles.discussion}>Discussions</span>
						<AiFillMessage size={28} />
					</div>
					<div className={styles.convContainer}>
						{profiles.map((_, i) => {
							// let img = (i + 1) % 50 !== 0 ? (i + 1) % 50 : 50;
							return (
								<Link to={`/conversations/${i + 1}`}>
									<Conv key={`user-${i}`} image={imageMap[i + 1]} id={i + 1} />
								</Link>
							);
						})}
					</div>
				</div>
				<div className={styles.containerConv}>
					<div className={styles.userInfosMessage}>
						<img
							style={{ objectFit: "cover", objectPosition: "top" }}
							src={imageMap[1]}
							alt="women"
						/>
						<div>
							<span>Sarah </span>
							<span> En ligne il y a 5 minutes</span>
						</div>
					</div>
					<div className={styles.messagesConv}>
						<Message type={"other"} />
						<Message type={"me"} />
						<Message type={"other"} />
						<Message type={"me"} />
						<Message type={"other"} />
						<Message type={"other"} />
						<Message type={"me"} />
						<Message type={"me"} />
						<Message type={"other"} />
						<Message type={"me"} />
						<Message type={"other"} />
						<Message type={"other"} />
						<Message type={"me"} />

						<div className={styles.inputMesssage}>
							<input
								value={inputValue}
								onChange={handleInputChange}
								placeholder="Entrer votre message"
								type="text"
							/>
							<div onClick={handleSendMessage}>
								<IoSend size={25} />
							</div>
						</div>
					</div>
				</div>
				<div className={styles.containerUserDesc}>
					<div>
						<img src={imageMap[1]} alt="" />

						<span>Sarah</span>
						<p>Age : 27 ans</p>
						<p>Ville : Abidjan</p>
					</div>
				</div>
			</div>
		</div>
	);
}

function Conv({ image, id }) {
	return (
		<div className={styles.conv}>
			<div>
				<img
					style={{ objectFit: "cover", objectPosition: "top" }}
					src={image}
					alt="women"
				/>
			</div>

			<div className={styles.infosprofile}>
				<div className={styles.nameAndHour}>
					<span style={{ fontWeight: "bold" }}>Sarah</span>
					<span style={{ fontSize: "11px" }}>Il y a 10 minutes</span>
				</div>
				<span>Bonjour Luck ! Comment tu vas ?</span>
			</div>
		</div>
	);
}

function Message({ type }) {
	return (
		<div
			className={`${styles.message} ${
				type === "other" ? styles.myMessage : styles.otherMessage
			}`}
		>
			<span>
				Bonjour Luck ! Comment tu vas ? J'aime bien sortir sur abidjan les
				vendredis soir passer du bon temps.
			</span>
		</div>
	);
}
