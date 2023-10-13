import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearMsgCart, removeCartFunc } from '../../../Store/features/productSlice';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';

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



    // const AddCartHandler = () => {
    //     dispatch(addToCartFunc({_id: product._id, name: product.name, price: product.price, images: product.images[0].url, stock: product.stock, quantity: quantity}))
    // }

    const handleCartDelete = (id) => {

        dispatch(removeCartFunc({ _id: id }));
    }



    return (
        <div className="container mt-4">
            {
                cart && cart.length > 0 ? (
                    <><h1 className="mb-4">Your Shopping Cart</h1><div className="row">
                        <div className="col-md-8">
                            {cart && cart.length > 0 ? (
                                cart.map((cart) => (
                                    <div className="card mb-2" key={cart._id}>
                                        <div className="row no-gutters">
                                            <div className="col-md-3">
                                                <img src={cart.images} style={{ objectFit: "contain" }} alt="Product 1" width={130} height={130} className="card-img rounded-circle" />
                                            </div>
                                            <div className="col-md-9">
                                                <div className="card-body">
                                                    <h5 className="card-title">{cart.name}</h5>
                                                    <p className="card-text">Price: Rs.{cart.price}</p>
                                                    <div className="quantity-control">
                                                        <button className="btn btn-sm btn-secondary" onClick={() => decrementQuantity()}>-</button>
                                                        <span className="mx-2">{quantity}</span>
                                                        <button className="btn btn-sm btn-secondary" onClick={() => incrementQuantity()}>+</button>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="m-2 d-flex align-items-center gap-2" style={{ fontWeight: "800" }}>
                                                <p className="card-text m-2 text-dark">Total: Rs.{cart.price*cart.quantity}</p>
                                                <p className='cart-text text-danger m-2' role='button' onClick={() => handleCartDelete(cart._id)}>Remove</p>
                                                <Link to={`/product/${cart._id}`} className='cart-text text-danger text-decoration-none m-2' role='button'>Preview</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))

                            ) : (
                                <div>
                                    No cart items
                                </div>
                            )}

                        </div>

                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Cart Summary</h5>
                                    <p className="card-text">Subtotal: Rs.{cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
                                    <p className="card-text">Shipping: Rs.500</p>
                                    <p className="card-text">Total: Rs.{cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 500}</p>
                                    <button className="btn btn-primary btn-block">Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>

                    </div></>
                ) : (
                    <div>
                        No cart found
                    </div>
                )
            }

        </div>
    );
}

export default Cart;
