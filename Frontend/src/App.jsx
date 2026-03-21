import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/landing'
import Layout from './components/layout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout page={'Landing'} />} />
          <Route path="/form" element={<Layout page={'form'} />} />
          <Route path="/login" element={<Layout page={'login'} />} />
          <Route path="/phone" element={<Layout page={'phone'} />} />
          <Route path="/home" element={<Layout page={'home'} />} />
          <Route path="/rider" element={<Layout page={'rider'} />} />
          <Route path="/profile" element={<Layout page={'profile'} />} />
          <Route path="/ride" element={<Layout page={'ride'} />} />
          <Route path="/user" element={<Layout page={'user'} />} />
          <Route path="/searchUser" element={<Layout page={'searchUser'} />} />
          <Route path="/SearchRider" element={<Layout page={'SearchRider'} />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
