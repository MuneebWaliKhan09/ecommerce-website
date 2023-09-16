import React from 'react';
// import SmallNav from "../SmallNav/SmallNav";
import DropMenu from "../DropMenu/DropMenu";
import { useMediaQuery } from '@mui/material';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"


const Home = () => {

  return (
    <div>




        <div className="navbar-light bg-light navhome shadow d-flex align-items-center pe-4 ps-5" style={{ justifyContent: "space-between", gap: "40px", padding: "18px" }}>

          <div className="navbar-brand logo d-flex align-items-center gap-3" style={{ fontWeight: "900", fontSize: "24px", color: "orangered" }}>
            <img src="/logo.png" width="43" height="43" className="d-inline-block align-top" alt="eS-Shop Logo" />
            eS-Shop
          </div>

          <div className='input-group input-group-lg'>

            <div className='input-group' style={{ width: 190 }}>
              <select className='form-select'>
                <option value="">All</option>
    
              </select>
            </div>

            <input type="text" className='form-control' placeholder='Search Products Here...' />
            <button className='btn btn-warning text-light'>
              Search
              <span className='bi bi-chevron-right'></span>
            </button>
          </div>


          <div className=''>
            <button className='btn btn-danger d-flex'>
              Register
              <i className="bi bi-person-fill"> </i>
            </button>
          </div>

          <div className='me-3'>
            <button type="button" class="btn btn-danger position-relative">
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                99+
              </span>
              <span className='bi bi-cart'></span>

            </button>
          </div>

          <div>
            <DropMenu/>
          </div>

        </div>
        <h1>Main</h1>
        {/* <SmallNav /> */}
    </div>



  );
};

export default Home
