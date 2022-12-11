import {createSlice} from "@reduxjs/toolkit";
import {IApp} from "../../models/slices/app";

const initialState: IApp = {
    theme: ''
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload;
        }
    }
});

export default appSlice.reducer;
export const AppSliceActions = {...appSlice.actions};