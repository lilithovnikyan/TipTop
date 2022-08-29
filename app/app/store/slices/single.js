import { createSlice } from "@reduxjs/toolkit";
import { current } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";


const initialState = {
    wishList: [],
    wishCount: 0,
    cartList: [],
    cartCount: 0
}

export const Single = createSlice({
    name: 'singleData', 
    initialState,
    reducers: {
        addWishList: (state, action) => {

            const size = action.payload.size;
            const item = action.payload;

            item = { ...item, size: size };

            if (state.wishList.length === 0) {
                state.wishList.push(item);
            } else if (state.wishList.length > 0) {
                const elem = state.wishList.find((el) => el.id === item.id)
                if (!elem) {
                    state.wishList.push(item);
                }
            }
            state.wishCount = state.wishList.length;

            storage.setItem("list", JSON.stringify(state.wishList))
            storage.setItem("count", state.wishCount)
        },
        deleteItemWishlist: (state, action) => {
            state.wishList = state.wishList.filter(item => item.id !== action.payload);
            state.wishCount = state.wishList.length;
            storage.setItem("list", JSON.stringify(state.wishList))
            storage.setItem("count", state.wishCount)
        },
        addToCart: (state, action) => {
          
            const size = action.payload.size;
            const item = action.payload;

            const random = Math.floor(Math.random() * 10000);

            item = { ...item, size: size };

            if (state.cartList.length === 0) {
                item = { ...item, quantity: 1, cart_id: random };
                state.cartList.push(item);
                state.cartCount += 1;
            } else if (state.cartList.length > 0) {
                const elem = state.cartList.find((el) => el.id === item.id && el.size === size);
                const elemIndex = state.cartList.findIndex((el) => el.id === item.id && el.size === size);
                if (!elem) {
                    item = { ...item, quantity: 1, cart_id: random };
                    state.cartList.push(item);
                    state.cartCount += 1;
                } else {
                    state.cartList[elemIndex].quantity += 1;
                }
            }
        },
        deleteItemCartlist: (state, action) => {
            state.cartList = state.cartList.filter(item => item.cart_id !== action.payload);
            state.cartCount = state.cartList.length;
        }
    }
})

export const {
    addWishList,
    deleteItemWishlist,
    addToCart,
    deleteItemCartlist
} = Single.actions;
export const selectWishlistCount = (state) => state.singleData.wishCount;
export const selectWishlistData = (state) => state.singleData.wishList;
export const selectCartlistCount = (state) => state.singleData.cartCount;
export const selectCartlistData = (state) => state.singleData.cartList;

export default Single.reducer;
