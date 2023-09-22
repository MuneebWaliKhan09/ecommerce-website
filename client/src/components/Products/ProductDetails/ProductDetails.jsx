import React, { useState, useEffect, Fragment } from 'react';
import { productDetails } from '../../../Store/actions/productActions';
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import Loader from "../../CustomLoader/Loader"
import Error from "../../customError/Error"
import "./details.css";
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [quantity, setQuantity] = useState(1);


  const { product, loading, msg } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(productDetails(params.id))
  }, [dispatch])





  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };



  const options = {
    // size: 'large',
    value: product.ratings,
    readOnly: true
  };


  return (
    <Fragment>
      {
        loading ? (
          <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
            <Loader />
          </div>

        ) : msg ? (<Error />) : (


          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={product.images && product.images[0].url}
                  alt="Product Image"
                  className="img-fluid mb-4"
                />
              </div>
              <div className="col-md-6">
                <h2>{product.name}</h2>
                <p className="text-muted">{product.description}</p>
                <div className='d-flex align-items-center gap-2 mb-3'>
                  <Rating {...options} />
                  <span> ({product.numOfReviews})</span>
                </div>
                <div className="d-flex justify-content-between align-items-left gap-4 flex-column">
                  <div>
                    <h3 className="text-danger">${product.price}</h3>
                    <span className="text-success fw-bold">{product.stock != 0 ? "In stock" : "out of stock"}</span>
                  </div>
                  <div className="input-group detailsInputIncreDec">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={decrementQuantity}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control"
                      value={quantity}
                      readOnly
                      style={{ textAlign: "center" }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={incrementQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <hr />
                <h3>Product Features:</h3>
                <ul>
                  <li>Feature 1</li>
                  <li>Feature 2</li>
                  <li>Feature 3</li>
                  {/* Add more features here */}
                </ul>
                <Button size='medium' color='primary' variant="contained" className='m-1'>Add to Cart</Button>
              </div>
            </div>
          </div>
        )
      }
    </Fragment>

  );
};

export default ProductDetails;
