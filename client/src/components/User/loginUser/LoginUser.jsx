import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import Loader from "../../CustomLoader/Loader"
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "../../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser, loginUserDetails } from '../../../Store/features/productSlice';

const LoginUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar();

    const { user, loadingUser, errorUser2 } = useSelector((state) => state.app.userData)
    const { msg1, error1, loading } = useSelector((state) => state.app.userAuth)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email: email, password: password }))
    }


    useEffect(() => {
        if (msg1) {
            enqueueSnackbar(msg1, { variant: "success" })
            dispatch(clearError())
            navigate("/")
        }
        dispatch(loginUserDetails())
        if (error1) {
            enqueueSnackbar(error1, { variant: "error" })
            dispatch(clearError())
        }

    }, [msg1, error1, navigate, enqueueSnackbar, dispatch])



    useEffect(() => {
        if (!user) {
                navigate("/login")
        }
        else {
            navigate("/")
        }
    }, [user,navigate, dispatch])


    if (loading && loadingUser) {
        return <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "1000" }}>
            <Loader />
        </div>
    }

    return (
        <>

            <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "85vh" }}>
                <form className='col-11 col-sm-12  col-md-4 border gap-3 border-dark text-dark p-5 rounded d-flex flex-column' onSubmit={handleLogin}>
                    <h3 className="text-center mb-2">Login</h3>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control border-dark" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control border-dark" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" disabled={email === '' || password === '' ? true : false} className="btn btn-primary">Submit</button>
                    <div className="d-flex justify-content-center gap-1 align-items-center flex-column">
                        <Link to='/forgot/password' className="form-text text-primary">forgot password ?</Link>
                        <Link className="form-text text-primary" to='/register'>don't have an account Register ?</Link>
                    </div>
                </form>
            </div >

        </>
    )
}

export default LoginUser