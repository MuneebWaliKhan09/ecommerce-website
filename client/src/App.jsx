import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import Products from "./components/Products/Products"
import ProductDetails from "./components/Products/ProductDetails/ProductDetails"
import NavBar from "./components/Home/NavBar/NavBar"
import Register from "./components/User/registerUser/Register"
import LoginUser from "./components/User/loginUser/LoginUser"

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginUser />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
