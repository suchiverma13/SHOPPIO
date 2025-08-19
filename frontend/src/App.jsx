import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Profile from "./pages/Profile";
import Verify from "./pages/Verify";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="">
        <ToastContainer />
      <Navbar />

      <div className="px-4 sm:px-[3vw] md:px-[5vw] lg:px-[6vw]">
        <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
      </div>

    </div>
  );
};

export default App;
