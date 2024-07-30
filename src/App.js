import "./App.css";
import About from "./components/About/About";
import Delivery from "./components/Delivery/Delivery";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Store from "./components/Store/Store";

function App() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Store />
      <Delivery />
    </div>
  );
}

export default App;
