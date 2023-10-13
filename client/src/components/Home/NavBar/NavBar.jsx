import React, { useEffect } from 'react'
import SmallNav from "../SmallNav/SmallNav";
import DropMenu from "../DropMenu/DropMenu";
import "../home.css";
import Search from '../../search/Search';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserDetails } from '../../../Store/features/productSlice';


const NavBar = () => {
    const dispatch = useDispatch()
    const { errorUser2 } = useSelector((state) => state.app.userData)
    const { msgCart, cart } = useSelector((state) => state.app.addToCart)

    useEffect(() => {
        dispatch(loginUserDetails())
    }, [dispatch])

    return (
        <>
            <div className="navbar-light bg-light navhome shadow d-flex align-items-center pe-4 ps-5" style={{ justifyContent: "space-between", gap: "40px", padding: "18px" }}>
                <div className="navbar-brand logo d-flex align-items-center gap-2" style={{ fontWeight: "900", fontSize: "22px", color: "orangered" }}>
                    <SmallNav />
                    <img src="/logo.png" width="43" height="43" className="d-inline-block align-top" alt="eS-Shop Logo" />
                    eS-Shop
                </div>

                <Search />

                <Link to='/login' className='regDiv text-decoration-none'>
                    {
                        errorUser2 && errorUser2 ? (<button className='btn btn-danger d-flex buttonReg gap-1'>
                            Login
                            <i className="bi bi-person-fill"> </i>
                        </button>) : (
                            <span></span>
                        )
                    }
                </Link>

                <div className='me-3 cartitems d-flex align-items-center gap-3'>
                    <Link to='/cart' type="button" className="btn btn-danger position-relative">
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                        {cart && cart.length}
                        </span>
                        <span className='bi bi-cart'></span>

                    </Link>
                    {
                        !errorUser2 && !errorUser2 ? (
                            <div>
                                <DropMenu />
                            </div>) : (
                            <span></span>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default NavBar