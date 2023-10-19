import React, { Fragment, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";

import './payment.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearMsgOrder, createOrder } from '../../../Store/features/productSlice';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Loader from "../../CustomLoader/Loader"

const PaymentInfo = () => {
    const orderINFO = JSON.parse(sessionStorage.getItem('order-info'))
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    const payBtn = useRef(null);
    const stripe = useStripe();
    const elements = useElements();

    const { cart, shippingInfo } = useSelector((state) => state.app.addToCart)
    const { user } = useSelector((state) => state.app.userData)
    const { errorOrder, msgOrder, loading } = useSelector((state) => state.app.orderInfo)

    const paymentData = {
        amount: Math.round(orderINFO.totalPrice),
    };
    const order = {
        shippingInfo,
        orderItems: cart,
        itemsPrice: orderINFO.subTotal,
        taxPrice: orderINFO.taxPrice,
        shippingPrice: orderINFO.shippingPrice,
        totalPrice: orderINFO.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;

                enqueueSnackbar(result.error.message, { variant: "error" })
            }

            else {
                if (result.paymentIntent.status === "succeeded") {
                    const updatedOrder = {
                        ...order,   // append paymentInfo in order whule
                        paymentInfo: {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status,
                        }
                    }


                    dispatch(createOrder(JSON.stringify(updatedOrder)));

                } else {
                    enqueueSnackbar('issue occured while processing the payement', { variant: "error" })
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
        }

    }


    useEffect(() => {
        if (errorOrder) {
            enqueueSnackbar(errorOrder, { variant: "error" })
        }
        if (msgOrder) {
            enqueueSnackbar(msgOrder, { variant: "success" })
            navigate('/')

        }
        return () => {
            dispatch(clearMsgOrder());
        }
    }, [errorOrder, msgOrder, dispatch])

    if (loading) {
        return <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "1000" }}>
            <Loader />
        </div>
    }


    return (
        <Fragment>

            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ₹${orderINFO && orderINFO.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>

        </Fragment>
    )
}

export default PaymentInfo