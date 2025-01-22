import React from "react"
import { Routes,BrowserRouter,Route } from "react-router-dom"
import Landingpage from "./components/Landingpage"
import AboutPage from "./components/AboutPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
export default function App() {
  return (
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
  )
}