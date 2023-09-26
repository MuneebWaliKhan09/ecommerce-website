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




// export const userReducer = (state = { user: {} }, action) => {

//     switch (action.type) {
//         case REGISTER_USER_REQUEST:
//         case LOGIN_REQUEST:
//         case LOAD_USER_REQUEST:
//             return {
//                 loading: true,
//                 isAuthenticated: false
//             };

//         case REGISTER_USER_SUCCESS:
//         case LOGIN_SUCCESS:
//         case LOAD_USER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: true,
//                 msg: action.payload,
//                 user: action.payload,

//             };


//         case LOGOUT_SUCCESS:
//             return {
//                 loading: false,
//                 isAuthenticated: false,
//                 user: null
//             }



//         case REGISTER_USER_FAIL:
//         case LOGIN_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: false,
//                 user: null,
//                 err: action.payload
//             };



//         case LOAD_USER_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 user: null,
//                 err: action.payload

//             }

//         case LOGOUT_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 err: action.payload
//             }


//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 err: null
//             }



//         default:
//             return state;
//     }
// }