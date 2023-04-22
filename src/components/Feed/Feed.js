import styles from "./Feed.module.css";
import { imageMap } from "../../utils/helpers";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";
import { fetchProfiles } from "../../utils/store";
import { useEffect, useState } from "react";
import HeaderMobile from "../HeaderMobile/HeaderMobile";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Feed() {
	const [profiles, setProfiles] = useState([]);
	const [isProfilesReady1, setIsProfilesReady1] = useState(false);
	const [isProfilesReady2, setIsProfilesReady2] = useState(false);
	const [isProfilesReady3, setIsProfilesReady3] = useState(false);
	useEffect(() => {
		console.log("ON FEED");
		fetchProfiles(setProfiles);

		const isFirsTime = localStorage.getItem("isFirsTime");

		if (isFirsTime === "YES") {
			localStorage.setItem("isFirsTime", "NO");

			setTimeout(() => {
				setIsProfilesReady1(true);
			}, 1500);

			setTimeout(() => {
				setIsProfilesReady2(true);
			}, 3000);

			setTimeout(() => {
				setIsProfilesReady3(true);
			}, 4500);
		} else {
			setIsProfilesReady1(true);
			setIsProfilesReady2(true);
			setIsProfilesReady3(true);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<div className="hearderMobile">
				<HeaderMobile title="Meet black" />
			</div>

			<Menu />

			<div className={styles.profilesList}>
				{isProfilesReady3 ? (
					profiles.map((profile) => {
						return (
							<Link key={profile.id} to={`/profile/${profile.id}`}>
								<User profile={profile} />
							</Link>
						);
					})
				) : (
					<div className={styles.profileNotReady}>
						{!isProfilesReady1 ? (
							<span>Recherche des profiles recents...</span>
						) : !isProfilesReady2 ? (
							<span>Correspondace des profiles...</span>
						) : (
							<span>98 filles près de chez vous</span>
						)}

						<AiOutlineLoading3Quarters
							className={styles.loading}
							color="white"
						/>
					</div>
				)}
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
