import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store";
import {ProjectSliceActions} from "../../store/slices/projects";


const AddProjectZone = () => {

    const dispatch = useAppDispatch();
    const {isNewProject} = useAppSelector(state => state.projectSlice)
    const toggleNewProject = () => !isNewProject && dispatch(ProjectSliceActions.toggleNewProject(true));

    return (
        <div
            onClick={toggleNewProject}
            className={`dark:border-dark-border transition-all
            text-[#718096]
            min-h-[150px]
            w-full
            border-dashed
            border
            rounded-lg 
            flex
            flex-col
            justify-center
            items-center
            cursor-pointer
        `}>
           <span className={`
                        w-8 h-8 mb-[16px] rounded-md 
                        border border-[#718096] 
                        flex items-center justify-center`}>
                        +
                        </span>
            <span> Add Project </span>
        </div>
    );
}

export default AddProjectZone;