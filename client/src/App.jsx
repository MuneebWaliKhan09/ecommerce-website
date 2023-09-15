import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home/Home"
// import SmallNav from "./components/SmallNav/SmallNav"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
