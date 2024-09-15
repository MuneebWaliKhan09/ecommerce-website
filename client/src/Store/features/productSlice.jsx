import { createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "https://ecommerce-website-umber-three.vercel.app"



// Get all products
export const allProducts = createAsyncThunk(
    "allProducts",
    async ({ currentPage = 1, category = '', minPrice = 20, maxPrice = 20000, keyword = '' }, { rejectWithValue }) => {
      let apiUrl = `${BASE_URL}/api/allProducts?page=${currentPage}&minPrice=${minPrice}&maxPrice=${maxPrice}&keyword=${keyword}`;
  
      if (category) {
        apiUrl += `&category=${category}`;
      }
  
      try {
        const res = await axios.get(apiUrl, { withCredentials: true }); // Include credentials
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Get product details
  export const productsDetails = createAsyncThunk(
    "productsDetail",
    async (id, { rejectWithValue }) => {
      try {
        const res = await axios.get(`${BASE_URL}/api/getProductDetails/${id}`, { withCredentials: true }); // Include credentials
        return res.data.product;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Create product review
  export const productsReview = createAsyncThunk(
    "productReview",
    async (data, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.put(`${BASE_URL}/api/createReview`, data, config);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Create order
  export const createOrder = createAsyncThunk(
    "createOrder",
    async (order, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.post(`${BASE_URL}/api/createOrder`, order, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Get all orders of logged-in user
  export const allOrders = createAsyncThunk(
    "allOrders",
    async (_, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.get(`${BASE_URL}/api/myOrders`, config);
        return res.data.orders;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Get single order of logged-in user
  export const orderDetails = createAsyncThunk(
    "orderDetails",
    async (id, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.get(`${BASE_URL}/api/getSingleOrder/${id}`, config);
        return res.data.order;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );



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
        [productsReview.pending]: (state) => {
            state.loadingReveiw = true;
            state.errorRewiew = null;

        },

        [productsReview.fulfilled]: (state, action) => {
            state.loadingReveiw = false;
            state.msg = action.payload.msg;
            state.loadingReveiw = false;

        },
        [productsReview.rejected]: (state, action) => {
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
        shippingInfo: JSON.parse(localStorage.getItem("shipping-info")) || {}, // Initialize shipping info  from localStorage
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
            const data = state.cart.filter((item) => {
                return item._id !== id
            })
            if (data) {
                state.msgCart = "Cart item removed successfully";
            }
            state.cart = data;
            localStorage.setItem("cart", JSON.stringify(state.cart));
        },

        shippingInfoAdd: (state, action) => {
            const data = action.payload
            localStorage.setItem("shipping-info", JSON.stringify(data));
        },

        clearMsgCart: (state) => {
            state.msgCart = null;
        }
    }
});



export const createOrders = createSlice({
    name: 'createOrder',
    initialState: {
        loading: false,
        errorOrder: null,
        msgOrder: null,
        orders: {},
        order: {}
    },

    reducers: {
        clearMsgOrder(state) {
            state.msgOrder = null;
            state.errorOrder = null;
        }
    },
    extraReducers: {
        [createOrder.pending]: (state, action) => {
            state.loading = true,
                state.errorOrder = null
        },
        [createOrder.fulfilled]: (state, action) => {
            state.loading = false,
                state.msgOrder = action.payload
        },
        [createOrder.rejected]: (state, action) => {
            state.loading = false,
                state.errorOrder = action.payload
        },


        // all order of loged in user
        [allOrders.pending]: (state, action) => {
            state.loading = true,
                state.errorOrder = null
        },
        [allOrders.fulfilled]: (state, action) => {
            state.loading = false,
                state.orders = action.payload
        },

        [allOrders.rejected]: (state, action) => {
            state.loading = false,
                state.errorOrder = action.payload
            state.orders = {}
        },


        // single order of loged in user
        [orderDetails.pending]: (state, action) => {
            state.loading = true,
                state.errorOrder = null
        },
        [orderDetails.fulfilled]: (state, action) => {
            state.loading = false,
                state.order = action.payload
        },

        [orderDetails.rejected]: (state, action) => {
            state.loading = false,
                state.errorOrder = action.payload
            state.order = {}
        },
    }
})



// =================================================== User Login , Register =======================================================================



// Register User
export const registerUser = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.post(`${BASE_URL}/api/registerUser`, data, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Login User
  export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.post(`${BASE_URL}/api/loginUser`, { email, password }, config);
        console.log("res", res.data);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Logout User
  export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.get(`${BASE_URL}/api/logoutUser`, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Get Logged-In User Details
  export const loginUserDetails = createAsyncThunk(
    "auth/userDetails",
    async (_, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.get(`${BASE_URL}/api/getUserDetails`, config);
        return res.data.user;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  // Forgot Password
  export const forgotPasswordUser = createAsyncThunk(
    "forgotPasswordUser",
    async ({ email }, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${BASE_URL}/api/forgot/password`, { email }, { withCredentials: true });
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Reset Password
  export const resetPasswordUser = createAsyncThunk(
    "resetPasswordUser",
    async ({ password, confirmPassword, token }, { rejectWithValue }) => {
      try {
        const res = await axios.put(`${BASE_URL}/api/password/reset/${token}`, { password, confirmPassword }, { withCredentials: true });
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Update User Profile
  export const updateUserProfile = createAsyncThunk(
    "updateUserProfile",
    async (data, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.put(`${BASE_URL}/api/updateUserProfile`, data, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Update User Password
  export const updateUserPassword = createAsyncThunk(
    "updateUserPassword",
    async ({ oldPassword, newPassword, confirmPassword }, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.put(`${BASE_URL}/api/updateUserPassword`, { oldPassword, newPassword, confirmPassword }, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );



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
export const { removeCartFunc, addToCartFunc, shippingInfoAdd, clearMsgCart } = addToCart.actions
export const { clearMsgOrder } = createOrders.actions


// ============================================ END User =====================================================================================





//  ADMIN SLICES DONW BELOW

// Create Product
export const CreateProduct = createAsyncThunk(
    "CreateProduct",
    async (data, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.post(`${BASE_URL}/api/admin/createProduct`, data, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Update Product
  export const UpdateProduct = createAsyncThunk(
    "UpdateProduct",
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.put(`${BASE_URL}/api/admin/updateProduct/${id}`, data, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Delete Product
  export const DeleteProduct = createAsyncThunk(
    "DeleteProduct",
    async (id, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.delete(`${BASE_URL}/api/admin/deleteProduct/${id}`, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Get all orders of logged-in user
  export const adminOrders = createAsyncThunk(
    "adminOrders",
    async (_, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.get(`${BASE_URL}/api/admin/allOrders`, config);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Update Order Final Status
  export const OrderFinalStatus = createAsyncThunk(
    "OrderFinalStatus",
    async ({ id, status }, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
          },
          withCredentials: true // Include credentials
        };
  
        const requestData = { status: status };
        const res = await axios.put(`${BASE_URL}/api/admin/finalStatus/${id}`, requestData, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Delete Order
  export const DeleteOrder = createAsyncThunk(
    "DeleteOrder",
    async (id, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.delete(`${BASE_URL}/api/admin/deleteOrder/${id}`, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );





export const AuthorizedProductFunc = createSlice({
    name: "AuthorizedProductFunc",
    initialState: {
        loadingAdminProduct: false,
        errorAdminProduct: null,
        msgAdminProduct: null,
        orders: []
    },

    reducers: {
        clearErrorAdminProduct: (state) => {
            state.errorAdminProduct = null;
            state.msgAdminProduct = null;
        }
    },

    extraReducers: {

        [CreateProduct.pending]: (state) => {
            state.loadingAdminProduct = true
            state.errorAdminProduct = null
        },
        [CreateProduct.fulfilled]: (state, action) => {
            state.loadingAdminProduct = false
            state.msgAdminProduct = action.payload
        },
        [CreateProduct.rejected]: (state, action) => {
            state.loadingAdminProduct = false
            state.errorAdminProduct = action.payload
        },


        [UpdateProduct.pending]: (state) => {
            state.loadingAdminProduct = true
            state.errorAdminProduct = null
        },
        [UpdateProduct.fulfilled]: (state, action) => {
            state.loadingAdminProduct = false
            state.msgAdminProduct = action.payload
        },
        [UpdateProduct.rejected]: (state, action) => {
            state.loadingAdminProduct = false
            state.errorAdminProduct = action.payload
        },


        [DeleteProduct.pending]: (state) => {
            state.loadingAdminProduct = true
            state.errorAdminProduct = null
        },
        [DeleteProduct.fulfilled]: (state, action) => {
            state.loadingAdminProduct = false
            state.msgAdminProduct = action.payload
        },
        [DeleteProduct.rejected]: (state, action) => {
            state.loadingAdminProduct = false
            state.errorAdminProduct = action.payload
        },




        [adminOrders.pending]: (state) => {
            state.loadingAdminProduct = true
            state.errorAdminProduct = null
        },
        [adminOrders.fulfilled]: (state, action) => {
            state.loadingAdminProduct = false
            state.orders = action.payload
        },
        [adminOrders.rejected]: (state, action) => {
            state.loadingAdminProduct = false
            state.errorAdminProduct = action.payload
        },



        [OrderFinalStatus.pending]: (state) => {
            state.loadingAdminProduct = true
            state.errorAdminProduct = null
        },
        [OrderFinalStatus.fulfilled]: (state, action) => {
            state.loadingAdminProduct = false
            state.msgAdminProduct = action.payload
        },
        [OrderFinalStatus.rejected]: (state, action) => {
            state.loadingAdminProduct = false
            state.errorAdminProduct = action.payload
        },


        [DeleteOrder.pending]: (state) => {
            state.loadingAdminProduct = true
            state.errorAdminProduct = null
        },
        [DeleteOrder.fulfilled]: (state, action) => {
            state.loadingAdminProduct = false
            state.msgAdminProduct = action.payload
        },
        [DeleteOrder.rejected]: (state, action) => {
            state.loadingAdminProduct = false
            state.errorAdminProduct = action.payload
        },

    }


})




export const { clearErrorAdminProduct } = AuthorizedProductFunc.actions
// =============================================================== Aythorized product func is over 


// Get All Users
export const AllUsers = createAsyncThunk(
    "AllUsers",
    async (_, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.get(`${BASE_URL}/api/admin/getAllUsers`, config);
        return res.data.users;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Get User Details
  export const UserDetails = createAsyncThunk(
    "UserDetails",
    async (id, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.get(`${BASE_URL}/api/admin/getSingleUser/${id}`, config);
        return res.data.user;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Update User Role
  export const UpdateUserRole = createAsyncThunk(
    "UpdateUser",
    async ({ id, role }, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
        const requestData = { role };
  
        const res = await axios.put(`${BASE_URL}/api/admin/updateUserRole/${id}`, requestData, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );
  
  // Delete User
  export const DeleteUser = createAsyncThunk(
    "DeleteUser",
    async (id, { rejectWithValue }) => {
      try {
        const token = document.cookie.match(/token=([^;]+)/)[1]; // Extract token from cookies
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Use Bearer token format
            "Accept": "application/json"
          },
          withCredentials: true // Include credentials
        };
  
        const res = await axios.delete(`${BASE_URL}/api/admin/deleteUser/${id}`, config);
        return res.data.msg;
      } catch (error) {
        return rejectWithValue(error.response.data.err);
      }
    }
  );


export const AuthorizedUserFunc = createSlice({
    name: "AuthorizedUserFunc",
    initialState: {
        loadingAdminUser: false,
        errorAdminUser: null,
        msgAdminUser: null,
        users: [],
        user: {}
    },

    reducers: {
        clearErrorAdminUser: (state) => {
            state.errorAdminUser = null;
            state.msgAdminUser = null;
        }
    },

    extraReducers: {
        [AllUsers.pending]: (state) => {
            state.loadingAdminUser = true
            state.errorAdminUser = null
        },
        [AllUsers.fulfilled]: (state, action) => {
            state.loadingAdminUser = false
            state.users = action.payload
        },
        [AllUsers.rejected]: (state, action) => {
            state.loadingAdminUser = false
            state.errorAdminUser = action.payload
        },


        [UserDetails.pending]: (state) => {
            state.loadingAdminUser = true
            state.errorAdminUser = null
        },
        [UserDetails.fulfilled]: (state, action) => {
            state.loadingAdminUser = false
            state.user = action.payload
        },
        [UserDetails.rejected]: (state, action) => {
            state.loadingAdminUser = false
            state.errorAdminUser = action.payload
        },


        [UpdateUserRole.pending]: (state) => {
            state.loadingAdminUser = true
            state.errorAdminUser = null
        },
        [UpdateUserRole.fulfilled]: (state, action) => {
            state.loadingAdminUser = false
            state.msgAdminUser = action.payload
        },
        [UpdateUserRole.rejected]: (state, action) => {
            state.loadingAdminUser = false
            state.errorAdminUser = action.payload
        },


        [DeleteUser.pending]: (state) => {
            state.loadingAdminUser = true
            state.errorAdminUser = null
        },
        [DeleteUser.fulfilled]: (state, action) => {
            state.loadingAdminUser = false
            state.msgAdminUser = action.payload
        },
        [DeleteUser.rejected]: (state, action) => {
            state.loadingAdminUser = false
            state.errorAdminUser = action.payload
        },

    }

})




export const { clearErrorAdminUser } = AuthorizedUserFunc.actions









const rootReducer = combineReducers({
    products: productFunctionality.reducer,
    user: user.reducer,
    userAuth: auth.reducer,
    userData: userData.reducer,
    productReveiwer: productReveiwer.reducer,
    forgotPass: forgotPass.reducer,
    updateUserProf: updateUserProf.reducer,
    addToCart: addToCart.reducer,
    orderInfo: createOrders.reducer,
    AuthorizedProductFunc: AuthorizedProductFunc.reducer,
    AuthorizedUserFunc: AuthorizedUserFunc.reducer
});


export default rootReducer;
