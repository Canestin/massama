import React, { useEffect, useState } from "react";
import styles from "./Menu.module.css";
import { BsSearch, BsEye } from "react-icons/bs";
import { TbMessageCircle, TbWallet, TbSettings, TbHelp } from "react-icons/tb";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../utils/UserContext";
import { imageMap } from "../../utils/helpers";
import { useStore } from "../../utils/store";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../images/others/meetblack.svg";

export default function Menu({ showMenu, setShowMenu }) {
	const loggedUser = useContext(UserContext);
	const { channels } = useStore();
	const [windowSize, setWindowSize] = useState({
		width: undefined,
		height: undefined,
	});

	const toggleMenu = () => {
		setShowMenu(!showMenu);
		console.log("Menu Hidden !");
	};
	const channelId = !!channels[0] ? channels[0].id : "no-message";

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className={`${styles.menu} ${showMenu && styles.menuDisplayed}`}>
			<div className={styles.container}>
				{windowSize.width > 768 && (
					<div className={styles.logo}>
						<img src={logo} alt="logo" />
					</div>
				)}

				<div className={styles.username}>
					<img src={imageMap[loggedUser?.avatar]} alt="username" />
					<div className={styles.usernameInfos}>
						<span style={{ color: "white" }}>{loggedUser?.username}</span>
						<br />
						<span style={{ color: "gray" }}>Votre profil</span>
					</div>
				</div>
				<div className={styles.listItems}>
					<Link to="/feed">
						<BsSearch color="#6438E1" size={windowSize.width > 768 ? 28 : 22} />
						<span>Parcourir</span>
					</Link>
					<Link to={`/conversations/${channelId}`}>
						<TbMessageCircle
							color="#6438E1"
							size={windowSize.width > 768 ? 28 : 22}
						/>
						<span>Messages</span>
					</Link>
					{/* <Link to="/views">
						<BsEye color="#6438E1" size={windowSize.width > 768 ? 28 : 22} />
						<span>Vues</span>
					</Link> */}
					<Link to="/wallet">
						<TbWallet color="#6438E1" size={windowSize.width > 768 ? 28 : 22} />
						<span>Portefeuille</span>
					</Link>
				</div>
				<div className={`${styles.listItems} ${styles.settings}`}>
					<Link to="/settings">
						<TbSettings
							color="#6438E1"
							size={windowSize.width > 768 ? 28 : 22}
						/>
						<span>Réglages</span>
					</Link>
					<Link to="/wallet">
						<TbHelp color="#6438E1" size={windowSize.width > 768 ? 28 : 22} />
						<span>Aide</span>
					</Link>
				</div>

				<div className={`${styles.listItems} ${styles.logout}`}>
					<Link to="/disconnect">
						<RiLogoutBoxLine
							color="#6438E1"
							size={windowSize.width > 768 ? 28 : 22}
						/>
						<span>Deconnexion</span>
					</Link>
				</div>

				<AiOutlineClose
					size={25}
					color="white"
					className={styles.closeMenu}
					onClick={toggleMenu}
				/>
			</div>
		</div>
	);
}
