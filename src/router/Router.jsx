
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NotFound from '../components/NotFound/NotFound'
import Booking from '../pages/Booking/Booking'
import Layout from '../components/Layout/Layout'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router