// import React, { useEffect, useState } from 'react'
// import * as yup from "yup"
// import { Form, Field, Formik, ErrorMessage } from 'formik'
// import "../LoginAdmin/loginAdmin.css"
// import axios from "axios"
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import CircularProgress from '@mui/material/CircularProgress';
// import Box from '@mui/material/Box';


// const RegisterAdmin = () => {
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
//           UserName: "",
//           Email: "",
//           Password: ""

//         }}

//         validationSchema={
//           yup.object({

//             UserName: yup.string().required("userName required").min(10),
//             Email: yup.string().required("email required").email("email required"),
//             Password: yup.string().required("required password").min(10),

//           })
//         }

//         onSubmit={
//           (values, { setFieldValue }) => {
//             const { UserName, Email, Password } = values;

//             axios({
//               method: "post",
//               url: "/adminRegister",
//               data: {
//                 UserName,
//                 Email,
//                 Password
//               }
//             })
//               .then((res) => {
//                 console.log(res)
//                 if (res.status === 201) {
//                   toast.success(res.data.message, notify)
//                   navigate("/admin-panel")
//                 }


//               })
//               .catch((error) => {
//                 toast.error(error.response.data.message, notify)
//                 setFieldValue('UserName', "");
//                 setFieldValue('Email', "");
//                 setFieldValue("Password", "");
//               })


//           }
//         }


//       >

//         {
//           <Form className="col-12 col-md-6 col-lg-6 border border-2 border-danger rounded-4 p-5 mt-5">
//             <h2 className="text-danger mb-4 brandLogin text-center">Register Admin <span className="bi bi-person-fill-lock"></span></h2>


//             <div className="form-floating mb-3">
//               <Field type="text" className="form-control" name="UserName" id="floatingInput" placeholder="UserName" />
//               <label htmlFor="floatingInput">UserName</label>
//               <ErrorMessage name='UserName' className='text-danger form-text' component='div'></ErrorMessage>
//             </div>

//             <div className="form-floating mb-3">
//               <Field type="email" className="form-control" name="Email" id="floatingInput" placeholder="name@example.com" />
//               <label htmlFor="floatingInput">Email address</label>
//               <ErrorMessage name='Email' className='text-danger form-text' component='div'></ErrorMessage>
//             </div>

//             <div className="form-floating mb-3">
//               <Field type="password" className="form-control" name="Password" id="floatingPassword" placeholder="Password" />
//               <label htmlFor="floatingPassword">Password</label>
//               <ErrorMessage name='Password' className='text-danger form-text' component='div'></ErrorMessage>
//             </div>

//             <div className="d-grid">
//               <button type="submit" className="btn btn-danger">Register Admin</button>
//             </div>
//           </Form>

//         }

//       </Formik>

//     </div>
//   )
// }

// export default RegisterAdmin





