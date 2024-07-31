import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import About from "./components/About/About";
import Delivery from "./components/Delivery/Delivery";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Store from "./components/Store/Store";

function App() {
  const [value, setValue] = useState(null);
  const aboutRef = useRef(null);
  const storeRef = useRef(null);
  const deliveryRef = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 0 && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === 1 && storeRef.current) {
      storeRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (value === 2 && deliveryRef.current) {
      deliveryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [value]);

  return (
    <div>
      <Header value={value} handleChange={handleChange} />
      <Hero />
      <About ref={aboutRef} />
      <Store ref={storeRef} />
      <Delivery ref={deliveryRef} />
      <Footer value={value} handleChange={handleChange} />
    </div>
  );
}

export default App;
