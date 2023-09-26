// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { clearErrors, login } from "../../../Store/actions/userActions";
// import { useSnackbar } from 'notistack';

// const LoginUser = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { enqueueSnackbar } = useSnackbar();

//     const { msg, err, loading, isAuthenticated } = useSelector(
//         (state) => state.user
//     );

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');


//     const handleRegister = (e) => {
//         e.preventDefault();

//         dispatch(login(email, password));
//     }

//     useEffect(() => {
//         if (msg) {
//             enqueueSnackbar(msg, { variant: "success" }); // Call the alert function here
//             navigate('/')
//         }
//         if (err) {
//             enqueueSnackbar(err, { variant: "error" });
//             dispatch(clearErrors());
//         }

//     }, [dispatch, msg, err, enqueueSnackbar, alert, navigate, isAuthenticated]);



//     return (
//         <>
//             <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "85vh" }}>
//                 <form className='col-11 col-sm-12  col-md-4 border gap-3 border-dark text-dark p-5 rounded d-flex flex-column' onSubmit={handleRegister}>
//                     <h3 className="text-center mb-2">Login</h3>
//                     <div className="mb-3">
//                         <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
//                         <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control border-dark" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//                         <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control border-dark" id="exampleInputPassword1" />
//                     </div>
//                     <button type="submit" disabled={email === '' || password === '' ? true : false} className="btn btn-primary">Submit</button>
//                     <div className="d-flex justify-content-center gap-1 align-items-center flex-column">
//                         <Link to='/forgot/password' className="form-text text-primary">forgot password ?</Link>
//                         <Link className="form-text text-primary" to='/register'>don't have an account Register ?</Link>
//                     </div>
//                 </form>
//             </div>

//         </>
//     )
// }

// export default LoginUser