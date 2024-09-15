import { useEffect, useState } from 'react'
import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { clearErrorForgotPass, forgotPasswordUser } from '../../../Store/features/productSlice'
import { useSnackbar } from 'notistack';
import Loader from "../../CustomLoader/Loader"

const ForgotPass = () => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const { loadingForgotPass, errorforgotPass, msgForgotPass } = useSelector((state) => state.app.forgotPass)
  const [email, setEmail] = useState('')


  const handleForgot = (e) => {
    e.preventDefault()
    dispatch(forgotPasswordUser({ email: email }))
    setEmail('')
  }

  useEffect(() => {

    if (msgForgotPass) {
      enqueueSnackbar(msgForgotPass, { variant: "success" })
    }
    if (errorforgotPass) {
      enqueueSnackbar(errorforgotPass, { variant: "error" })
    }
    return () => {
      dispatch(clearErrorForgotPass())
    }

  }, [msgForgotPass, errorforgotPass, dispatch, enqueueSnackbar])

  if (loadingForgotPass) {
    return <div className='d-flex flex-column align-items-center justify-content-center' style={{ width: "100%", height: "100vh", zIndex: "1000" }}>
      <Loader />
    </div>
  }

  return (
    <div>
      <form onSubmit={handleForgot} className=' d-flex flex-column gap-3 align-items-center justify-content-center w-full h-full mt-10 mb-10 bg-white rounded-md shadow-md p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12'>
        <h1 className='font-bold text-center'>Forgot Password</h1>
        <div className='d-flex gap-2 w-full'>
          <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className='align-self-start' type='submit'>Send</button>
        </div>
      </form>
    </div>
  )
}

export default ForgotPass