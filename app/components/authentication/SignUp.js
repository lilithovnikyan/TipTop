import React from 'react';
import { selectWishlistData } from "../../app/store/slices/single";
import { pleaseLogin } from "../../app/store/slices/user";
import { useSelector, useDispatch } from "react-redux";

export default function SignUp() {

    const dispatch = useDispatch();

    const list = useSelector(selectWishlistData); 

    const handlePleaseLogin = () => {
        dispatch(pleaseLogin());
    }

  return (
    <div className="login-form">
        <div className="login-form-container">
            <div className="box">
                <div className="title">
                    <svg width="40" height="40" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
                        <rect width="240" height="240" rx="44" fill="url(#paint0_linear_2_2)"></rect>
                        <path d="M134.415 78.2608L175.976 144.738C183.055 156.061 174.915 170.75 161.561 170.75H78.4386C65.0852 170.75 56.945 156.061 64.024 144.738L105.585 78.2608C112.244 67.6102 127.756 67.6102 134.415 78.2608Z" stroke="white" strokeWidth="14"></path>
                        <defs>
                            <linearGradient id="paint0_linear_2_2" x1="0" y1="120" x2="240" y2="120" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#8E2DE2"></stop>
                                <stop offset="1" stopColor="#4A00E0"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <form className="form">
                    <div className="form-control ">
                        <input type="text" name="name" id="name" placeholder="Name" />
                        <span className="hint"></span>
                    </div>
                    <div className="form-control ">
                        <input type="email" name="email" id="email" placeholder="Email" />
                            <span className="hint"></span>
                    </div>
                    <div className="form-control ">
                        <input type="password" name="password" id="password" placeholder="Password" />
                        <span className="hint"></span>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <p className="info">Do you have an account?<a href="" className="sign_btns" onClick={() => handlePleaseLogin()}>Sign In</a></p>
             </div>
        </div>
    </div>
  )
}





