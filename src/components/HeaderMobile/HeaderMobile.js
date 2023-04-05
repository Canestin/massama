import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import styles from "./HeaderMobile.module.css";
import Menu from "../Menu/Menu";
import logo from "../../images/others/logo.png";

export default function HeaderMobile({ title }) {
	const [showMenu, setShowMenu] = useState(false);
	const toggleMenu = () => {
		console.log("Menu Displayed !");
		setShowMenu(true);
	};

	return (
		<>
			<Menu showMenu={showMenu} setShowMenu={setShowMenu} />

			<div className={styles.container}>
				<div onClick={toggleMenu}>
					<AiOutlineMenu size={25} color="white" />
				</div>
				<div style={{ color: "white" }}>{title}</div>
				<img src={logo} alt="logo" className={styles.logo} />
			</div>
		</>
	);
}
