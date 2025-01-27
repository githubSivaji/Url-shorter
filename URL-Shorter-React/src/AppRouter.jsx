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
import PrivateRoute from "./PrivateRoute"
export const AppRouter=()=>{

    return (
        <>
        <Navbar/>
        <Toaster position='bottom-center'/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage/></PrivateRoute>}/>
          <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage/></PrivateRoute>}/>
          <Route path="/dashboard" element={ <PrivateRoute publicPage={false}><DashboardLayout/></PrivateRoute>}/>
          <Route path="/error" element={ <ErrorPage/>} />
          <Route path="*" element={ <ErrorPage message="We can't seem to find the page you're looking for"/>} />

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

