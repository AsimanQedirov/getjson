import {combineReducers} from "redux";
import authSlice from "./slices/auth";
import appSlice from "./slices/app";
import projectSlice from './slices/projects';
import {projectApi} from "./project/project.api";
import {authApi} from "./auth/auth.api";

const reducers = combineReducers({
    authSlice,
    appSlice,
    projectSlice,
    [projectApi.reducerPath]: projectApi.reducer,
    [authApi.reducerPath]: authApi.reducer
})
export default reducers;