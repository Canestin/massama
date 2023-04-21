import React from "react";
import logo from "../../images/others/meetblack-blanc.png";
import styles from "./Header.module.css";
import { BiUserCircle } from "react-icons/bi";
// import Colors from "../../constants/Colors";

export default function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<img src={logo} alt="logo" />
			</div>
			<div className={styles.right}>
				<BiUserCircle color="white" size={"100%"} />
			</div>
		</div>
	);
}
