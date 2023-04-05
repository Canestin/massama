import React, { useState } from "react";
import styles from "./Layout.module.css";
import Menu from "../Menu/Menu";
import HeaderMobile from "../HeaderMobile/HeaderMobile";

export default function Layout({ children }) {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<div className={styles.container}>
			<div className="hearderMobile">
				<HeaderMobile />
			</div>
			<div>{children}</div>
		</div>
	);
}
