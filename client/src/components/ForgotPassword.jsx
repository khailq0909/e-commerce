
import React, { useState, useRef, useEffect } from 'react'

import {
    faPaperPlane,
    faXmark,
    faCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiChangePassword, apiCheckOTP, apiSendOTP } from '../apis';
import * as Toast from '../common/Toast'
import * as Loading from '../common/Loader'
function ForgotPassword({ setOpenFg }) {
    const [isLoading, setIsLoading] = useState(false)
    const [password, setPassword] = useState({
        passWord:''
    })
    const inputRefs = useRef([]);
    const [error, setError] = useState(false)
    const [email, setEmail] = useState({
        email: '',
    });
    const [otp, setOtp] = useState(new Array(4).fill(""))
    const [correctOtp, setCorrectOtp] = useState(false);
    const [correctEmail, setCorrectEmail] = useState(false);
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);
    const handleChangeOtp = async (e, index) => {
        setError(false)
        const value = e.target.value;
        if (isNaN(value)) return;
        const newOtp = [...otp];
        // allow only one input
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        // submit trigger
        const combinedOtp = newOtp.join("");
        if (combinedOtp.length === 4) {
            try{
                const rs = await apiCheckOTP({resetToken: combinedOtp})
                if(rs){
                    setCorrectOtp(true)
                }
            }catch(err){
                setError(true)
            }
        }

        // Move to next input if current field is filled
        if (value && index < 3 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    }
    const handleKeyDown = (e, index) => {
        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0 &&
            inputRefs.current[index - 1]
        ) {
            // Move focus to the previous input field on backspace
            inputRefs.current[index - 1].focus();
        }
    };
    const handleCloseModal = () => {
        setOpenFg(false);
    }
    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);
        // optional
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };
    const handleChangeEmail = (e) => {
        setEmail({ email: e.target.value })
        setCorrectEmail(false)
        setCorrectOtp(false)
    }
    const handleSendOTP = async () => {
        setIsLoading(true);
        try {
            await apiSendOTP(email)
            Toast.toastSuccess("We have sent an OPT to your email address")
            setIsLoading(false)
            setCorrectEmail(true)
        } catch (error) {
            Toast.toastWarning(error.response.data.mes)
            setIsLoading(false)
        }
    }
    const handleSubmit = async () =>{
        setIsLoading(true)
        const rs = await apiChangePassword({...password, ...email})
        if(rs){
            setOpenFg(false)
            Toast.toastSuccess("Password Changed")
            setIsLoading(false)
        }
    }
    return (
        <div>
            <div className="w-[600px] bg-white absolute z-20 bottom-[50%] right-[32.5%]">
                <div className="w-[500px] pt-14 pb-14 m-auto">
                    <div className="modal-forgot w-[100%]">
                        <div className="group-input flex">
                            <input type="text" id='email' placeholder='Email' className='border p-3 outline-black w-[80%]' onChange={handleChangeEmail} />
                            {
                                !correctEmail &&
                                <div className="btn-send w-[20%] bg-main text-white font-medium cursor-pointer ms-1 flex items-center justify-center rounded-sm text-[14px]" onClick={handleSendOTP}>
                                    {!isLoading &&
                                        <>
                                            Send
                                            <FontAwesomeIcon icon={faPaperPlane} className='text-[14px] ms-1 text-white' />
                                        </>
                                    }
                                    {
                                        isLoading &&
                                        Loading.LoadingUpload(100, 30, "#fff", "")
                                    }
                                </div>
                            }
                            {
                                correctEmail &&
                                <div className="btn-send w-[20%] bg-green-500 text-white font-medium cursor-pointer ms-1 flex items-center justify-center rounded-sm text-[14px]" onClick={handleSendOTP}>
                                    <FontAwesomeIcon icon={faCheck} className='text-[30px]' />
                                </div>
                            }
                        </div>
                        {
                            !correctOtp && correctEmail &&
                            <div className="w-[100%] otp-area mt-5 flex gap-5">
                                {otp.map((data, i) => {
                                    return (
                                        <>
                                            <input type='text'
                                                className={!error ?`w-[25%] h-[50px] outline-none text-center border border-gray-500 focus:border-black focus:border-2` : `w-[25%] h-[50px] border-red-600 border  outline-none text-center`}
                                                maxLength={1}
                                                value={data}
                                                ref={(input) => (inputRefs.current[i] = input)}
                                                key={i}
                                                onClick={() => handleClick(i)}
                                                onChange={(e) => handleChangeOtp(e, i)}
                                                onKeyDown={(e) => handleKeyDown(e, i)}
                                            />
                                        </>
                                    )
                                })}
                            </div>
                            
                        }
                        {
                            correctOtp &&
                            <>
                                <div className="group-input flex flex-col mt-5">
                                    <input type="password" id='passWord' placeholder='New Password' className='border p-3 outline-black' onChange={(e)=>setPassword({passWord: e.target.value})} />
                                </div>
                                {/* <div className="group-input flex flex-col mt-5">
                                    <input type="password" id='passWordConf' placeholder='Password Confirm' className='border p-3 outline-black' />
                                </div> */}
                                <div className="btn-submit flex justify-center items-center bg-main p-5 text-white text-medium mt-5 cursor-pointer" onClick={handleSubmit} >
                                    {
                                        isLoading &&
                                        Loading.LoadingUpload(100, 20, "#fff", "")
                                    }
                                    {
                                        !isLoading && <>Submit</>
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
                <span className='text-bold text-[25px] cursor-pointer absolute top-3 right-5' onClick={handleCloseModal}><FontAwesomeIcon icon={faXmark} /></span>
            </div>
        </div>
    )
}

export default ForgotPassword