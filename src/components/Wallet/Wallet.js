import React, { useContext, useState } from "react";
import styles from "./Wallet.module.css";
import HeaderMobile from "../HeaderMobile/HeaderMobile";
import UserContext from "../../utils/UserContext";
import { coinsMap } from "../../utils/helpers";
import { updateWallet } from "../../utils/store";
import { Helmet } from "react-helmet";

var cdn = document.createElement("script");
cdn.setAttribute("src", "https://cdn.cinetpay.com/seamless/main.js");
document.head.appendChild(cdn);

export default function Wallet() {
	const [choice, setChoice] = useState(1000);
	const { user, updateUserContext } = useContext(UserContext);

	const handleChoice = (c) => {
		setChoice(c);
	};
	const handlePay = async () => {
		console.log("Pack choisi: ", choice);
		const addWallet = coinsMap.get(choice);

		/* eslint-disable no-undef */
		CinetPay.setConfig({
			apikey: process.env.REACT_APP_CHECKOUT_API_KEY,
			site_id: process.env.REACT_APP_CHECKOUT_SITE_ID,
			notify_url: process.env.REACT_APP_CHECKOUT_NOTIFY_URL,
			mode: "PRODUCTION",
		});
		CinetPay.getCheckout({
			transaction_id: Math.floor(Math.random() * 100000000).toString(),
			amount: choice,
			currency: "XOF",
			channels: "ALL",
			description: "Achat du pack",
		});
		CinetPay.waitResponse(async function (data) {
			if (data.status === "REFUSED") {
				if (alert("Votre paiement a échoué")) {
					window.location.reload();
				}
			} else if (data.status === "ACCEPTED") {
				if (alert("Votre paiement a été effectué avec succès")) {
					updateUserContext("wallet", user.wallet + addWallet);
					await updateWallet(user.wallet + addWallet);
					window.location.reload();
				}
			}
		});
		CinetPay.onError(function (data) {
			console.log(data);
		});
	};

	return (
		<>
			<Helmet>
				<title>Wallet</title>
				<meta name="description" content="Recharger mon compte" />
				<meta property="og:title" content="Recharger mon compte" />
				<meta property="og:description" content="Recharger mon compte" />
				<meta property="og:url" content="https://meetblack.fun/wallet" />
			</Helmet>
			<div className="hearderMobile">
				<HeaderMobile title="Paiement" />
			</div>
			<div className={styles.container}>
				<div>
					<p>Choisissez le pack</p>
					<div className={styles.choice}>
						<div
							onClick={() => handleChoice(500)}
							className={choice === 500 ? styles.chosen : ""}
						>
							<div>
								<div className={styles.radio} type="basic" />
								<div>
									<span>Basic</span>
									<span className={styles.gray}>200 coins</span>
								</div>
							</div>
							<span>500 FCFA</span>
						</div>
						<div
							onClick={() => handleChoice(1000)}
							className={choice === 1000 ? styles.chosen : ""}
						>
							<div>
								<div className={styles.radio} type="basic" />
								<div>
									<span>Standard</span>
									<span className={styles.gray}>500 coins</span>
								</div>
							</div>
							<span>1000 FCFA</span>
						</div>
						<div
							onClick={() => handleChoice(2000)}
							className={choice === 2000 ? styles.chosen : ""}
						>
							<div>
								<div className={styles.radio} type="basic" />
								<div>
									<span>Premium</span>
									<span className={styles.gray}>1500 coins</span>
								</div>
							</div>
							<span>2000 FCFA</span>
						</div>
						<div
							onClick={() => handleChoice(5000)}
							className={choice === 5000 ? styles.chosen : ""}
						>
							<div>
								<div className={styles.radio} type="basic" />
								<div>
									<span>Ultimate</span>
									<span className={styles.gray}>6000 coins</span>
								</div>
							</div>
							<span>5000 FCFA</span>
						</div>
					</div>
				</div>

				<div onClick={handlePay} className={styles.payer}>
					<span>Payer</span>
				</div>
			</div>
		</>
	);
}
