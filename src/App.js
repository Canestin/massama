import "./App.css";
import DCA from "./components/DCA/DCA";
import Inscription from "./components/Inscription/Inscription";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Inscription />
      <DCA />
      <Footer />
    </div>
  );
}

export default App;
