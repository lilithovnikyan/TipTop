import React from 'react';
import { selectWishlistData } from "../../app/store/slices/single";
import { useSelector } from "react-redux";

export default function EmptyWishlist(signInHandler) {

    const list = useSelector(selectWishlistData); 

    return (
        <div className={list.length > 0 ? "wish_no_empty":"wish_empty"}>
            <div className="wish_is_empty">
            <div className="round">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
            <p className="text">Your wishlist is empty</p>
            </div>
        </div>
    )
}
