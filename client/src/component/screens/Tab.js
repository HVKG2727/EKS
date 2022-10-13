import React, {useState} from 'react'
import {Users} from './data'

function Tab() {
    
    const [query, setQuery] = useState("");
        

  return (
    <div className='container'>

            <div className="col-md-6 offset-md-3 d-flex mt-3 mb-3">
              <input
                className="form-control"
                placeholder="Search By UserName..."
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />             
            </div>
        
     
            
        <table class="table table-striped">
      <tbody>
        <tr>
          <th>User Id</th>
          <th>Username</th>
          <th>First_name</th>
          <th>Last_name</th>
          <th>Gernder</th>
        </tr>
        {Users.filter((asd) =>
            asd.username.toLowerCase().includes(query)
            ).map((item) => (
          <tr key={item.user_id}>
            <td>{item.user_id}</td>
            <td>{item.username}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Tab