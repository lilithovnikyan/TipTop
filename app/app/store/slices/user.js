import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    email: null,
    password: null,
    userLogin: false,
    pleaseLogin: true,
    continueAsGuest: false,
    userRegister: false,
    successLogin: false,
}

export const User = createSlice({ 
    name: 'userData',
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            console.log(action.payload);
        },
        // logout: (state) => { 
        //     // state.user = null;
        // },
        pleaseLogin: (state) => {
            state.pleaseLogin = false;
            state.userLogin = true;
        },
        continueAsGuest: (state) => {
            state.userLogin = false;
            state.continueAsGuest = true;
        },
        register: (state) => {
            state.userLogin = false;
            state.userRegister = true;
        }
    }
})  

export const { 
    login,
    logout,
    pleaseLogin,
    continueAsGuest,
    register
} = User.actions;

export const selectUserLogin = (state) => state.userData.userLogin;
export const selectUserRegister = (state) => state.userData.userRegister;
export const selectPleaseLogin = (state) => state.userData.pleaseLogin;
export const selectContinueAsGuest = (state) => state.userData.continueAsGuest;
export const selectSuccessLogin = (state) => state.userData.successLogin;


export default User.reducer;
