import React, { Fragment, useEffect } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import "./home.css";
import Carosule from './Carosule/Carosule';
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard/ProductCard';
import Loader from "../CustomLoader/Loader"
import Error from "../customError/Error"
import { Link } from 'react-router-dom';
import { allProducts } from '../../Store/features/productSlice';

const Home = () => {
  const dispatch = useDispatch();


  const { products } = useSelector((state) => state.app.products.products)
  const { loading, error } = useSelector((state) => state.app.products)

  useEffect(() => {
    dispatch(allProducts({}));
  }, [dispatch]);

  if (error) {
    return <Error />
  }



  return (
    <Fragment>
      {
        loading ? (
          <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
            <Loader />
          </div>
        )
          : (
            <div>
              <Carosule />
              <main className='main'>

                <div className='Heading'>
                  <h1>Latest Products: </h1>
                </div>

                <div className='LatestProducts'>
                  {loading ? (
                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
                      <Loader />
                    </div>
                  ) : (
                    products && products.map((item) => (
                      <ProductCard items={item} key={item._id} />
                    ))
                  )

                  }

                </div>
                <Link to='/products' className='morePrBtn text-decoration-none'>
                  <button className='btn btn-danger py-2 pl-0 px-5 text-light '>
                    See More Products {" "} {" "}
                    <span className='bi bi-chevron-right'></span>
                  </button>
                </Link>
              </main>

            </div>
          )
      }

    </Fragment>


  );
};

export default Home
