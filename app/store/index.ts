import {configureStore, ThunkAction} from "@reduxjs/toolkit";
import {Action} from "redux";
import {createWrapper} from "next-redux-wrapper";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import reducers from "./reducers";
import {setupListeners} from "@reduxjs/toolkit/query";
import {projectApi} from "./project/project.api";
import {authApi} from "./auth/auth.api";
import storeMiddlewares from "./middleware";

const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(storeMiddlewares)
});

const makeStore = () =>
    configureStore({
        reducer: reducers,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(storeMiddlewares)
    })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof store.getState>
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

/*typed Dispatch*/
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
/*typed Selector*/
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper<AppStore>(makeStore);

setupListeners(store.dispatch);