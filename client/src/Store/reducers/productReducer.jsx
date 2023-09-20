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


export const ProductReducer = ((state = { products: [] }, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                totalProducts: action.payload.totalProducts,
                resultPerPage: action.payload.resultPerPage,
                pages: action.payload.pages,
                pageNo: action.payload.pageNo,
            }
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }





})