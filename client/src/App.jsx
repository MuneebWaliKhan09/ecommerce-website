import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
import Products from "./components/Products/Products"
import NavBar from "./components/Home/NavBar/NavBar"

function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
