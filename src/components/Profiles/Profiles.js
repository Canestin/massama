import styles from "./Profiles.module.css";
import { imageMap } from "../../utils/helpers";
import { Link } from "react-router-dom";
import Menu from "../Menu/Menu";

export default function Profiles() {
	const profiles = new Array(100).fill(0);
	return (
		<div className={styles.container}>
			{/* <Navbar /> */}
			<div className="menu">
				<Menu />
			</div>

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
			<img
				style={{ objectFit: "cover", objectPosition: "top" }}
				src={image}
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
					<span>Sarah</span> <br />
				</div>
				<span>27 ans - Abidjan</span>
			</div>
		</div>
	);
}
