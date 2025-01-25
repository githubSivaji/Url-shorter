import React from "react"
import { Routes,BrowserRouter as Router,Route } from "react-router-dom"
import { getApps } from './utils/helper'
export default function App() {
  const CurrentApp = getApps();
  return (
      <Router>
      <CurrentApp />
      </Router>
  )
} 