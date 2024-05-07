import React, { useState } from 'react'
import * as Toast from '../../components/Toast'
import {login} from '../../store/user/userSlice';
import { useDispatch } from'react-redux';
import { apiLogin } from '../../apis';
import {useNavigate} from 'react-router-dom'
function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    passWord: '',
  })

  const handleChange = (e) => {
    setCredentials((prev) =>({...prev, [e.target.id]: e.target.value}))
};
  const handleLogin = async () =>{  
    const rs = await apiLogin(credentials)
    if(rs){
      dispatch(login({isLoggedIn: true, token: rs.accessToken, current: rs.userData}))
      Toast.toastSuccess('Login Success')
      navigate('/')
    }
  }
  return (
    <div className='w-main flex justify-center mt-11'>
      <div action="" className='flex flex-col w-[500px]'>
        <h1 className='font-semibold text-[24px] text-center'>Login</h1>
        <br />
        <div className="group-input flex flex-col">
            <input type="text" id='email' placeholder='Email' className='border p-3 outline-black' onChange={handleChange} />
        </div>

        <div className="group-input flex flex-col mt-5">
            <input type="password" id='passWord' placeholder='Password' className='border p-3 outline-black' onChange={handleChange} />
        </div>
        <a href="/forgot-password" className='mt-6 text-blue-500'>forgot password?</a>
        <div className="btn-login w-full mt-6 text-center bg-main pb-5 pt-5 cursor-pointer text-white font-medium" onClick={handleLogin}>
            Login
        </div>
      </div>
    </div>
  )
}

export default Login