import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './components/landing'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div className='h-screen w-screen flex items-center justify-center'>
            <div className='h-full w-170 border-2'>
              <Landing />
            </div>
          </div>} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
