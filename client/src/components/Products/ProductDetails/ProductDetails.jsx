import React, { useState, useEffect, Fragment } from 'react';
import { productsDetails, productsReveiw, clearMsgReveiwer, addToCartFunc, clearMsgCart } from '../../../Store/features/productSlice';
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import Loader from "../../CustomLoader/Loader"
import "./details.css";
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import PrReviewes from './productReveiwes/PrReviewes';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();

    const [quantity, setQuantity] = useState(1);
    const [selectedRating, setSelectedRating] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [RisLoading, setRLoading] = useState(false);


    const { msg, loadingReveiw, errorRewiew, AuthError } = useSelector((state) => state.app.productReveiwer)
    const { msgCart } = useSelector((state) => state.app.addToCart)
    const { product, loading, error } = useSelector((state) => state.app.products)
    // the structure of redux is like app --> [products, loading, error] --> product

    useEffect(() => {
        if (!product.ratings) {
            setRLoading(true)
        }
        else {
            setRLoading(false)
        }
        dispatch(productsDetails(id));
    }, [dispatch, id, product.ratings]);



    if (error) {
        return <h2>{error}</h2>
    }



    // filter reveiwes by ratings
    const handleRatingChange = (e) => {
        const rating = parseFloat(e.target.value);
        setSelectedRating(rating)

        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    };

    const filteredReviews = selectedRating
        ? product.reveiws.filter((R) => R.rating === selectedRating)
        : product.reveiws;



    // reveiwe submit handler

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };


    const reviewSubmitHandler = () => {

        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", id);

        dispatch(productsReveiw(formData));

        setOpen(false);
        setRating(0);
        setComment("");

    }

    useEffect(() => {
        if (msg) {
            enqueueSnackbar(msg, { variant: "success" })
            dispatch(clearMsgReveiwer())
            window.location.reload()
        }
        if (errorRewiew || AuthError) {
            enqueueSnackbar(errorRewiew || AuthError, { variant: "error" })
            dispatch(clearMsgReveiwer())
        }
        if (msgCart) {
            enqueueSnackbar(msgCart, { variant: "success" })
            dispatch(clearMsgCart())
        }

    }, [msg, errorRewiew, enqueueSnackbar, dispatch, navigate, AuthError, msgCart])



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



    const AddCartHandler = () => {
        dispatch(addToCartFunc({_id: product._id, name: product.name, price: product.price, images: product.images[0].url, stock: product.stock, quantity: quantity}))
    }




    if (loadingReveiw || loading || RisLoading) {

        return <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
            <Loader />
        </div>
    }

    return (
        <Fragment>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={product.images && product.images[0].url}
                            alt="Product Image"
                            className="img-fluid mb-4"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p className="text-muted">{product.description}</p>
                        <div className='d-flex align-items-center gap-2 mb-3'>
                            <Rating value={product.ratings && product.ratings}
                                readOnly={true}
                                name="half-rating"
                                precision={0.5} />

                            <span> ({product.numOfReviews})</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-left gap-4 flex-column">
                            <div>
                                <h3 className="text-danger">${product.price}</h3>
                                <span className="text-success fw-bold">{product.stock && product.stock != 0 ? "In stock" : "out of stock"}</span>
                            </div>
                            <div className="input-group detailsInputIncreDec">
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={decrementQuantity}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={quantity}
                                    readOnly
                                    style={{ textAlign: "center" }}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={incrementQuantity}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <hr />
                        <h3>Product Features:</h3>
                        <ul>
                            <li>Feature 1</li>
                            <li>Feature 2</li>
                            <li>Feature 3</li>
                            {/* Add more features here */}
                        </ul>
                        <Button size='medium' onClick={AddCartHandler} color='primary' variant="contained" className='m-1'>Add to Cart</Button>
                    </div>
                </div>
                <h2 className='text-center m-5 p-5'>Product Reveiwe : </h2>
                <div className='container d-flex align-items-center justify-content-between px-3'>
                    <select onChange={handleRatingChange}>
                        <option value="">Filter By Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4.5">4.5 Stars</option>
                        <option value="3.5">3.5 Stars</option>
                        <option value="2.5">2.5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                    <div>
                        <button onClick={submitReviewToggle} className="submitReview">
                            Submit Reviewe
                        </button>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="card mb-5 gap-2">
                        {
                            isLoading ? (
                                <div className='d-flex justify-content-center align-items-center p-3'>
                                    <Loader />
                                </div>
                            ) : (
                                filteredReviews && filteredReviews.length > 0 ? (
                                    filteredReviews.map((R) => (
                                        <Fragment key={R._id}>
                                            <PrReviewes R={R} />
                                            <hr className='m-0' />
                                        </Fragment>
                                    ))
                                ) : (
                                    <h3 className='text-center text-danger'>No Reveiwes Found !</h3>
                                )
                            )
                        }
                    </div>
                </div>

                {/* add reveiwe product */}
                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                >
                    <DialogTitle>Submit Review</DialogTitle>
                    <DialogContent className="submitDialog d-flex flex-column gap-3 align-items-left">
                        <Stack spacing={1}>
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                                name="half-rating"
                                precision={0.5}
                            />
                        </Stack>
                        <textarea
                            className="submitDialogTextArea"
                            cols="30"
                            rows="5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={submitReviewToggle} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={reviewSubmitHandler} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </Fragment>
    );
};

export default ProductDetails;
