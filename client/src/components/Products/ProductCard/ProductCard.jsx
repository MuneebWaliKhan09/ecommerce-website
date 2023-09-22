import React from 'react'
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import { Link } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import "./card.css";
import Button from '@mui/material/Button';

const ProductCard = ({ items }) => {

  const options = {
    // size: 'large',
    value: items.ratings,
    readOnly: true
  };

  return (
    <>
      <Link className='text-decoration-none' to={`/product/${items._id}`}>
        <div className="card" style={{ width: "15rem"}}>
          <img width={100} height={180} src={items.images[0].url} className="card-img-top" alt="..." />
          <div className="card-body d-flex flex-column gap-2">
            <h5 className="card-title">{items.name && items.name.slice(0, 35)}</h5>
            <p className='m-0 p-0 text-primary'>{items.category}</p>
            <div className='d-flex align-items-center gap-2'>
              <Rating {...options} />
              <span> ({items.numOfReviews})</span>
            </div>
            <p className="card-text text-bold text-danger m-0">$ {items.price}</p>
            <Button variant="contained" className='m-1'>Add to Cart</Button>
          </div>
        </div>
      </Link>

    </>
  )
}

export default ProductCard