import React from "react";
import styles from "./DCA.module.css";
import badge from "../../images/others/badge.png";
import { FcNext, FcPrevious } from "react-icons/fc";
import { infoMilieu } from "../../data";

export default function DCA() {
	return (
		<>
			<div className={styles.principale}>
				<div className={styles.title}>
					<img className={styles.image} src={badge} width={80} alt="badge" />
					<h1>Discrétion, Confidentialité & Anonymat</h1>
					<img src={badge} className={styles.image} alt="badge" />
				</div>
				<div className={styles.justinscript}>
					<p>Elle viennent de s'inscrire :</p>
					<div className={styles.center}>
						<div className={styles.button}>
							<FcPrevious />
						</div>
						<div className={styles.button}>1</div>
						<div className={styles.button}>2</div>
						<div className={styles.button}>3</div>
						<div className={styles.button}>
							<FcNext />
						</div>
					</div>
				</div>
				<div className={styles.milieu}>
					{infoMilieu.map(({ id, phopho, nom, content, nb_phopho }) => (
						<div key={id} className={styles.intMilieu}>
							<div className={styles.leftside}>
								<img src={phopho} alt={phopho} />
								<p className={styles.p1}>{nom}</p>
								<p>{nb_phopho} photos</p>
							</div>
							<div className={styles.rightside}>
								<p>{content}</p>
								<button>
									<p>Voir son profil</p>
								</button>

							</div>
						</div>
					))}
				</div>
				<div className={styles.lastpart}>
					<h1>
						Sexadultère, et tout devient plus simple pour avoir une aventure
					</h1>
					<p>
						Rejoignez dès maintenant les milliers de femmes mariées qui nous
						font confiance pour leurs relations extra-conjugales.
					</p>
					<p>
						Le site est actuellement ouvert aux hommes qui cherchent à
						satisfaire nos membres qui souhaitent tromper leur conjoint en toute
						discrétion.
					</p>
					<p>
						Sexadultère est le meilleur site sexy pour les femmes mariées et
						sans complexes qui souhaitent faire des rencontres avec d'autres
						hommes, ainsi que pour les hommes mariés qui veulent profiter de la
						vie au travers de relations extraconjugales avec des femmes mariées
						ou célibataires.
					</p>
					<p>
						Profitez des dernières technologies afin de faciliter vos contacts
						et augmenter le nombre de vos rencontres sans que vos proches ne
						soient au courant.
					</p>
				</div>
			</div>
		</>
	);
}
