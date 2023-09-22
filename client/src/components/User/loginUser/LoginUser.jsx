import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from "../../../Store/actions/userActions";


const LoginUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { msg, loading, isAuthenticated } = useSelector(
        (state) => state.user
    );

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleRegister = (e) => {
        e.preventDefault();

        dispatch(login(email, password));
    }

    useEffect(() => {
        if (msg) {
            alert(JSON.stringify(msg)); // Call the alert function here
            dispatch(clearErrors());
        }

    }, [dispatch, msg, alert, navigate, isAuthenticated]);



    return (
        <>
            <form className='col-5 m-4' onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
                </div>
                {/* 
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Choose Profile Pic</label>
                    <input type="file" name='avatar' className="form-control" id="exampleInputPassword1"/>
                </div> */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default LoginUser