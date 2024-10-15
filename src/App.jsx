import React, { useState, useEffect}from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login , logout } from './store/features/authSlice'
import {Header , Footer} from './components/index.js'
import { Outlet } from 'react-router-dom'

import './App.css'

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData));
      }
      else{
        dispatch(logout());
      }
    })
    .catch((error) => {
      console.log("Error :: App :: useEffect :: authService.getCurrentUser");
      console.log(error)
    })
    .finally(() => {
      setLoading(false);
    })
  } , [])

  if(loading){
    return(
      <div>Loading</div>
    )
  }
  else{
    return(
      <div className = "min-h-screen flex flex-wrap content-between bg-blue-600">
        <div className= 'w-full block'>
          <Header/>
           <Outlet/> 
          <Footer/>
        </div>
      </div>
    )
  }
}

export default App
