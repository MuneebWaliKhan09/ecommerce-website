import React, { useState, useEffect, Fragment } from 'react';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux'

const PrReviewes = ({ R }) => {

    const { product, loading, error } = useSelector((state) => state.app.products)

    const options = {
        // size: 'large',
        value: product.ratings && product.ratings,
        readOnly: true
    };
    console.log(product.reveiws.createdtAt);

    return (
        <>
            {
                loading ? (
                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
                        <Loader />
                    </div>
                ) : (
                    <div class="card-body m-3">
                        <div class="d-flex align-items-center gap-2 ">
                            <img src='/userR.png' width={50} height={50} alt='user' class="user-avatar rounded-circle mr-3 text-primary" />                                                    <h5 class="card-title">{R.name}</h5>
                            <h5 className="card-title mb-0">{R.username}</h5>
                        </div>
                        <div class="my-3">
                            <span class="text-warning"><Rating {...options} /></span>
                        </div>
                        <p class="card-text">{R.comment}</p>
                        <p class="card-text text-muted">Posted on: <span style={{fontSize: "15px"}}>{new Date( R.createdAt).toDateString()}</span></p>
                    </div>
                )
            }


        </>
    )
}

export default PrReviewes