import React from "react"
import LandingPage from "./components/Landingpage"
import AboutPage from "./components/AboutPage"
import RegisterPage from "./components/RegisterPage"
import DashboardLayout from "./components/Dashboard/DashboardLayout"
import LoginPage from "./components/LoginPage"
import ShortenUrlPage from "./components/ShortenUrlPage"
import Navbar from "./components/Navbar"
import { Routes,BrowserRouter as Router,Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import ErrorPage from "./components/ErrorPage"
import Footer from "./components/Footer"
export const AppRouter=()=>{

    return (
        <>
        <Navbar/>
        <Toaster position='bottom-center'/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/dashboard" element={<DashboardLayout/>}/>
          <Route path="/error" element={ <ErrorPage/>} />
        </Routes>
        <Footer/>
        </>
    
    )
}
export default AppRouter

export const SubDomainRouter = () => {
    return (
        <Routes>
          <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    )
}

