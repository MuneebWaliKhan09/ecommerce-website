import React from 'react'
import SmallNav from "../SmallNav/SmallNav";
import DropMenu from "../DropMenu/DropMenu";
import "../home.css";
import Search from '../../search/Search';


const NavBar = () => {
    return (
        <>
            <div className="navbar-light bg-light navhome shadow d-flex align-items-center pe-4 ps-5" style={{ justifyContent: "space-between", gap: "40px", padding: "18px" }}>
                <div className="navbar-brand logo d-flex align-items-center gap-2" style={{ fontWeight: "900", fontSize: "22px", color: "orangered" }}>
                    <SmallNav />
                    <img src="/logo.png" width="43" height="43" className="d-inline-block align-top" alt="eS-Shop Logo" />
                    eS-Shop
                </div>

                <Search />

                <div className='regDiv'>
                    <button className='btn btn-danger d-flex buttonReg'>
                        Register
                        <i className="bi bi-person-fill"> </i>
                    </button>
                </div>

                <div className='me-3 cartitems d-flex align-items-center gap-3'>
                    <button type="button" className="btn btn-danger position-relative">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                            99+
                        </span>
                        <span className='bi bi-cart'></span>

                    </button>
                    <div>
                        <DropMenu />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar