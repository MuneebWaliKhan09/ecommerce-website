import React, { useEffect } from "react";
import SmallNav from "../SmallNav/SmallNav";
import DropMenu from "../DropMenu/DropMenu";
import "../home.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserDetails } from "../../../Store/features/productSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { errorUser2 } = useSelector((state) => state.app.userData);
  const { msgCart, cart } = useSelector((state) => state.app.addToCart);

  useEffect(() => {
    dispatch(loginUserDetails());
  }, [dispatch]);

  return (
    <>
      <div
        className="navbar-light bg-light navhome shadow d-flex align-items-center pe-4 ps-5"
        style={{
          justifyContent: "space-between",
          gap: "40px",
          padding: "18px",
        }}
      >
        <div
          className="navbar-brand logo d-flex align-items-center gap-5"
          style={{ fontWeight: "900", fontSize: "22px", color: "#ff6a38" }}
        >
          <div className="d-flex align-items-center gap-3">
            <SmallNav />
            <div className="d-flex align-items-center gap-2">
              <img
                src="/logo.png"
                width="43"
                height="43"
                className="d-inline-block align-top"
                alt="eS-Shop Logo"
              />
              eS-Shop
            </div>
          </div>
          <div className="d-flex align-items-center hideLinks gap-4">
            <Link
              className="text-decoration-none"
              style={{ fontSize: "19px", color: "#ff6a36" }}
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-decoration-none"
              style={{ fontSize: "19px", color: "#ff6a36" }}
              to="/products"
            >
              Products
            </Link>
          </div>
        </div>

        <div className="me-3 cartitems d-flex align-items-center gap-4">
          <Link to="/login" className="regDiv text-decoration-none">
            {/* {
                            errorUser2 && errorUser2 ? (<button  style={{color: "#ff6a38", border:"1px solid #ff6a31"}} className='btn d-flex buttonReg gap-1'>
                                Login
                                <i className="bi bi-person-fill"> </i>
                            </button>) : (
                                <span></span>
                            )
                        } */}

            <button
              style={{ color: "#ff6a38", border: "1px solid #ff6a31" }}
              className="btn d-flex buttonReg gap-1"
            >
              Login
              <i className="bi bi-person-fill"> </i>
            </button>
            <span></span>
          </Link>

          <Link
            to="/cart"
            type="button"
            style={{ color: "#ff6a38", border: "1px solid #ff6a31" }}
            className="btn position-relative"
          >
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart && cart.length}
            </span>
            <span className="bi bi-cart"></span>
          </Link>
          {!errorUser2 && !errorUser2 ? (
            <div>
              <DropMenu />
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
