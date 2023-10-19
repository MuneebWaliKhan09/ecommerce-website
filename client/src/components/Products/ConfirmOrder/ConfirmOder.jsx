import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const ConfirmOder = () => {
    const navigate = useNavigate()
    const { cart } = useSelector((state) => state.app.addToCart)

    const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxPrice = subTotal * 0.05;
    const shippingPrice = subTotal > 5000 ? 0 : 500;
    const totalPrice = subTotal + taxPrice + shippingPrice;

    const HandleOrderInfo = (e) => {

        const data = {
            subTotal,
            taxPrice,
            shippingPrice,
            totalPrice
        }
        sessionStorage.setItem("order-info", JSON.stringify(data));

        if (sessionStorage.getItem("order-info")) {
            alert("done proceed to payment info")
            navigate('/payment-info')
        }

    }




    return (
        <>
            <div className="container mt-4">
                <h1 className="mb-4">Step 2: Review and Confirm Order</h1>
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Step 2: Review and Confirm</h5>
                                <div className="col-md-8">
                                    {
                                        cart.map((cart) => (
                                            <div className="card mb-2" key={cart._id}>
                                                <div className="row no-gutters">
                                                    <div className="col-md-3">
                                                        <img src={cart.image} style={{ objectFit: "contain" }} alt="Product 1" width={100} height={100} className="card-img rounded-circle" />
                                                    </div>
                                                    <div className="col-md-9">
                                                        <div className="card-body">
                                                            <h5 className="card-title">{cart.name}</h5>
                                                            <p className="card-text mb-1">Price: Rs.{cart.price}</p>
                                                            <span className="card-text mb-0 mt-1">Quantity: {cart.quantity}</span>
                                                        </div>
                                                    </div>
                                                    <div className="m-2 d-flex align-items-center gap-2" style={{ fontWeight: "800" }}>
                                                        <Link to={`/product/${cart._id}`} className='cart-text text-danger text-decoration-none m-2' role='button'>Preview</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Order Summary</h5>
                                <p className="card-text mb-2 mt-3">Subtotal: Rs.{subTotal}</p>
                                <p className="card-text mb-2">Shipping: Rs.{shippingPrice}</p>
                                <p className="card-text mb-2">Tax Price: Rs.{taxPrice}</p>
                                <p className="card-text mb-2">Total: Rs.{totalPrice}</p>
                                <Link to='/payment-info' >
                                    <button onClick={HandleOrderInfo} className='btn btn-primary mt-4 mb-1 w-100'>
                                        Proceed to Payment Info
                                        <span className='cart-text text-white m-2' role='button'><i className="bi bi-arrow-right-circle-fill"></i></span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ConfirmOder