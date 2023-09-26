import { createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";



// get all users

export const allProducts = createAsyncThunk("allProducts", async ({ currentPage = 1, category = '', minPrice = 100, maxPrice = 20000, keyword = '' }, { rejectWithValue }) => {
    let apiUrl = `/api/allProducts?page=${currentPage}&minPrice=${minPrice}&maxPrice=${maxPrice}&keyword=${keyword}`;

    if (category) {
        apiUrl += `&category=${category}`;
    }

    try {

        const res = await axios.get(apiUrl);

        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})


// get productsDetails

export const productsDetails = createAsyncThunk("productsDetail", async (id, { rejectWithValue }) => {
    const res = await axios.get(`/api/getProductDetails/${id}`)

    try {

        return res.data.product;

    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})




export const productFunctionality = createSlice({
    name: "productFunctionality",
    initialState: {
        products: [],
        product: {},
        loading: false,
        error: null,

    },

    extraReducers: {

        [allProducts.pending]: (state) => {
            state.loading = true;
        },

        [allProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },

        [allProducts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store the error message or details here
            state.products = []; // Optionally, clear the products array
        }

        ,

        [productsDetails.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },

        [productsDetails.fulfilled]: (state, action) => {
            state.product = action.payload;
            state.error = null;
            state.loading = false;
        },

        [productsDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }


})


// export const productDetailsFunctionality = createSlice({
//     name: "productsDetail",
//     initialState: {
//         product: {},
//         loading: false,
//         error: null,

//     },

//     extraReducers: {


//     }


// })





const rootReducer = combineReducers({
    products: productFunctionality.reducer,
});


export default rootReducer;