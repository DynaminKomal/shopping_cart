import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./Screen/Home";
import Footer from "./Components/Footer";
import Cart from "./Screen/Cart";
import Login from "./Screen/Login";
import ProductDetails from "./Screen/ProductDetails";
import { Container } from "react-bootstrap";
import Registration from "./Screen/Registration";
import Profile from "./Screen/Profile";

function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>

      <main>

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart/:id/*" element={<Cart />} />
          </Routes>
        </Container>

      </main>
      <footer>
        <Footer />
      </footer>

    </React.Fragment>
  );
}

export default App;
