import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { orderDetails } from '../../../../Store/features/productSlice'
import Loader from "../../../CustomLoader/Loader"

const Order = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { order, loading } = useSelector((state) => state.app.orderInfo);

    useEffect(() => {

        dispatch(orderDetails(params.id));

    }, [dispatch]);

    if (loading) {
        return <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
            <Loader />
        </div>
    }

    return (
        <div className='row col-md-12 p-2 mb-5'>
            <div className="container mt-5">
                <div className="card" style={{ zIndex: "999" }}>
                    <div class="card mb-3" >
                        <div class="card-header bg-primary text-white">
                            User Information
                        </div>
                        <div class="card-body">
                            <p class="card-text">Email: {order && order.user && order.user.email}</p>
                            <p class="card-text">Address: {order && order.shippingInfo && order.shippingInfo.address}</p>
                        </div>
                    </div>

                    <div className="card-header bg-primary text-white">
                        Order Details
                    </div>
                    <div className="card-body">
                        <h6 className="card-title">Order ID: {order && order._id}</h6>
                        <p className="card-text mb-1">Order Date: {new Date(order && order.createdAt).toDateString()}</p>
                        {
                            order && order.deliveredAt ? (
                                <p className="m-0  ">Delivered  Date: <span className='text-danger text-uppercase'>{new Date(order && order.deliveredAt).toDateString()}</span></p>

                            ):(
                                null
                            )
                        }
                        <hr />
                        <h5 className="card-title">Products</h5>
                        <ul className="list-group">
                            {order && order.orderItems && order.orderItems.map((item, index) => (
                                <li className="list-group-item" key={index}>
                                    <span className="badge badge-primary mr-2">{item.quantity}</span>
                                    {item.name} - ${item.price}
                                </li>
                            ))}
                        </ul>
                        <hr />
                        <h5 className="card-title">Total Amount: Rs.{order && order.totalPrice}</h5>
                        <h5 className="card-title">Order Status: <span style={{ color: order && order.orderStatus === "Delivered" ? "green" : "orangered" }}>{order && order.orderStatus}...</span></h5>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
