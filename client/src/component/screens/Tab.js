import React, {useState, useContext, useEffect} from 'react'
import {GlobalContext} from '../../GlobalContext'
import ReactPaginate from 'react-paginate';



function Tab(props) {
  const data = useContext(GlobalContext);
  const [allUsers] = data.authApi.allUsers;
  const [query, setQuery] = useState("");
  const [curItems, setCurItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + props.itemsPerPage;
    console.log(`Loading item from ${itemOffset} to ${endOffset}`);
    setCurItems(allUsers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allUsers.length / props.itemsPerPage));
  }, [itemOffset, props.itemsPerPage, allUsers]);

  const handelItemClick = (e) => {
    const newOffset = (e.selected * props.itemsPerPage) % allUsers.length;
    setItemOffset(newOffset);
  };

  if (allUsers.length === 0) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="display-3 text-secondary">No Data Found</h3>
          </div>
        </div>
      </div>
    );
  }

      

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
          <th>Gender</th>
        </tr>
        {curItems.filter((a) =>
            a.username.toLowerCase().includes(query)
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
    <div className='container'>
        <div className="row">
          <div className="col d-flex justify-content-center">
          <ReactPaginate
            pageCount={pageCount}
            nextLabel={"next >"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            className={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousLabel={"< prev"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            pageRangeDisplayed={"5"}
            onPageChange={handelItemClick}
          />
          </div>
        </div>
    </div>
    </div>
  )
}

export default Tab
