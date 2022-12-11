import {createSlice} from "@reduxjs/toolkit";
import {IAuth} from "../../models/slices/auth";

const initialState: IAuth = {
    isAuth: false
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {}
});
export default authSlice.reducer;
