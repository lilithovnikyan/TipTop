import React from 'react';
import { selectWishlistData } from "../../app/store/slices/single";
import { pleaseLogin } from "../../app/store/slices/user";
import { useSelector, useDispatch } from "react-redux";

export default function PleaseSignIn() {

    const list = useSelector(selectWishlistData); 

    const dispatch = useDispatch();

    const handlePleaseLogin = () => {
        dispatch(pleaseLogin());
    }

    return (
        <div className={list.length > 0 ? "wish_no_empty":"wish_empty"}>
            <div className="wish_is_empty">
                <div className="round">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="26" height="27" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="10" r="3"></circle><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path></svg>
                </div>
                <div className="please_sign_in">Please Sign In</div>
                <p className="text">Sign In to view items in your cart</p>
                <a className="sign_in_btn" onClick={() => handlePleaseLogin()}>Sign In</a>
            </div>
        </div>
    )
}
