import Navbar from "../Navbar/Navbar";
import styles from "./Profiles.module.css";
import { imageMap } from "../../images/utils/helpers";
import { IoIosRadioButtonOn } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Profiles() {
	const profiles = new Array(100).fill(0);
	return (
		<div className="Profiles">
			<Navbar />

			<div className={styles.profilesList}>
				{profiles.map((_, i) => {
					let img = (i + 1) % 50 !== 0 ? (i + 1) % 50 : 50;
					return (
						<Link to={`/conversations/${i + 1}`}>
							<User key={`user-${i}`} image={imageMap[img]} id={i + 1} />
						</Link>
					);
				})}
			</div>
		</div>
	);
}

function User({ image, id }) {
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
