import React, { useState } from 'react';
import { apiRegister } from '../../apis/user';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

function Register() {
    const navigate = useNavigate();
    const [error,setError] = useState({});
    const [credentials, setCredentials] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        passWord: '',
    })
    const handleChange= (e)=>{
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
        setError({...error, [e.target.id]: "" });
    }
    const handleRegister = () =>{
        const validationError = {};
        const regexSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!credentials.firstName.trim()){
            validationError.firstName = "First Name is required"
        }else if(regexSpecial.test(credentials.firstName)){
            validationError.firstName = "First Name cannot contain special characters"
        }
        if(!credentials.lastName.trim()){
            validationError.lastName = "Last Name is required"
        }else if(regexSpecial.test(credentials.lastName)){
            validationError.lastName = "Last Name cannot contain special characters"
        }
        if(!credentials.phone.trim()){
            validationError.phone = "Phone is required"
        }else if(credentials.phone.length > 10){
            validationError.phone = "Phone is invalid"
        }
        if(!credentials.email.trim()){
            validationError.email = "Email is required"
        }else if(!regexEmail.test(credentials.email)){
            validationError.email = "Email is invalid"
        }
        if(!credentials.passWord.trim()){
            validationError.passWord = "PassWord is required"
        }else if(credentials.passWord.length > 20 || credentials.passWord.length <6){
            validationError.passWord = "Pass Word length must more than 6 and less than 20 characters"
        }
        setError(validationError)
        if(Object.keys(validationError).length === 0){
            const rs = apiRegister(credentials)
            if(rs){
                Swal.fire('Register Successful', "We have sent a registration email to your email address", 'success').then(()=>{navigate('/login')})
            }
        }
    }
  return (
    <div className='w-main flex justify-center mt-11'>
      <div action="" className='flex flex-col w-[500px]'>
        <h1 className='font-semibold text-[24px] text-center'>Register</h1>
        <br />
        <div className="group-input flex flex-col mt-5">
            <input type="text" id='firstName' placeholder='First Name' className='border p-3 outline-black' onChange={handleChange} />
            {error && <span className='text-main'>{error.firstName}</span>}
        </div>

        <div className="group-input flex flex-col mt-5">
            <input type="text" id='lastName' placeholder='Last Name' className='border p-3 outline-black' onChange={handleChange} />
            {error && <span className='text-main'>{error.lastName}</span>}
        </div>

        <div className="group-input flex flex-col mt-5">
            <input type="number" id='phone' placeholder='Number Phone' className='border p-3 outline-black' onChange={handleChange} />
            {error && <span className='text-main'>{error.phone}</span>}
        </div>
        <div className="group-input flex flex-col mt-5">
            <input type="text" id='email' placeholder='Email' className='border p-3 outline-black' onChange={handleChange} />
            {error && <span className='text-main'>{error.email}</span>}
        </div>
        <div className="group-input flex flex-col mt-5">
            <input type="password" id='passWord' placeholder='Password' className='border p-3 outline-black' onChange={handleChange} />
            {error && <span className='text-main'>{error.passWord}</span>}
        </div>
        {/* <div className="group-input flex flex-col mt-5">
            <input type="password" id='confirmPassWord' placeholder='Password Confirm' className='border p-3 outline-black' onChange={handleChange} />
        </div> */}
        <a href="/login" className='mt-6 text-blue-500'>already have an account?</a>
        <div className="btn-login w-full mt-6 text-center bg-main pb-5 pt-5 cursor-pointer text-white font-medium" onClick={handleRegister}>
            Register
        </div>
      </div>
    </div>
  )
}

export default Register