import React from "react"
import { Routes,BrowserRouter,Route } from "react-router-dom"
import Landingpage from "./components/Landingpage"
import AboutPage from "./components/AboutPage"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import RegisterPage from "./components/RegisterPage"
import LoginPage from "./components/LoginPage"
import { Toaster } from "react-hot-toast"
import DashboardLayout from "./components/Dashboard/DashboardLayout"
import ErrorPage from "./components/ErrorPage"
export default function App() {
  return (
      <BrowserRouter>
      <Navbar/>
      <Toaster position='bottom-center'/>
      <Routes>
        <Route path="/" element={<Landingpage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<DashboardLayout/>}/>
        <Route path="/error" element={ <ErrorPage/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
  )
}