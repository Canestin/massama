import React, { useState } from "react";
import styles from "./Wallet.module.css";
import HeaderMobile from "../HeaderMobile/HeaderMobile";

export default function Wallet() {
	const [choice, setChoice] = useState("standard");

	const handleChoice = (c) => {
		setChoice(c);
	};
	const handlePay = () => {
		console.log("Paiement effectué avec le pack : ", choice);
	};

	return (
		<>
			<div className="hearderMobile">
				<HeaderMobile title="Paiement" />
			</div>
			<div className={styles.container}>
				<div>
					<p>Choisissez le pack</p>
					<div className={styles.choice}>
						<div
							onClick={() => handleChoice("basic")}
							className={choice === "basic" ? styles.chosen : ""}
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
							onClick={() => handleChoice("standard")}
							className={choice === "standard" ? styles.chosen : ""}
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
							onClick={() => handleChoice("premium")}
							className={choice === "premium" ? styles.chosen : ""}
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
							onClick={() => handleChoice("utlimate")}
							className={choice === "utlimate" ? styles.chosen : ""}
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
			;
		</>
	);
}
