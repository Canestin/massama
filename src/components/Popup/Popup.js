import React, { useEffect } from "react";
import styles from "./Popup.module.css";
import { useNavigate } from "react-router-dom";

function PopupRechargeWallet({ popupVisible, setPopupVisible }) {
	const navigate = useNavigate();

	useEffect(() => {
		setPopupVisible(popupVisible);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [popupVisible]);

	if (popupVisible) {
		return (
			<div
				onClick={() => setPopupVisible(false)}
				className={`${styles.popup} ${styles.show}`}
			>
				<div className={styles.content}>
					<span>Vous n'avez pas assez de coins pour envoyer un message !</span>
					<button
						className={styles.close}
						onClick={() => {
							setPopupVisible(false);
							navigate("/wallet");
						}}
					>
						Recharger mon compte
					</button>
				</div>
			</div>
		);
	}
	return null;
}

export default PopupRechargeWallet;
