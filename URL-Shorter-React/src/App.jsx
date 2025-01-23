import React from "react"
import { Routes,BrowserRouter,Route } from "react-router-dom"
import Landingpage from "./components/Landingpage"
import AboutPage from "./components/AboutPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import RegisterPage from "./components/RegisterPage"
export default function App() {
  return (
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
  )
}