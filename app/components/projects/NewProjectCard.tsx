import React, {useEffect} from 'react';
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "../../store";
import {ProjectSliceActions} from "../../store/slices/projects";
import {useCreateProjectMutation} from "../../store/project/project.api";
import editIcon from "../../assets/icons/project-edit.svg";
import editLightIcon from "../../assets/icons/project-edit-white.svg";
import deleteIcon from "../../assets/icons/project-delete.svg";
import deleteLightIcon from "../../assets/icons/project-delete-white.svg";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

const NewProjectCard = () => {
    const [createProject, createProjectResult] = useCreateProjectMutation();
    const {theme} = useAppSelector(state => state.appSlice);

    const dispatch = useAppDispatch();
    const createNewProject = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            createProject({name: e.target.value});
            dispatch(ProjectSliceActions.toggleNewProject(false));
        } else dispatch(ProjectSliceActions.toggleNewProject(false));
    }
    console.log(createProjectResult);
    if(createProjectResult.isLoading){
        return <ProjectCardSkeleton/>
    }

    return (
        <div
            className={`z-20
            dark:bg-transparent
            animate-[fadeIn_1s_ease-in-out]
            dark:border-dark-border
            text-[#718096]
            min-h-[150px]
            w-full
            border
            rounded-lg 
            flex
            flex-col
            justify-between
            cursor-pointer
            bg-input-bg
            shadow-3xl
            text-[14px]
        `}>
            <div className="card-header flex justify-end items-center gap-2 p-2">
                <a><Image width={14} height={14} src={theme === 'light' ? editIcon : editLightIcon}
                          alt="edit icon"/></a>
                <a><Image width={14} height={14} src={theme === 'light' ? deleteIcon : deleteLightIcon}
                          alt="edit icon"/></a>
            </div>
            <div className="card-body text-center dark:text-white">
                <div>
                    <input
                        onBlur={createNewProject}
                        className={`bg-transparent text-[14px] focus:outline-none`}
                        autoFocus={true}
                        placeholder={'New project name'}
                        name={'project_name'}
                        type={'text'}/>
                </div>
            </div>
            <div className="card-footer p-2 border-t dark:border-t-dark-border dark:text-dark-text">
                API-0
            </div>
        </div>
    );
};

export default NewProjectCard;