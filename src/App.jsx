import React from 'react';
import {BrowserRouter, Route,  Routes} from "react-router-dom"
import Home from './Home';
import Detail from './Detail';
import { ToastContainer } from 'react-toast'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:_id' element={<Detail />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App