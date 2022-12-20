import {createSlice} from "@reduxjs/toolkit";
import {IAuth} from "../../models/slices/auth";
import {getCookie} from "cookies-next";

const initialState: IAuth = {
    isAuth: !!getCookie('access_token')
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        loggedIn: state => {
            state.isAuth = true;
        },
        loggedOut: state => {
            state.isAuth = false;
        }
    }
});
export default authSlice.reducer;
export const AuthSliceActions = {...authSlice.actions};
