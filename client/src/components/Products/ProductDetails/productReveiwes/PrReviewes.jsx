import React, { useState, useEffect, Fragment } from 'react';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux'

const PrReviewes = ({ R }) => {

    const { product, loading, error } = useSelector((state) => state.app.products)

    const options = {
        // size: 'large',
        value: product.ratings && product.ratings,
        readOnly: true,
        name: "half-rating-read",
        defaultValue: 2.5,
        precision: 0.5
    };



    const backgroundColors = [
        'bg-primary',
        'bg-secondary',
        'bg-success',
        'bg-danger',
        'bg-warning',
        'bg-info',
        'bg-dark',
    ];
    
    // Function to get a random background color
    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * backgroundColors.length);
        return backgroundColors[randomIndex];
    }


    return (
        <>

            {
                loading ? (
                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
                        <Loader />
                    </div>
                ) : (
                    <div className="card-body m-3">
                        <div className="d-flex align-items-center gap-3 ">
                            {/* <img src='/userR.png' width={50} height={50} alt='user' className="user-avatar rounded-circle mr-3 text-primary" />                                                    <h5 className="card-title">{R.name}</h5> */}
                            <div
                                className={`user-avatar ${getRandomColor()} font-weight-bold rounded-circle mr-3 text-white text-center d-flex justify-content-center align-items-center`}
                                style={{ width: '50px', height: '50px' , fontSize:"18px"}}
                            >
                                {R.username && R.username.slice(0, 1).toUpperCase()}
                            </div>
                            <h5 className="card-title mb-0 text-secondary" style={{fontSize:"18px"}}>{R.username}</h5>
                        </div>
                        <div className="my-3">
                            <span className="text-warning"><Rating {...options} /></span>
                        </div>
                        <p className="card-text">{R.comment}</p>
                        <p className="card-text text-muted">Posted on: <span style={{ fontSize: "15px" }}>{new Date(R.createdAt).toDateString()}</span></p>
                    </div>
                )
            }


        </>
    )
}

export default PrReviewes