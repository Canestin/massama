import DCA from "../DCA/DCA";
import Inscription from "../Inscription/Inscription";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Home() {
	return (
		<>
			<Navbar />
			<Inscription />
			<DCA />
			<Footer />
		</>
	);
}
