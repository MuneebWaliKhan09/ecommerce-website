// import {
//     LOGIN_REQUEST,
//     LOGIN_FAIL,
//     LOGIN_SUCCESS,
//     CLEAR_ERRORS,

//     REGISTER_USER_REQUEST,
//     REGISTER_USER_SUCCESS,
//     REGISTER_USER_FAIL,

//     LOAD_USER_REQUEST,
//     LOAD_USER_SUCCESS,
//     LOAD_USER_FAIL,

//     LOGOUT_SUCCESS,
//     LOGOUT_FAIL,

//     UPDATE_PROFILE_REQUEST,
//     UPDATE_PROFILE_SUCCESS,
//     UPDATE_PROFILE_RESET,
//     UPDATE_PROFILE_FAIL,

//     UPDATE_PASSWORD_REQUEST,
//     UPDATE_PASSWORD_SUCCESS,
//     UPDATE_PASSWORD_FAIL,
//     UPDATE_PASSWORD_RESET,

//     FORGOT_PASSWORD_REQUEST,
//     FORGOT_PASSWORD_SUCCESS,
//     FORGOT_PASSWORD_FAIL,

//     RESET_PASSWORD_REQUEST,
//     RESET_PASSWORD_SUCCESS,
//     RESET_PASSWORD_FAIL

// } from "../constants/UserConstant"
// import axios from 'axios'



// /// do not write the first letter capital of action name
// export const registerUsers = (formData) => async (dispatch) => {
//     try {
//         dispatch({ type: REGISTER_USER_REQUEST })
//         const config = { headers: { "Content-Type": "multipart/form-data" } };

//         const { data } = await axios.post("/api/registerUser", formData, config)

//         dispatch({ type: REGISTER_USER_SUCCESS, payload: data.msg })

//     } catch (error) {

//         dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.err })

//     }
// }




// // login user
// export const login = (email, password) => async (dispatch) => {
//     try {
//         dispatch({ type: LOGIN_REQUEST })

//         const config = {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }

//         const { data } = await axios.post(`/api/loginUser`, { email, password }, config)
//         dispatch({ type: LOGIN_SUCCESS, payload: data.user })

//     } catch (error) {
//         dispatch({ type: LOGIN_FAIL, payload: error.response.data.err })
//     }
// }




// // Load user || loged in user details 
// export const loadUser = () => async (dispatch) => {
//     try {
//         dispatch({ type: LOAD_USER_REQUEST })

//         const { data } = await axios.get(`/api/getUserDetails`)
//         dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })

//     } catch (error) {
//         dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.err })
//     }
// }



// // logOutUser
// export const logOutUser = () => async (dispatch) => {
//     try {

//         const { data } = await axios.get(`/api/logoutUser`)
//         dispatch({ type: LOGOUT_SUCCESS, payload: data.msg })

//     } catch (error) {
//         dispatch({ type: LOGOUT_FAIL, payload: error.response.data.err })
//     }
// }















// export const clearErrors = () => async (dispatch) => {
//     dispatch({ type: CLEAR_ERRORS });  // this is for clearing errors in store when error 
//     // occured this reducer will automatically clear the errors after message
//     // must use after you shows any message or error response will clear state  errors = null
// }