import React, { Fragment, useEffect } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import "../Home/home.css";
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux'
import { fetchProducts } from "../../Store/productSlice"
import ProductCard from './ProductCard/ProductCard';
import Loader from "../CustomLoader/Loader"
import Error from "../customError/Error"
import { Link, useParams } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;

  const { products, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchProducts(keyword));
  }, [dispatch, keyword]);

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
                    products.products && products.products.map((item) => (
                      <ProductCard items={item} key={item.id} />
                    ))
                  )

                  }

                </div>
                <Link to='/products' className='morePrBtn text-decoration-none'>

                </Link>
              </main>

            </div>
          )
      }

    </Fragment>


  );
};

export default Products
