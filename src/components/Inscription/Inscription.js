import React from "react";
import styles from "./Inscription.module.css";
import Img1 from "../../images/Pics/1.jpeg";
import Img2 from "../../images/Pics/2.jpeg";
import Img3 from "../../images/Pics/3.jpeg";
import Img4 from "../../images/Pics/4.jpeg";
import Img5 from "../../images/Pics/5.jpeg";
import Img6 from "../../images/Pics/6.jpeg";

export default function Inscription() {
	return (
		<div className={styles.container}>
			<div>
				<div>
					<img src={Img1} alt="" />
					<img src={Img2} alt="" />
					<img src={Img3} alt="" />
				</div>
				<div>
					<img src={Img4} alt="" />
					<img src={Img5} alt="" />
					<img src={Img6} alt="" />
				</div>
			</div>
		</div>
	);
}
