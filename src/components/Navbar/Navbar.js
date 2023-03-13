import styles from "../Navbar/Navbar.module.css";
import logo from "../../images/others/ph-logo.png";

export default function Navbar() {
	return (
		<div className={styles.container}>
			<img alt="logo" className={styles.logo} src={logo}></img>
			<div className={styles.member}> Déja Membre</div>
		</div>
	);
}
