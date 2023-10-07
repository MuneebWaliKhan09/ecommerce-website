import { createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";






// get products

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








// =================================================== User Login , Register =======================================================================




export const registerUser = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {

    try {
        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const res = await axios.post("/api/registerUser", data, config);

        return res.data.msg;
    } catch (error) {
        return rejectWithValue(error.response.data.err);
    }

})


export const loginUser = createAsyncThunk("auth/login", async ({ email: email, password: password }, { rejectWithValue }) => {

    try {
        const config = { headers: { "Content-Type": "application/json" } };

        const res = await axios.post("/api/loginUser", { email, password }, config);

        return res.data.msg;
    } catch (error) {
        return rejectWithValue(error.response.data.err);
    }

})


export const logoutUser = createAsyncThunk("auth/logout", async (rand, { rejectWithValue }) => {

    try {
        const config = { headers: { "Content-Type": "application/json" } };

        const res = await axios.get("/api/logoutUser", config);

        return res.data.msg;
    } catch (error) {
        return rejectWithValue(error.response.data.err);
    }

})


export const loginUserDetails = createAsyncThunk("auth/userDetails", async (rand, { rejectWithValue }) => {

    try {
        const token = document.cookie.toString(/token=([^;]+)/)[1];
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                "Accept": "application/json"
            }
        };

        const res = await axios.get("/api/getUserDetails", config);
        return res.data.user;


    } catch (error) {
        return rejectWithValue(error.response.data);
    }

})




// Create a slice for your registerring user.
const user = createSlice({
    name: 'userRegister',
    initialState: {
        loading: false,
        error: null,
        msg: null
    },

    extraReducers: {
        [registerUser.pending]: (state, action) => {
            state.loading = true;
            state.error = null
        },

        [registerUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.msg = action.payload;
        },

        [registerUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
});







export const auth = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        msg1: '',
        msg2: '',
        error1: null,
        error: null,

    },
    reducers: {
        clearError: (state) => {
            state.error1 = null;
            state.error = null;
            state.msg1 = '';
            state.msg2 = '';
        }
    },
    extraReducers: {

        [loginUser.pending]: (state) => {
            state.loading = true;
        },

        [loginUser.fulfilled]: (state, action) => {
            state.msg1 = action.payload;
            state.loading = false;
            state.error1 = null;
        },

        [loginUser.rejected]: (state, action) => {
            state.loading = false;
            state.error1 = action.payload;
        },


        [logoutUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },

        [logoutUser.fulfilled]: (state, action) => {
            state.msg2 = action.payload;
            state.error = null;
            state.loading = false;
        },

        [logoutUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }


})


export const userData = createSlice({
    name: "userData",
    initialState: {
        loadingUser: false,
        errorUser: null,
        errorUser2: null,
        user: null
    },

    reducers: {
        clearErrorUser: (state) => {
            state.errorUser = null;
            state.errorUser2 = null;
            state.user = null;
        }
    },

    extraReducers: {
        [loginUserDetails.pending]: (state) => {
            state.loadingUser = true;
            state.errorUser2 = null;
            state.errorUser = null;
        },
        [loginUserDetails.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.loadingUser = false;
            state.errorUser = null;
            state.errorUser2 = null;
        },
        [loginUserDetails.rejected]: (state, action) => {
            state.loadingUser = false;
            state.errorUser = action.payload.message;  // session expired message from server
            state.errorUser2 = action.payload.msg; // login to access the page error from server
            state.user = null;
        },
    }




})

export const { clearError } = auth.actions;
export const { clearErrorUser } = userData.actions;


// ============================================ END User =====================================================================================










const rootReducer = combineReducers({
    products: productFunctionality.reducer,
    user: user.reducer,
    userAuth: auth.reducer,
    userData: userData.reducer,
});


export default rootReducer;