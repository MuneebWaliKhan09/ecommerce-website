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
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "./Store/features/productSlice"

function App() {
  const dispatch = useDispatch()

  const { errorUser } = useSelector((state) => state.app.userData)

  useEffect(() => {
    if (errorUser) {
      dispatch(logoutUser())
    }
  }, [dispatch])


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

          <Route element={<PrivateRoute />}>
            <Route path="/account" element={<UserProfile />} />
          </Route>

        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
