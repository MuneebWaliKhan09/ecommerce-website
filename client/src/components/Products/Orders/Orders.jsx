import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allOrders } from '../../../Store/features/productSlice';
import { Link } from 'react-router-dom';
import Loader from "../../CustomLoader/Loader"
import { Table, Button, Badge, Container } from 'react-bootstrap';


const Orders = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state) => state.app.orderInfo);


    useEffect(() => {
        dispatch(allOrders());
    }, [dispatch]);

    if (loading) {
        return <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
            <Loader />
        </div>
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            Orders
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Order Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders && orders.length > 0 && orders.map((items) => (
                                            <tr key={items._id}>
                                                <td>{items._id}</td>
                                                <td>
                                                    <Link to={`/order/${items._id}`}>
                                                        {items.orderItems[0].name}
                                                    </Link>
                                                </td>
                                                <td>{items.orderItems[0].quantity}</td>
                                                <td>${items.orderItems[0].price * items.orderItems[0].quantity}</td>
                                                <td>
                                                    {items.orderStatus === 'Delivered' ? (
                                                        <Badge variant="custom-success">Delivered</Badge>
                                                    ) : (
                                                        <Badge variant="custom-primary">Processing</Badge>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
