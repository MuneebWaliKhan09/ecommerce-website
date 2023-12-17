import React, { Fragment, useEffect, useState } from "react"
import { BrowserRouter, Route, Routes, useNavigate, useParams } from "react-router-dom"
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
import ShippingInfo from "./components/Products/ShippingInfo/ShippingInfo"
import PaymentInfo from "./components/Products/PaymentInfo/PaymentInfo"
import ConfirmOder from "./components/Products/ConfirmOrder/ConfirmOder"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"
import Orders from "./components/Products/Orders/Orders"
import Order from "./components/Products/Orders/order/Order"
import AdminRoutes from "./components/User/AdminRoutes"
import Dash from "./admin/DashbaordAdmin/Dash"
import Footer from "./components/Footer/Footer"

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  // const navigate = useNavigate()

  async function getStripeApiKey() {
    const { data } = await axios.get("https://ecommerce-muneeb.vercel.app/api/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);



  window.addEventListener("contextmenu", (e) => e.preventDefault());


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

          {/* authenticated routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/account" element={<UserProfile />} />
            <Route path="/shipping-info" element={<ShippingInfo />} />
            <Route path="/confirm-order" element={<ConfirmOder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<Order />} />

            <Route path="/payment-info" element={
              stripeApiKey &&
              <Elements stripe={loadStripe(stripeApiKey)}>
                <PaymentInfo />
              </Elements>
            } />
          </Route>


          {/* admin routes  */}
          <Route element={<AdminRoutes />} >
            <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
          </Route>

        </Routes>
        {!window.location.pathname.startsWith("/admin") ?  <Footer />  : ''}
      </BrowserRouter>

    </>
  )
}


function AdminDashboard() {
  const navigate = useNavigate();

  return <Dash navigate={navigate} />;
}
export default App
