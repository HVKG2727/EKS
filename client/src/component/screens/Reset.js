import React, {useState,useEffect, useContext} from 'react'
import { useNavigate, NavLink, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import useValidation from '../Util/FormValidation'
import { GlobalContext } from "../../GlobalContext";

function Reset() {
  const data = useContext(GlobalContext);
  const [token] = data.token;
  const [userData] = data.authApi.userData;
    const [isUser] = data.authApi.isUser;
    const [user, setUser] = useState({
        username: "",
        password: ""
      })

      const navigate = useNavigate()
      const params   = useParams();
     const {errors, validate} = useValidation()
    
      const readValue = (e) => {
        const { name, value } = e.target;
        validate(name, value)    
        setUser({...user, [name]:value})
      }

      useEffect(()=>{
        setUser(userData)        
    },[])

      const submitHandler = async (e) => {
        e.preventDefault();
            
        const res = await axios.patch(
          `/api/v1/auth/updateProfile/${params.id}`,
          { ...user},
          {
            headers: {
              Authorization: token,
            },
          }
        );        
        toast.success("Product created succesfully");
        navigate(`/`)
      };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3">Reset Password</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 offset-md-3">
            <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler} >
              <div className="form-group mt-2 mb-2">
                    <label htmlFor="password">Username</label>
                    <input type="text" name="username" value={user.username} onChange={readValue} id="username" className="form-control" required />
                    {
                      errors && errors.username ? (
                        <div className="alert alert-danger">{errors.username}</div>
                      ) : null
                    }
                  </div>
              {/* <div className="form-group mt-2 mb-2">
                    <label htmlFor="password">Enter Old password</label>
                    <input type="password" name="password" value={user.password} onChange={readValue} id="password" className="form-control" required />
                    {
                      errors && errors.password ? (
                        <div className="alert alert-danger">{errors.password}</div>
                      ) : null
                    }
                  </div> */}
                <div className="form-group mt-2 mb-2">
                    <label htmlFor="newpassword">Enter New password</label>
                    <input type="password" name="password" value={user.password} onChange={readValue} id="password" className="form-control" required />
                    {
                      errors && errors.password ? (
                        <div className="alert alert-danger">{errors.password}</div>
                      ) : null
                    }
                  </div> 
            
                  
                <div className="form-group mt-3 mb-3 text-center">
                  <input type="submit" value="Update" className="btn btn-outline-success" />
                  </div>
                  
              </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Reset