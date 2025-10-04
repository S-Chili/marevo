import React, { useState, useEffect, useRef } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Hero from "../Hero/Hero";
import About from "../About/About";
// import Store from "../Store/Store";
// import Delivery from "../Delivery/Delivery";
// import Footer from "../Footer/Footer";
import useAuth from "../Header/useAuth";

const Home = ({ value, handleChange }) => {
  const isAuthenticated = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const aboutRef = useRef(null);
  const storeRef = useRef(null);
  const deliveryRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated && !open) {
        setOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timer); // Очищаємо таймер при скасуванні або зміні isAuthenticated
  }, [isAuthenticated, open]); // Залежність від isAuthenticated і open

  const handleAlertClick = () => {
    setOpen(false);
    navigate("/signup");
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
    <>
      {/* Алерт для незалогінених користувачів */}
      <Snackbar
        open={open}
        autoHideDuration={10000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top", // розташування зверху
          horizontal: "left", // по центру
        }}
      >
        <Alert
          severity="info"
          onClick={handleAlertClick}
          style={{ cursor: "pointer", marginTop: "16px" }}
        >
          Для того щоб відчути покращений користувацький досвід, а також
          можливості замовлення квітів, пройдіть швидку реєстрацію та/або
          залогіньтесь на сайті, будь ласка. P.S.: клікніть сюди ❤️
        </Alert>
      </Snackbar>

      <Hero />
      <About ref={aboutRef} />
      {/* <Store ref={storeRef} /> */}
      {/* <Delivery ref={deliveryRef} /> */}
      {/* <Footer value={value} handleChange={handleChange} /> */}
    </>
  );
};

export default Home;
