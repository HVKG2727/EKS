import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


function Menu(props) {
  const context = useContext(GlobalContext);

  const [isLogged, setIsLogged] = context.authApi.isLogged;
  const [user] = context.authApi.userData;
  const [isUser, setIsUser] = context.authApi.isUser;
 

  const navigate = useNavigate();

  const logoutUser = async () => {
    if (window.confirm(`Are you sure to logout?`)) {
       await axios.get(`/api/v1/auth/logout`);
          localStorage.clear();          
          setIsUser(false);        
          setIsLogged(false);
      toast.success('Successfully Logout');
      navigate('/');
      window.location.href="/";
    } else {
      toast.warning('Logout terminated')
    }
  }



  /* common route */
  const commonRoute = () => {
    return (
      <ul className="navbar-nav">
        
        <li className='nav-link'>
                <NavLink to={`/tab`}  className="btn btn-outline-danger dropdown-item pe-5">Optimization</NavLink>
          </li> 
        <li className='nav-link'>
                <NavLink to={`/profile`}  className="btn btn-outline-danger dropdown-item pe-5">Profile</NavLink>
          </li>        
          <li className='nav-link'>
                <NavLink to={`/`} onClick={logoutUser} className=" btn btn-outline-danger dropdown-item pe-5">Logout</NavLink>
          </li> 
      </ul>
    )
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-secondary">
      <div className="container-fluid">        
      <a class="navbar-brand" href="#">
      {
                isUser? (<ul className="navbar-nav">
                <li className="nav-item d-flex">
                   <NavLink to={`/`} className="nav-link"> Welcome Mr. {user.name}</NavLink>
                </li>                 
              </ul>) : (<ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to={`/`} className="nav-link">EKS</NavLink>
                </li>                 
              </ul>)
              }
      </a>
        <button className="navbar-toggler" type="button"  data-bs-toggle="collapse" data-bs-target="#menu">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-md-between" id="menu">

              <ul className="navbar-nav">
                <li className="nav-item"></li>
              </ul>


          {
            isLogged ? commonRoute() : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to={`/login`} className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={`/register`} className="nav-link">Register</NavLink>
                </li>
              </ul>
             )
          }
        </div>
        </div>
    </nav>
  )
}

export default Menu