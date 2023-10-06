import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from "../../../Store/features/productSlice";
import { useSnackbar } from 'notistack';
import Loader from "../../../components/CustomLoader/Loader";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { msg, error, loading } = useSelector(
        (state) => state.app.user
    );

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatarView, setAvatarView] = useState(null);

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData()
        if (!avatar) {
            return enqueueSnackbar("please choose a profile pic !", { variant: "error" });
        }
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("avatar", avatar);

        dispatch(registerUser(formData));
    }

    useEffect(() => {
        
        if (msg) {
            enqueueSnackbar(msg, { variant: "success" }); // Call the alert function here
            navigate('/login')

        }


        if (error) {
            enqueueSnackbar(error, { variant: "error" });
        }

    }, [msg, error, enqueueSnackbar, navigate]);

    const handleImage = (e) => {
        const file = e.target.files[0]
        setAvatar(file)
        const seeImage = URL.createObjectURL(file)
        setAvatarView(seeImage)
    }


    return (
        <>
            {
                loading ? (
                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "999" }}>
                        <Loader />
                    </div>
                ) : (
                    <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: "130vh" }}>
                        <form encType="multipart/form-data" className='col-11 col-sm-12  col-md-5 border gap-1 border-dark text-dark p-5 rounded d-flex flex-column' onSubmit={handleRegister}>
                            <h3 className="text-center mb-2">Register</h3>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} className="form-control border-dark" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control border-dark" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="form-control border-dark" id="exampleInputPassword1" />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Choose Profile Pic</label>
                                <input type="file" onChange={handleImage} name='avatar' className="form-control" id="exampleInputFile1" />
                                {
                                    avatarView &&
                                    <div className="d-flex justify-content-left align-items-center mt-3">
                                        <img className="rounded-circle" width={50} height={50} src={avatarView} />
                                    </div>
                                }
                            </div>
                            <button type="submit" disabled={username === '' || email === '' || password === '' || avatar === '' ? true : false} className="btn btn-primary">Submit</button>
                            <div className="d-flex justify-content-center mt-2 align-items-center flex-column">
                                <Link className="form-text text-primary" to='/login'>Already have an account Login ?</Link>
                            </div>
                        </form>
                    </div>

                )
            }
        </>
    )
}

export default Register