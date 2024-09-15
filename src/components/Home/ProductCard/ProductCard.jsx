import React from 'react'
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import "./card.css";

const ProductCard = ({ items }) => {

  const options = {
    value: items.ratings && items.ratings,
    readOnly: true,
    name: "half-rating-read",
    defaultValue: 2.5,
    precision: 0.5
  };

  return (
    <>
      <Link className='text-decoration-none border rounded' to={`/product/${items._id}`}>
        <div className="card cardwrapper" style={{ width: "16rem" }}>
          <div className="img-wrapper">
            <img height={200} src={items.images[0].url} className="card-img-top" alt="..." />
          </div>
          <div className="card-body d-flex flex-column gap-2">
            <h5 className="card-title" style={{color: "#ff6a33"}}>{items.name && items.name.slice(0, 35)}</h5>
            <p className='m-0 p-0 text-primary'>{items.category}</p>
            <div className='d-flex align-items-center gap-2'>
              <Rating {...options} />
              <span> ({items.numOfReviews})</span>
            </div>
            <p className="card-text text-danger m-0" style={{fontSize: "17px", fontWeight:"900"}}>$ {items.price}</p>
          </div>
        </div>
      </Link>

    </>
  )
}

export default ProductCard