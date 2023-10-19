import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMsgCart, removeCartFunc, addToCartFunc } from '../../../Store/features/productSlice';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const Cart = () => {
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();
    const { msgCart, cart } = useSelector((state) => state.app.addToCart)
    const { product, loading, error } = useSelector((state) => state.app.products)

    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1)
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };


    useEffect(() => {

        if (msgCart) {
            enqueueSnackbar(msgCart, { variant: "success" })
            dispatch(clearMsgCart())
        }

    }, [msgCart])



    const handleCartDelete = (id) => {

        dispatch(removeCartFunc({ _id: id }));
    }



    return (
        <div className="container mt-4">
            {
                cart && cart.length > 0 ? (
                    <><h1 class="mb-5  d-flex align-items-center gap-3">
                        <span class="text-secondary" style={{ fontWeight: "900" }}>Your</span>
                        <span class="text-secondary font-weight-bold">Shopping Cart</span>
                        <i class="bi bi-cart text-danger" style={{ fontSize: "2.1rem" }}></i>
                    </h1>

                        <div className="row">
                            <div className="col-md-8">
                                {
                                    cart.map((cart) => (
                                        <div className="card mb-2" key={cart._id}>
                                            <div className="row no-gutters">
                                                <div className="col-md-3">
                                                    <img src={cart.image} style={{ objectFit: "contain" }} alt="Product 1" width={130} height={130} className="card-img rounded-circle" />
                                                </div>
                                                <div className="col-md-9">
                                                    <div className="card-body">
                                                        <h5 className="card-title">{cart.name}</h5>
                                                        <p className="card-text">Price: Rs.{cart.price}</p>
                                                        <div className="quantity-control d-flex align-items-center gap-3">
                                                            <button className="btn btn-sm btn-secondary" onClick={() => { decrementQuantity(); dispatch(addToCartFunc({ _id: cart._id, quantity: cart.quantity > 1 ? cart.quantity - 1 : 1 })) }}>-</button>
                                                            <span className="mx-2">{cart.quantity}</span>
                                                            <button className="btn btn-sm btn-secondary" onClick={() => { incrementQuantity(); dispatch(addToCartFunc({ _id: cart._id, quantity: cart.quantity < cart.stock ? cart.quantity + 1 : cart.stock })) }}>+</button>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="m-2 d-flex align-items-center gap-2" style={{ fontWeight: "800" }}>
                                                    <p className="card-text m-2 text-dark">Total: Rs.{cart.price * cart.quantity}</p>
                                                    <p className='cart-text text-danger m-2' role='button' onClick={() => handleCartDelete(cart._id)}>Remove</p>
                                                    <Link to={`/product/${cart._id}`} className='cart-text text-danger text-decoration-none m-2' role='button'>Preview</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Cart Summary</h5>
                                        <p className="card-text mb-2 mt-3">Subtotal: Rs.{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                                        <p className="card-text">Total: Rs.{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                                        <Link to='/shipping-info'>
                                            <button className="btn btn-primary btn-block">Proceed to Checkout</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div></>
                ) : (
                    <div className='d-flex justify-content-center align-items-center p-3 flex-column' style={{ minHeight: "50vh" }}>
                        <h3>No Cart items Found !</h3>
                        <RemoveShoppingCartIcon style={{ fontSize: "70px", color: "red", marginBottom: "20px" }} />
                        <Link to='/products' className='btn btn-primary btn-lg'>
                            <span className='cart-text text-white m-2' role='button'><i class="bi bi-arrow-left-circle-fill"></i></span>
                            Back to Products
                        </Link>
                    </div>
                )
            }

        </div>
    );
}

export default Cart;
