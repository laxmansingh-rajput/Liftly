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
          <Route path="/verify" element={<Layout page={'verify'} />} />
          <Route path="/login" element={<Layout page={'login'} />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
