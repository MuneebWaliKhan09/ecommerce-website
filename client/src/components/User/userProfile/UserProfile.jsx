import React, { useState } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from 'react-redux';
import Loader from "../../CustomLoader/Loader"
import Update from "../UpdateProfile/Update";
import PassUpdate from "../UpdatePass/PassUpdate";

const UserProfile = () => {
    const { user, loadingUser } = useSelector((state) => state.app.userData)
    const { loadingUpdate } = useSelector((state) => state.app.updateUserProf)

    const [showUpdate, setShowUpdate] = useState(false)
    const [showUpdatePass, setShowUpdatePass] = useState(false)

    const updateProfile = () => {
        setShowUpdate(true)
    }

    const UpdatePass = () => {
        setShowUpdatePass(true)
    }


    return (
        <>
            {showUpdate && <Update setShowUpdate={setShowUpdate} showUpdate={showUpdate} />}
            {showUpdatePass && <PassUpdate setShowUpdatePass={setShowUpdatePass} showUpdatePass={showUpdatePass} />}
            {
                loadingUser || loadingUpdate ? (<div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "1000" }}>
                    <Loader />
                </div>) : (


                    <div className="container my-5">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                <div className="card profile-card p-3">
                                    <img
                                        src={user && user.avatar && user.avatar[0].url}
                                        className="card-img-top rounded-circle profile-picture"
                                        alt="User"
                                        style={{ objectFit: "cover", height: "53vh" }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title font-weight-bold">User Profile</h5>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label font-weight-bold">
                                                Name:
                                            </label>
                                            <p className="mb-0">{user?.username}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="role" className="form-label font-weight-bold">
                                                Role:
                                            </label>
                                            <p className="mb-0">{user?.role}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label font-weight-bold">
                                                Email:
                                            </label>
                                            <p className="mb-0">{user?.email}</p>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">
                                                CreatedAt:
                                            </label>
                                            <p className="mb-0">{new Date(user?.CreatedAt).toDateString()}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-6 col-sm-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-title">User Actions</h5>
                                            <div className="d-flex align-items-center gap-2">
                                                <button onClick={updateProfile} className="btn btn-success">
                                                    Update Profile
                                                </button>
                                                <button onClick={UpdatePass} className="btn btn-primary fs-6 fs-sm-5">
                                                    Update Password
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>

    );
};

export default UserProfile;
