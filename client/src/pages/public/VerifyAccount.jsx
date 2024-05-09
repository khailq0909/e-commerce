import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import path from '../../ultils/path';

function VerifyAccount() {
    const {status} = useParams()
    const navigate = useNavigate();
    useEffect(()=>{
        if(status === 'failed') Swal.fire('Oops!', "Verify account failed", 'error').then(()=>{
            navigate(`/${path.LOGIN}`)
        })
        if(status === 'success') Swal.fire('Well Done', "Verify account success", 'success').then(()=>{
            navigate(`/${path.LOGIN}`)
        })
    },[])
  return (
    <div className='w-screen h-screen bg-gray-300'></div>
  )
}

export default VerifyAccount    