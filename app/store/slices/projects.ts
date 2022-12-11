import {createSlice} from "@reduxjs/toolkit";
import {IProject} from "../../models/slices/projects";
import {ICommon} from "../../models/slices/common";

const initialState: IProject = {
    isNewProject: false
}

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {
        toggleNewProject: (state, action: ICommon<boolean>) => {
            state.isNewProject = action.payload;
        }
    }
});

export default projectSlice.reducer;
export const ProjectSliceActions = {...projectSlice.actions};