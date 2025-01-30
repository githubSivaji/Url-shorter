import React from "react"
import { Routes,BrowserRouter as Router,Route } from "react-router-dom"
// import { getApps } from './utils/helper'
import LandingPage from "./components/Landingpage"
import AboutPage from "./components/AboutPage"
import RegisterPage from "./components/RegisterPage"
import DashboardLayout from "./components/Dashboard/DashboardLayout"
import LoginPage from "./components/LoginPage"
import ShortenUrlPage from "./components/ShortenUrlPage"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import ErrorPage from "./components/ErrorPage"
import Footer from "./components/Footer"
import PrivateRoute from "./PrivateRoute"
import Forgot from "./components/Forgot"
import ResetPassword from "./components/ResetPassword"

export default function App() {
  // const CurrentApp = getApps();
  const hideHeaderFooter = location.pathname.startsWith("/s");
  return (
      <Router>
      {/* <CurrentApp /> */}
      {!hideHeaderFooter && <Navbar /> }
        <Toaster position='bottom-center'/>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage/></PrivateRoute>}/>
          <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage/></PrivateRoute>}/>
          <Route path="/forgot-password"  element={<PrivateRoute publicPage={true}><Forgot/></PrivateRoute>} />

          <Route path="/s/:url" element={<ShortenUrlPage />} />
          <Route path="/dashboard" element={ <PrivateRoute publicPage={false}><DashboardLayout/></PrivateRoute>}/>
          <Route path="/error" element={ <ErrorPage/>} />
          <Route path="*" element={ <ErrorPage message="We can't seem to find the page you're looking for"/>} />
          <Route path="/reset-password/key/:token" element={<ResetPassword />} />

        </Routes>
        {!hideHeaderFooter && <Footer />}
      </Router>
  )
} 