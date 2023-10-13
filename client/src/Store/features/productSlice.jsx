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




// create product reveiwe

export const productsReveiw = createAsyncThunk("productReveiw", async (data, { rejectWithValue }) => {

    try {

        const token = document.cookie.toString(/token=([^;]+)/)[1];
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                "Accept": "application/json"
            }
        };

        const res = await axios.put(`/api/createReview`, data, config)

        console.log(res.data);
        return res.data;


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



export const productReveiwer = createSlice({
    name: "productReveiwer",

    initialState: {
        loadingReveiw: false,
        errorRewiew: null,
        AuthError: null,
        msg: null
    },

    reducers: {
        clearMsgReveiwer(state) {
            state.msg = null;
            state.errorRewiew = null;
            state.AuthError = null;
        }

    }
    ,
    extraReducers: {
        [productsReveiw.pending]: (state) => {
            state.loadingReveiw = true;
            state.errorRewiew = null;

        },

        [productsReveiw.fulfilled]: (state, action) => {
            state.loadingReveiw = false;
            state.msg = action.payload.msg;
            state.loadingReveiw = false;

        },
        [productsReveiw.rejected]: (state, action) => {
            state.loadingReveiw = false;
            state.errorRewiew = action.payload.err;
            state.AuthError = action.payload.msg;
            state.msg = null;
        }
    }

})


export const addToCart = createSlice({
    name: "addToCart",
    initialState: {
        cart: JSON.parse(localStorage.getItem("cart")) || [], // Initialize cart from localStorage
        msgCart: null,
    },
    reducers: {

        addToCartFunc: (state, action) => {
            const newCartItem = action.payload;
            const existingItemIndex = state.cart.findIndex(item => item._id === newCartItem._id);

            if (existingItemIndex !== -1) {

                state.cart[existingItemIndex].quantity = newCartItem.quantity;
                state.msgCart = "Cart item updated successfully";

            } else {

                state.cart.push(newCartItem);
                state.msgCart = "Cart item added successfully";
            }

            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        removeCartFunc: (state, action) => {
            const id = action.payload._id
            const data = state.cart.filter((item)=>{
                return item._id !== id
            })
            if(data){
                state.msgCart = "Cart item removed successfully";
            }
            state.cart = data;
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        clearMsgCart: (state) => {
            state.msgCart = null;
        }
    }
});



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


// forgot password
export const forgotPasswordUser = createAsyncThunk("forgotPasswordUser", async ({ email: email }, { rejectWithValue }) => {

    try {
        const res = await axios.post("/api/forgot/password", { email });
        return res.data.msg;


    } catch (error) {
        return rejectWithValue(error.response.data.err);
    }

})

// reset password
export const resetPasswordUser = createAsyncThunk("resetPasswordUser", async ({ password: password, confirmPassword: confirmPassword, token: token }, { rejectWithValue }) => {

    try {
        const res = await axios.put(`/api/password/reset/${token}`, { password, confirmPassword });
        return res.data.msg;


    } catch (error) {
        return rejectWithValue(error.response.data.err);
    }

})

// update user profile
export const updateUserProfile = createAsyncThunk("updateUserProfile", async (data, { rejectWithValue }) => {

    try {
        const token = document.cookie.toString(/token=([^;]+)/)[1];
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": token,
                "Accept": "application/json"
            }
        };


        const res = await axios.put(`/api/updateUserProfile`, data, config);
        console.log(res.data.msg);
        return res.data.msg;


    } catch (error) {
        return rejectWithValue(error.response.data.err);
    }

})


// update user profile
export const updateUserPassword = createAsyncThunk("updateUserPassword", async ({ oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword }, { rejectWithValue }) => {

    try {
        const token = document.cookie.toString(/token=([^;]+)/)[1];
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                "Accept": "application/json"
            }
        };

        const res = await axios.put(`/api/updateUserPassword`, { oldPassword, newPassword, confirmPassword }, config);
        console.log(res.data.msg);
        return res.data.msg;


    } catch (error) {
        return rejectWithValue(error.response.data.err);
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
        clearErrorUser: (state) => {  // remember if you do not add this reducer the messages 
            //from backend will apeared two times on success or fail
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


export const forgotPass = createSlice({
    name: "forgotPasswordUser",
    initialState: {
        loadingForgotPass: false,
        errorforgotPass: null,
        msgForgotPass: null
    },

    reducers: {
        clearErrorForgotPass: (state) => {
            state.errorforgotPass = null;
            state.msgForgotPass = null;
        }
    },

    extraReducers: {
        [forgotPasswordUser.pending]: (state) => {
            state.loadingForgotPass = true;
            state.errorforgotPass = null;
        },
        [forgotPasswordUser.fulfilled]: (state, action) => {
            state.msgForgotPass = action.payload;
            state.loadingForgotPass = false;
            state.errorforgotPass = null;
        },
        [forgotPasswordUser.rejected]: (state, action) => {
            state.loadingForgotPass = false;
            state.errorforgotPass = action.payload;
            state.msgForgotPass = null;
        },

        // resete password
        [resetPasswordUser.pending]: (state) => {
            state.loadingForgotPass = true;
            state.errorforgotPass = null;
        },
        [resetPasswordUser.fulfilled]: (state, action) => {
            state.msgForgotPass = action.payload;
            state.loadingForgotPass = false;
            state.errorforgotPass = null;
        },
        [resetPasswordUser.rejected]: (state, action) => {
            state.loadingForgotPass = false;
            state.errorforgotPass = action.payload;
            state.msgForgotPass = null;
        },
    }

})


export const updateUserProf = createSlice({
    name: "updateUserProfile",
    initialState: {
        loadingUpdate: false,
        errorUpdate: null,
        msgUpdate: null
    },

    reducers: {
        clearErrorUpdateProfile: (state) => {
            state.errorUpdate = null;
            state.msgUpdate = null;
        }
    }
    ,

    extraReducers: {
        [updateUserProfile.pending]: (state) => {
            state.loadingUpdate = true;
            state.errorUpdate = null;
        },

        [updateUserProfile.fulfilled]: (state, action) => {
            state.msgUpdate = action.payload;
            state.loadingUpdate = false;
            state.errorUpdate = null;
        },

        [updateUserProfile.rejected]: (state, action) => {
            state.loadingUpdate = false;
            state.errorUpdate = action.payload;
            state.msgUpdate = null;
        },

        // update user password
        [updateUserPassword.pending]: (state) => {
            state.loadingUpdate = true;
            state.errorUpdate = null;
        },

        [updateUserPassword.fulfilled]: (state, action) => {
            state.msgUpdate = action.payload;
            state.loadingUpdate = false;
            state.errorUpdate = null;
        },

        [updateUserPassword.rejected]: (state, action) => {
            state.loadingUpdate = false;
            state.errorUpdate = action.payload;
            state.msgUpdate = null;
        }
    }
})



export const { clearError } = auth.actions;
export const { clearErrorUser } = userData.actions;
export const { clearMsgReveiwer } = productReveiwer.actions;
export const { clearErrorForgotPass } = forgotPass.actions;
export const { clearErrorUpdateProfile } = updateUserProf.actions;
export const { removeCartFunc, addToCartFunc, clearMsgCart } = addToCart.actions


// ============================================ END User =====================================================================================










const rootReducer = combineReducers({
    products: productFunctionality.reducer,
    user: user.reducer,
    userAuth: auth.reducer,
    userData: userData.reducer,
    productReveiwer: productReveiwer.reducer,
    forgotPass: forgotPass.reducer,
    updateUserProf: updateUserProf.reducer,
    addToCart: addToCart.reducer
});


export default rootReducer;