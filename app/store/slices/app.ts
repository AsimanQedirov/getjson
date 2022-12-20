import {createSlice} from "@reduxjs/toolkit";
import {IApp} from "../../models/slices/app";

const initialState: IApp = {
    theme: '',
    isOpenModal: false,
    modalContent: '',
    modalFooter: ''
}

const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload;
        },
        toggleModalShow: (state, action) => {
            console.log(action.payload);
            state.isOpenModal = !state.isOpenModal;
            state.modalContent = action.payload.modalContent;
            state.modalFooter = action.payload.modalFooter;
        },
        toggleModalClose: (state) => {
            state.isOpenModal = false;
            state.modalContent = '';
            state.modalFooter = '';
        },
    }
});

export default appSlice.reducer;
export const AppSliceActions = {...appSlice.actions};