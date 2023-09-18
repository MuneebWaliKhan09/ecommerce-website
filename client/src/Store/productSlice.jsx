
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (keyword='') => {
        try {
            const response = await axios.get(`/api/allProducts?keyword=${keyword}`);
            return response.data;
        } catch (error) {
            throw error; // Throw the error for handling in productError
        }
    }
);



export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Set the error message
            });
    },
});

export default productsSlice.reducer;



