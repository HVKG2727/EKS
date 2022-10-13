import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import useValidation from '../Util/FormValidation'

function Register() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: ""
  })
 const navigate = useNavigate()
 const {errors, validate} = useValidation()

  const readValue = (e) => {
    const { name, value } = e.target;
    validate(name, value)    
    setUser({...user, [name]:value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
      try {
        await axios.post(`/api/v1/auth/register`, user).then(res => {
            toast.success("User registerted successfully")
            navigate("/")
        }).catch(err => toast.error(err.response.data.msg));

      } catch (error) {
        toast.error(error.response.data.msg)
      }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h3 className="display-3">Register</h3>
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
              <div className="form-group mt-2 mb-2">
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" value={user.password} onChange={readValue} id="password" className="form-control" required />
                    {
                      errors && errors.password ? (
                        <div className="alert alert-danger">{errors.password}</div>
                      ) : null
                    }
                  </div>
                  <div className="form-group mt-2 mb-2">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" id="name" value={user.name} onChange={readValue} className="form-control" required />
                    {
                      errors && errors.name ? (
                        <div className="alert alert-danger">{errors.name}</div>
                      ) : null
                    }
                  </div>
                <div className="form-group mt-2 mb-2">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" value={user.email} onChange={readValue} className="form-control" required />
                  {
                      errors && errors.email ? (
                        <div className="alert alert-danger">{errors.email}</div>
                      ) : null
                    }
                  </div>
                <div className="form-group mt-2 mb-2">
                  <label htmlFor="mobile">Mobile</label>
                  <input type="number" name="mobile" id="mobile" value={user.mobile} onChange={readValue} className="form-control" required />
                  {
                      errors && errors.mobile ? (
                        <div className="alert alert-danger">{errors.mobile}</div>
                      ) : null
                    }
                  </div>
                  
                <div className="form-group mt-3 mb-3 text-center">
                  <input type="submit" value="Register" className="btn btn-outline-success" />
                  </div>
                  <div className="form-group mt-2 mb-2 d-flex justify-content-center">
                <p>Already a User? </p>&nbsp; &nbsp; <p><NavLink to={`/login`}>Signup Now</NavLink></p>
                </div>
              </form>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register