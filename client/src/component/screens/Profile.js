import React, { useState, useContext } from 'react'
import {GlobalContext} from '../../GlobalContext'
import {NavLink} from 'react-router-dom'

function Profile() {
  const data = useContext(GlobalContext);
  const [user] = data.authApi.userData;
  const [isUser] = data.authApi.isUser;

  return (
    <div className="container">    
     <div className="row mt-5">        
         <div className="col-md-6 offset-md-3 col-sm-12 mb-2">
           <div className="card">
           <div className="card-header">
           <h5 className="display-5 text-success text-center">Profile Info</h5>
                 
             </div>            
             <div className="card-body">
               <ul className="list-group">
               <li className="list-group-item">
                 <strong >Name</strong>
                 <h5 className="float-end"> {user.username} </h5>
               </li>
               <li className="list-group-item">
                   <strong>UserName</strong>
                   <span className="text-secondary float-end"> {user.name} </span>
                 </li>
                 <li className="list-group-item">
                   <strong>Email</strong>
                   <span className="text-secondary float-end"> {user.email} </span>
                 </li>
                 <li className="list-group-item">
                   <strong>Mobile</strong>
                   <span className="text-secondary float-end"> {user.mobile} </span>
                 </li>
                 <li className="list-group-item text-center">
                   <button className='btn btn-outline-success'><NavLink to={`/reset`} style={{textDecoration:'none'}}>Reset Password</NavLink></button>                   
                 </li>                 
               </ul>
             </div>
             </div>
         </div>
     </div>
 
   
    </div>
   )
}

export default Profile