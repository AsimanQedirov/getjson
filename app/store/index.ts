import {configureStore, ThunkAction} from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import appSlice from "./slices/app";
import projectSlice from './slices/projects';
import {Action} from "redux";
import {createWrapper} from "next-redux-wrapper";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const store = configureStore({
    reducer: {
        authSlice,
        appSlice,
        projectSlice
    },
    devTools: true
});

const makeStore = () =>
    configureStore({
        reducer: {
            authSlice,
            appSlice,
            projectSlice
        }
    })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof store.getState>
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper<AppStore>(makeStore);
