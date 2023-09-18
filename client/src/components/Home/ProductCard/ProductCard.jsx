import React from 'react'
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import "./card.css";

const ProductCard = ({ items }) => {

  const options = {
    // size: 'large',
    value: items.ratings,
    readOnly: true
  };

  return (
    <>
      <Link className='text-decoration-none' to={`/product/${items._id}`}>
        <div class="card" style={{ width: "15rem"}}>
          <img width={100} height={200} src={items.images[0].url} class="card-img-top" alt="..." />
          <div class="card-body d-flex flex-column gap-3">
            <h5 class="card-title">{items.name && items.name.slice(0, 35)}</h5>
            <div className='d-flex align-items-center gap-2'>
              <Rating {...options} />
              <span> ({items.numOfReviews})</span>
            </div>
            <p class="card-text text-bold text-danger">$ {items.price}</p>
          </div>
        </div>
      </Link>

    </>
  )
}

export default ProductCard