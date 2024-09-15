import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../CustomLoader/Loader";


const AdminRoutes = () => {
    const navigate = useNavigate()
    const { user , errorUser2} = useSelector((state) => state.app.userData);

    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        if (user) {
            setUserLoaded(true);
        }
        if (user && user.role !== "admin") {
            navigate('/')
        }
    }, [user, errorUser2]);

    useEffect(()=>{
        if (errorUser2) {
            navigate('/')
        }
    },[errorUser2])


    if (!userLoaded) {
        return <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "1000" }}>
            <Loader />
        </div>
    }



    return <Outlet />;
}

export default AdminRoutes
