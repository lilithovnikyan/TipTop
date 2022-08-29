import React, { useState } from 'react';
import { selectWishlistData } from "../../app/store/slices/single";
import { login, register, continueAsGuest } from "../../app/store/slices/user";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

export default function SignIn() {

    const dispatch = useDispatch();
    const router = useRouter()

    const [email, setEmail] = useState();
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);

    const [password, setPassword] = useState();
    const [passwordEmpty, setPasswordEmpty] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    
    const list = useSelector(selectWishlistData); 

    const handleRegister = () => {
        dispatch(register());
    }

    const handleContinueAsGuest = () => {
        dispatch(continueAsGuest());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch (login({ email, password }));
        // router.push("/collections");
        if(email === undefined) {
            setEmailEmpty(true);
            setEmailInvalid(true);
        } 
        if(password === undefined) {
            setPasswordEmpty(true);
            setPasswordInvalid(true);
        }
        if(email !== undefined && password !==undefined && !emailEmpty && !emailInvalid && !passwordEmpty && !passwordInvalid) {
            console.log(12)

        }
    }   

    const handleChange = (e) => {
        const { value, name } = e.target;
        if (name === "email") {
            if(value.length > 0) {
                setEmailEmpty(false);
            } else {
                setEmailEmpty(true);
            }
            setEmail(value);
            let pattern = new RegExp(
              /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            );

            if (pattern.test(value)) {
              setEmailInvalid(false);
            } else {
              setEmailInvalid(true);
            }
        }
        if (name === "password") {
            if(value.length > 0) {
                setPasswordEmpty(false);
            } else {
                setPasswordEmpty(true);
            }
            setPassword(value);
            if (value.length < 8 || value.length > 16) {
                setPasswordInvalid(true);
            } else {
                setPasswordInvalid(false);
            }
        }
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
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-control">
                        <input className={emailInvalid ? "invalid_input" : ""} type="email" name="email" id="email" placeholder="Email" onChange={e => handleChange(e)} />
                        {emailEmpty ? <div className="error_message">Email cannot be empty</div> : ""}
                        {!emailEmpty && emailInvalid ? <div className="error_message">Email is not valid</div> : ""}
                    </div>
                    <div className="form-control ">
                        <input type="password" className={passwordInvalid ? "invalid_input" : ""} name="password" id="password" placeholder="Password" onChange={e => handleChange(e)}/>
                        {passwordEmpty ? <div className="error_message">Password cannot be empty</div> : ""}
                        {!passwordEmpty && passwordInvalid ? <div className="error_message">Min 6 characters required</div> : ""}
                    </div>
                    <button type="submit">Sign In</button>
                </form>
                <div className="ext">
                    <button type="button" onClick={() => handleContinueAsGuest()}>Continue as Guest</button>
                </div>
                <p className="info">Don't have an account? <a className="sign_btns" href="" onClick={() => handleRegister()}>Sign Up</a></p>
             </div>
        </div>
    </div>
  )
}





