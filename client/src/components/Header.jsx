import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo.svg';
import {
    faUserCircle,
    faClipboard,
} from "@fortawesome/free-regular-svg-icons";
import {
    faBasketShopping,
    faSearch,
    faSortDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { apiLogout } from '../apis';
import { logout } from '../store/user/userSlice';
function Header() {
    const { isLoggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch();

    const [cartDisplay, setCartDisplay] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const cartRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setCartDisplay(false);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [cartRef]);
const handleLogout = () =>{
    const rs = apiLogout();
    if(rs){
        dispatch(logout())
        setIsOpen(false);
    }

}
    return (
        <div className='w-full bg-[#F8F1E3] h-[63px] flex justify-center items-center'>
            <div className="w-main flex justify-between items-center">
                <div className="logo">
                    <Link to={'/'}><img src={logo} alt="tokyolife" /></Link>
                </div>
                <div className="search flex items-center">
                    <input type="text" placeholder="Search..." className='w-[600px] p-2 rounded-s-md outline-none' />
                    <div className="btn"><FontAwesomeIcon icon={faSearch} className='text-[18px] text-white rounded-e-md p-3 bg-main cursor-pointer' /></div>
                </div>
                <div className="action flex items-center">
                    <div className="shoping-cart relative" ref={cartRef} onMouseEnter={() => setCartDisplay(true)}>
                        <FontAwesomeIcon icon={faBasketShopping} className='text-[24px] cursor-pointer me-3' />
                        <span className='absolute right-0 top-[-4px] ps-2 pt-[2px] pb-[2px] pe-2 text-[12px] text-white rounded bg-main'>0</span>
                        {cartDisplay &&
                            <div className="cart-modal shadow-md w-[500px] bg-white absolute right-3 mt-[20px]">
                                <div className="p-3  border-t-0 border-e-0 border-s-0 border-dashed border-2">
                                    <div className="cart-item">
                                        <div className="flex flex-row">
                                            <div className="basis-3/12">
                                                <img src="https://tokyolife.vn/_next/image?url=https%3A%2F%2Fpm2ec.s3.ap-southeast-1.amazonaws.com%2Fcms%2F17066107510822269_512.jpg&w=256&q=75" alt="" className='h-[166px] w-auto' />
                                            </div>
                                            <div className="basis-9/12 flex justify-between flex-col">
                                                <div className="product-title">
                                                    <div className="prodcut-name mb-3">
                                                        Guuci Clothes
                                                    </div>
                                                    <div className="product-price text-main font-semibold">
                                                        999999
                                                    </div>
                                                </div>
                                                <div className="product-detail">
                                                    <div className="product-infor">
                                                        Size: <span className='font-medium'>M</span>
                                                    </div>
                                                    <div className="product-infor mt-2">
                                                        Color: <span className='font-medium'>Gray</span>
                                                    </div>
                                                    <div className="flex justify-between mt-3">
                                                        <div className="product-count flex">
                                                            <div className='border-[1px] border-solid p-1 cursor-pointer rounded-s'>+</div> <span className='border-[1px] border-solid border-s-0 border-e-0 p-1'>2</span> <div className='border-[1px] border-solid p-1 cursor-pointer rounded-e'>-</div>
                                                        </div>
                                                        <div className="price">
                                                            Total: <span className='font-medium'>999999</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-footer p-3">
                                    <div className="total-price flex justify-between items-center mb-4">
                                        <p>Total cost: </p>
                                        <span className='text-main font-semibold'>999,999</span>
                                    </div>
                                    <div className="btn w-full text-center p-4 bg-main cursor-pointer">
                                        <span className='text-white'>Continue Payment</span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="search-order">
                        <FontAwesomeIcon icon={faClipboard} className='text-[24px] cursor-pointer ms-3 me-3' />
                    </div>
                    <div className="user-profile relative">
                        <div className="user flex items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                            <FontAwesomeIcon icon={faUserCircle} className='text-[24px] me-2 ms-3' />
                        </div>
                        {
                            isOpen &&
                            <div className="modal-user-action bg-white shadow-md absolute min-w-[150px] right-[-30%] top-[44px] rounded pt-3 pb-3">
                                {
                                    isLoggedIn ?
                                    <ul>
                                        <li className='cursor-pointer p-2 hover:bg-[#c3c3c3] hover:text-white transition-all'><a href="/profile">Profile</a></li>
                                        <li className='cursor-pointer p-2 hover:bg-[#c3c3c3] hover:text-white transition-all' onClick={handleLogout}>Exit</li>
                                    </ul>  
                                    :
                                    <ul>
                                        <li className='cursor-pointer p-2 hover:bg-[#c3c3c3] hover:text-white transition-all'><a href="/login">Login</a></li>
                                        <li className='cursor-pointer p-2 hover:bg-[#c3c3c3] hover:text-white transition-all'><a href="/register">Register</a></li>
                                    </ul>
                                }
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;
