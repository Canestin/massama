import styles from "./Profiles.module.css";
import { imageMap } from "../../utils/helpers";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import { addChannel, fetchProfiles } from "../../utils/store";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../utils/UserContext";

export default function Profiles() {
	const [profiles, setProfiles] = useState([]);
	const MyUser = useContext(UserContext);

	useEffect(() => {
		fetchProfiles(setProfiles);
	}, []);

	console.log("MyUser de chez MyUser", MyUser);

	return (
		<div className={styles.container}>
			<div className="menu">
				<Menu />
			</div>

			<div className={styles.profilesList}>
				{profiles.map((profile) => {
					return (
						<Link key={profile.id} to={`/conversations/${profile.username}`}>
							<User profile={profile} />
						</Link>
					);
				})}
			</div>
		</div>
	);
}

function User({ profile }) {
	return (
		<div className={styles.profile}>
			<img
				style={{ objectFit: "cover", objectPosition: "top" }}
				src={imageMap[profile?.avatar]}
				alt="women"
			/>
			<div className={styles.infosprofile}>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: "10px",
					}}
				>
					<div className={styles.onlineBtn} />
					<span>{profile.username}</span> <br />
				</div>
				<span>
					{profile.age} ans - {profile.city}
				</span>
			</div>
		</div>
	);
}
