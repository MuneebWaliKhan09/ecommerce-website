import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { clearErrorForgotPass, resetPasswordUser } from '../../../Store/features/productSlice'
import { useSnackbar } from 'notistack';
import Loader from "../../CustomLoader/Loader"
import { useParams } from 'react-router-dom';

const ResetPass = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { enqueueSnackbar } = useSnackbar();

  const { loadingForgotPass, errorforgotPass, msgForgotPass } = useSelector((state) => state.app.forgotPass)

  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const { token } = params

  const handleReset = (e) => {
    e.preventDefault()
    console.log(password, confirmPassword, token)
    dispatch(resetPasswordUser({ password: password, confirmPassword: confirmPassword, token: token }))
    // setPassword('')
    // setconfirmPassword('')
  }

  useEffect(() => {

    if (msgForgotPass) {
      enqueueSnackbar(msgForgotPass, { variant: "success" })
      navigate('/login')
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
      <form onSubmit={handleReset} className=' d-flex flex-column gap-3 align-items-center justify-content-center w-full h-full mt-10 mb-10 bg-white rounded-md shadow-md p-4 sm:p-6 lg:p-8 xl:p-10 2xl:p-12'>
        <h1 className='font-bold text-center'>Reset Password</h1>
        <div className='d-flex gap-2 w-full'>
          <input type="password" placeholder='Enter New Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder='Confirm new Password' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
          <button className='align-self-start' type='submit'>Send</button>
        </div>
      </form>

    </div>
  )
}

export default ResetPass