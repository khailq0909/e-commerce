import React, { useState } from 'react'
import * as Toast from '../../common/Toast'
import { login } from '../../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { apiLogin } from '../../apis';
import { useNavigate, Link } from 'react-router-dom'
import path from '../../ultils/path';
import ForgotPassword from '../../components/ForgotPassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye,
    faEyeSlash
} from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const [error, setError] = useState({
    err:''
  });
  const [openFg, setOpenFg] = useState(false)
  const [credentials, setCredentials] = useState({
    email: '',
    passWord: '',
  })

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    setError({err: ""})
  };
  const handleLogin = async () => {
    try {
      const rs = await apiLogin(credentials)
      dispatch(login({ isLoggedIn: true, token: rs?.accessToken, current: rs?.userData }))
      Toast.toastSuccess('Login Success')
      navigate('/')
    }catch (err) {
      console.log(err)
      setError({err: err?.response?.data.mes})  
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

          <div className="group-input flex flex-col mt-5 relative">
            <input type={`${visible? 'password': 'text'}`} id='passWord' placeholder='Password' className='border p-3 outline-black' onChange={handleChange} />
            <FontAwesomeIcon icon={visible? faEyeSlash : faEye} className='absolute right-0  cursor-pointer p-4' onClick={() => setVisible(!visible)} />

          </div>
          {error && <span className='text-main mt-3'>{error.err}</span>}
          <span className='mt-3 mb-3 text-main cursor-pointer' onClick={() => setOpenFg(true)} >forgot password?</span>
          <Link to={`/${path.REGISTER}`}><span>don't have account? <span className='text-main cursor-pointer'>register here</span></span></Link>
          <div className="btn-login w-full mt-3 text-center bg-main pb-5 pt-5 cursor-pointer text-white font-medium" onClick={handleLogin}>
            Login
          </div>
        </div>
      </div>
      {
        openFg &&
        <ForgotPassword setOpenFg={(data) => setOpenFg(data)} />
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