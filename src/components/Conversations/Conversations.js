import React from "react";
import styles from "./Conversations.module.css";
import { Link } from "react-router-dom";
import { imageMap } from "../../utils/helpers";
import { IoSend } from "react-icons/io5";
import Menu from "../Menu/Menu";
import { useParams } from "react-router-dom";

export default function Conversations() {
	const profiles = new Array(5).fill(0);
	const [inputValue, setInputValue] = React.useState("");

	const { userId } = useParams();
	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSendMessage = () => {
		alert(inputValue);
	};

	return (
		<div className={styles.bigContainer}>
			<div className="menu">
				<Menu />
			</div>
			<div className={styles.container}>
				<div className={styles.containerProfiles}>
					<div className={styles.containerListConv}>
						{profiles.map((_, i) => {
							// let img = (i + 1) % 50 !== 0 ? (i + 1) % 50 : 50;
							return (
								<Link
									key={`conversations/${i + 1}`}
									to={`/conversations/${i + 1}`}
								>
									<Conv key={`user-${i}`} image={imageMap[i + 1]} id={i + 1} />
								</Link>
							);
						})}
					</div>
				</div>
				<div className={styles.containerConv}>
					{/* THIS */}
					<div className={styles.userInfosMessage}>
						<img
							style={{ objectFit: "cover", objectPosition: "top" }}
							src={imageMap[userId]}
							alt="women"
						/>
						<div>
							<span style={{ color: "white" }}>Sarah </span>
							<span style={{ color: "gray" }}> En ligne il y a 5 minutes</span>
						</div>
					</div>{" "}
					{/* THIS */}
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
					</div>
					{/* THIS */}
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
					<span style={{ color: "white" }}>Sarah</span>
					<span style={{ color: "gray", fontSize: "11px" }}>
						Il y a 10 minutes
					</span>
				</div>
				<span style={{ color: "gray" }}>Bonjour Luck ! Comment tu vas ?</span>
			</div>
		</div>
	);
}

function Message({ type }) {
	return (
		<div
			className={`${styles.message} ${
				type === "other" ? styles.otherMessage : styles.myMessage
			}`}
		>
			<span>
				Bonjour Luck ! Comment tu vas ? J'aime bien sortir sur abidjan les
				vendredis soir passer du bon temps.
			</span>
		</div>
	);
}
