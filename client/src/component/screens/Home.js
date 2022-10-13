import React, { useContext } from 'react'
import { GlobalContext } from '../../GlobalContext'
import { toast } from 'react-toastify';
import axios from 'axios';
import Profile from "../screens/Profile"

function Home() {
  const data = useContext(GlobalContext)
  const [user] = data.authApi.userData;
  const [isUser] = data.authApi.isUser;
  const [isLogged, setIsLogged] = data.authApi.isLogged;

  return (
    <div className="container mt-5">
      <div className="row text-center">
      <div> 
        {
          isLogged ? <h1>Welcome Mr/Mrs {user.username}, have a good day</h1> : <h1>Welcome to Eks</h1>
        }
      </div>
      </div>
    </div>
  )
}

export default Home