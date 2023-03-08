import styles from "../Footer/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.containerPub}>
        <div className={styles.containerPubText}>
          <h2>Sexadultère, partout avec vous !</h2>
          <p>Découvrez la version mobile de sexadultère sur n’importe quels</p>
          <p>
            téléphones ou tablettes accédant à internet. Toutes les
            fonctionnalitées et
          </p>
          <p>services d’un vrai site à porté de mains.</p>
        </div>
        <div className={styles.containerPubImage}>
          ici on met l'image de Bezozo
        </div>
      </div>
      <div className={styles.realFooter}>
        <p>© copyright bezozo.com 2023</p>
        <p>
          Conditions générales d'utilisation et de vente | Mentions légales |
          Affiliation | Charte de confiance | Charte de modération | Lutte anti
          spammeurs | Aide | Contact
        </p>
      </div>
    </div>
  );
}
