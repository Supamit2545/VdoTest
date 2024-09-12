import { useState } from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Live from './Pages/Live'
import Home from './Pages/Home'
import Videos from './Pages/Videos'
import Contacts from './Pages/Contacts'

function App() {

  return (
    <div className='App-Container'>
      <div>
        <div className='navbar'><Navbar/></div>
      </div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Live' element={<Live/>}/>
        <Route path='/Videos' element={<Videos/>}/>
        <Route path='/Contacts' element={<Contacts/>}/>
      </Routes>
    </div>
  )
}

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}