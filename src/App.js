// import logo from "./logo.svg";
import "./App.css";
import Inscription from "./components/Inscription/Inscription";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Inscription />
      <Footer />
    </div>
  );
}

export default App;
