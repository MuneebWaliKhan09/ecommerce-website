// import React, { useEffect, useState } from 'react'
// import {  Form, Field,  Formik } from 'formik'
// import "./loginAdmin.css"
// import axios from "axios"
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';


// const Login = () => {
//   const navigate = useNavigate();
//   const [isLoading, setLoading] = useState(true);


//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false)
//     }, 1000);

//     return () => clearTimeout(timer)

//   }, [])


//   const notify = {
//     position: "top-right",
//     autoClose: 1000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//   }


//   return (
//     <div className='container w-100 h-100 d-flex justify-content-center align-items-center mt-lg-5 flex-column col-12 '>
//       {isLoading && (
//         <div>
//           <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh", width: "100%" }}>
//             <CircularProgress />
//           </Box>
//         </div>
//       )}
//       <Formik
//         initialValues={{
//           Email: "",
//           Password: ""

//         }}


//         onSubmit={
//           (values, { setFieldValue }) => {
//             const { Email, Password } = values;

//             axios({
//               method: "post",
//               url: "/adminLogin",
//               data: {
//                 Email,
//                 Password
//               }
//             })
//               .then((res) => {
//                 console.log(res.data)
//                 if (res.status === 201) {
//                   localStorage.setItem("admin", res.data.result.genToken)
//                   localStorage.setItem("adminName", res.data.result.CheckUser.UserName)
//                   toast.success(res.data.message, notify)

//                   navigate("/admin-panel")
//                 }


//               })
//               .catch((error) => {
//                 toast.error(error.response.data.message, notify)
//                 setFieldValue('Email', "");
//                 setFieldValue("Password", "");
//               })


//           }
//         }


//       >

//         {
//           <Form className="col-12 col-md-6 col-lg-4 border border-2 border-danger rounded-4 p-5 mt-5">
//             <h2 className="text-danger mb-4 brandLogin text-center">Login Admin <span className="bi bi-person-fill-lock"></span></h2>


//             <div className="form-floating mb-3">
//               <Field type="email" className="form-control" name="Email" id="floatingInput" placeholder="name@example.com" />
//               <label htmlFor="floatingInput">Email address</label>
//             </div>
//             <div className="form-floating mb-3">
//               <Field type="password" className="form-control" name="Password" id="floatingPassword" placeholder="Password" />
//               <label htmlFor="floatingPassword">Password</label>
//             </div>

//             <div className="d-grid">
//               <button type="submit" className="btn btn-danger">Login</button>
//             </div>
//           </Form>

//         }

//       </Formik>

//     </div>
//   )
// }

// export default Login



