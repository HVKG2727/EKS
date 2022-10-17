import React, {useContext} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'

/* react toast */
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

/* component */
import Login from './Auth/Login'
import Register from './Auth/Register'

import Home from './screens/Home'
import Menu from './screens/Menu'
import Pnf from './Util/Pnf'
import ProtectedRoute from './middleware/ProtectedRoute'
import Profile from './screens/Profile'
import Reset from './screens/Reset'
import Tab from './screens/Tab'
import Task3 from './screens/Task3'



function Main(props) {
  const context = useContext(GlobalContext)

  const [isLogged, setIsLogged] = context.authApi.isLogged;

  return (
      <Router>
          <Menu />
          <ToastContainer autoClose={1000} position="top-center" />
          <Routes>
              <Route path={`/`} element={<Home/>} />              
              <Route path={`/login`} element={ isLogged ? <Pnf/> : <Login/>} />
              <Route path={`/register`} element={isLogged ? <Pnf/>: <Register/>} />
              <Route path={`/tab`} element={
            <ProtectedRoute  auth={isLogged} >
                                                                  <Tab itemsPerPage={30} />
                                                          </ProtectedRoute>
                                                      }  />
           
              <Route path={`/profile`} element={
                                                        <ProtectedRoute  auth={isLogged} >
                                                                  <Profile/>
                                                          </ProtectedRoute>
                                                      }  />
              <Route path={`/reset`} element={
                                                        <ProtectedRoute  auth={isLogged} >
                                                                  <Reset/>
                                                          </ProtectedRoute>
                                                      }  />
              <Route path={`/*`} element={<Pnf/>} />
          </Routes>
    </Router>
  )
}

export default Main
