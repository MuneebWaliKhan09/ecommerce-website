import axios from "axios";

import {
    // products fetching requests
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    CLEAR_ERRORS,

    // product details req
    // PRODUCT_DETAILS_REQUEST,
    // PRODUCT_DETAILS_SUCCESS,
    // PRODUCT_DETAILS_FAIL,

    // NEW_REVIEW_REQUEST,
    // NEW_REVIEW_FAIL,
    // NEW_REVIEW_SUCCESS,
    // NEW_REVIEW_RESET

} from "../constants/ProductConstants";



export const getProducts = (keyword = '', currentPage = 1, category, minPrice=0, maxPrice=1000) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let link = `/api/allProducts?keyword=${keyword}&page=${currentPage}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

        if(category){
            link = `/api/allProducts?keyword=${keyword}&page=${currentPage}&category=${category}`;
        }
        
        const { data } = await axios.get(link);
        dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: ALL_PRODUCT_FAIL, payload: error.response.data.msg });
    }

}