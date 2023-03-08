import Navbar from "../Navbar/Navbar";
import styles from "./Profiles.module.css";
import { imageMap } from "../../images/utils/helpers";
import { IoIosRadioButtonOn } from "react-icons/io";

export default function Profiles() {
	const profiles = new Array(100).fill(0);
	return (
		<div className="Profiles">
			<Navbar />
			<div className={styles.profilesList}>
				{profiles.map((_, i) => {
					let img = (i + 1) % 50 !== 0 ? (i + 1) % 50 : 50;
					return <User image={imageMap[img]} />;
				})}
			</div>
		</div>
	);
}

function User({ image }) {
	return (
		<div className={styles.profile}>
			<div className={styles.onlineBtn}>
				<IoIosRadioButtonOn />
			</div>
			<img
				style={{ objectFit: "cover", objectPosition: "top" }}
				src={image}
				alt="women"
			/>
			<div className={styles.infosprofile}>
				<span>Sarah - 27 ans</span>
			</div>
		</div>
	);
}
