import styles from "./Feed.module.css";
import { imageMap } from "../../utils/helpers";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import { fetchProfiles } from "../../utils/store";
import { useEffect, useState } from "react";
import HeaderMobile from "../HeaderMobile/HeaderMobile";

export default function Feed() {
	const [profiles, setProfiles] = useState([]);
	useEffect(() => {
		fetchProfiles(setProfiles);
	}, []);

	return (
		<div className={styles.container}>
			<div className="hearderMobile">
				<HeaderMobile title="Meet black" />
			</div>

			<Menu />

			<div className={styles.profilesList}>
				{profiles.map((profile) => {
					return (
						<Link key={profile.id} to={`/profile/${profile.id}`}>
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
