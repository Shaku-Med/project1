import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Components/Home/Home'
import io from 'socket.io-client'
import Profile from './Components/Profile/Profile'
import Preview from './Components/Preview/Preview'

let socket = io('http://localhost:3001')
function Routing() {
  return (
   <Routes>
    <Route path='/' element={<Home socket={socket}/>}/>
    <Route path='/profile/user/:id' element={<Profile socket={socket}/>}/>
    <Route path='/preview/view/:id' element={<Preview socket={socket}/>}/>
   </Routes>
  )
}

export default Routing
