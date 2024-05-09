import React, { useState, useRef, useEffect } from 'react'
import * as Toast from '../../common/Toast'
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { apiLogin } from '../../apis';
import { useNavigate } from 'react-router-dom'
import ForgotPassword from '../../components/ForgotPassword';

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [openFg, setOpenFg] = useState(false)
  const [credentials, setCredentials] = useState({
    email: '',
    passWord: '',
  })

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  };
  const handleLogin = async () => {
    const rs = await apiLogin(credentials)
    if (rs) {
      dispatch(login({ isLoggedIn: true, token: rs.accessToken, current: rs.userData }))
      Toast.toastSuccess('Login Success')
      navigate('/')
    }
  }

  return (
    <>
      <div className='w-main flex justify-center mt-11'>
        <div className='flex flex-col w-[500px]'>
          <h1 className='font-semibold text-[24px] text-center'>Login</h1>
          <br />
          <div className="group-input flex flex-col">
            <input type="text" id='email' placeholder='Email' className='border p-3 outline-black' onChange={handleChange} />
          </div>

          <div className="group-input flex flex-col mt-5">
            <input type="password" id='passWord' placeholder='Password' className='border p-3 outline-black' onChange={handleChange} />
          </div>
          <span className='mt-6 text-blue-500 cursor-pointer' onClick={() => setOpenFg(true)} >forgot password?</span>
          <div className="btn-login w-full mt-6 text-center bg-main pb-5 pt-5 cursor-pointer text-white font-medium" onClick={handleLogin}>
            Login
          </div>
        </div>
      </div>
      {
        openFg &&
        <ForgotPassword setOpenFg={(data)=>setOpenFg(data)} />
      }

      {
        openFg &&
        <div className="w-screen h-screen bg-black absolute top-0 right-0 opacity-80 z-10">
        </div>
      }
    </>
  )
}

export default Login