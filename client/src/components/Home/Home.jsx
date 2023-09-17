import React, { Fragment, useEffect } from 'react';
import SmallNav from "./SmallNav/SmallNav";
import DropMenu from "./DropMenu/DropMenu";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import "./home.css";
import Carosule from './Carosule/Carosule';
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux'
import { fetchProducts } from "../../Store/productSlice"
import ProductCard from './ProductCard/ProductCard';
import Loader from "../CustomLoader/Loader"
import Error from "../customError/Error"

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const { products, loading, error } = useSelector((state) => state.products)


  if(error){
    return <Error/>
  }

  return (
    <Fragment>
      {
        loading ? (
          <div className='d-flex flex-column align-items-center justify-content-center' style={{width: "100%", height: "100vh", zIndex:"999"}}>
            <Loader />
          </div>
        )
          : (
            <div>
              <div className="navbar-light bg-light navhome shadow d-flex align-items-center pe-4 ps-5" style={{ justifyContent: "space-between", gap: "40px", padding: "18px" }}>
                <div className="navbar-brand logo d-flex align-items-center gap-2" style={{ fontWeight: "900", fontSize: "22px", color: "orangered" }}>
                  <SmallNav />
                  <img src="/logo.png" width="43" height="43" className="d-inline-block align-top" alt="eS-Shop Logo" />
                  eS-Shop
                </div>

                <div className='input-group searchMenu input-group-lg'>
                  {/* <div className='input-group catDrop' style={{ width: 190 }}>
                <select className='form-select'>
                  <option value="">All</option>
    
                </select>
              </div> */}

                  <input type="text" className='form-control search' placeholder='Search Products Here...' />
                  <button className='btn btn-warning text-light searchBtn'>
                    Search
                    <span className='bi bi-chevron-right'></span>
                  </button>
                </div>


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
              <Carosule />

              <main className='main'>
                <div className='Heading'>
                  <h1>Latest Products: </h1>
                </div>
                <div className='LatestProducts'>
                  {loading ? (
                    <div>
                      <Loader />

                    </div>
                  ) : (
                    products && products.map((item) => (
                      <ProductCard items={item} key={item.id} />
                    ))
                  ) 

                  }
                </div>
              </main>

            </div>
          )
      }

    </Fragment>


  );
};

export default Home
