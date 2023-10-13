import React, { useEffect } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import Products from "./components/Products/Products"
import ProductDetails from "./components/Products/ProductDetails/ProductDetails"
import NavBar from "./components/Home/NavBar/NavBar"
import Register from "./components/User/registerUser/Register"
import LoginUser from "./components/User/loginUser/LoginUser"
import PrivateRoute from "./components/User/PrivateRoute"
import UserProfile from "./components/User/userProfile/UserProfile"
import ForgotPass from "./components/User/forgotPassword/ForgotPass"
import ResetPass from "./components/User/ResetPass/ResetPass"
import Cart from "./components/Products/CartItems/Cart"

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
          <Route path="/forgot/password" element={<ForgotPass />} />
          <Route path="/password/reset/:token" element={<ResetPass />} />
          <Route path="/cart" element={<Cart />} />

          <Route element={<PrivateRoute />}>
            <Route path="/account" element={<UserProfile />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
