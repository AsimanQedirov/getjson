import React, {useState} from 'react';
import editIcon from 'assets/icons/project-edit.svg';
import deleteIcon from 'assets/icons/project-delete.svg';
import editLightIcon from 'assets/icons/project-edit-white.svg';
import deleteLightIcon from 'assets/icons/project-delete-white.svg';
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "../../store";
import {IProjectResponse} from "../../models/project";
import {useDeleteProjectMutation, useUpdateProjectMutation} from "../../store/project/project.api";
import {AppSliceActions} from "../../store/slices/app";
import ProjectCardSkeleton from "./ProjectCardSkeleton";


const ProjectCard = ({name, slug, unique_id}: IProjectResponse) => {
    const dispatch = useAppDispatch();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [projectName, setProjectName] = useState<string>(name ?? '')
    const [updateProject, {isLoading: isUpdating}] = useUpdateProjectMutation();
    const [deleteProject, {isLoading : isDeleting}] = useDeleteProjectMutation();
    const {theme} = useAppSelector(state => state.appSlice);
    const updateExistProject = () => {
        if (projectName) {
            updateProject({name: projectName, id: unique_id});
        }
        setIsUpdate(false);
    }
    const deleteExistProject = () => dispatch(AppSliceActions.toggleModalShow({
        modalContent: <p className={'text-[15px]'}>Are you sure delete for this?</p>,
        modalFooter: <button onClick={() => {
            deleteProject(unique_id);
            dispatch(AppSliceActions.toggleModalClose());
        }}
                             className='bg-red-500 text-white px-2 rounded'>Delete</button>
    }));
    if (isUpdating) {
        return <ProjectCardSkeleton/>
    }
    return (
        <div className={`dark:bg-transparent
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
                <a onClick={() => setIsUpdate(true)}><Image width={14} height={14}
                                                            src={theme === 'light' ? editIcon : editLightIcon}
                                                            alt="edit icon"/></a>
                <a onClick={() => deleteExistProject()}><Image width={14} height={14}
                                                               src={theme === 'light' ? deleteIcon : deleteLightIcon}
                                                               alt="edit icon"/></a>
            </div>
            <div className="card-body text-center dark:text-white">
                {isUpdate ? <form onSubmit={(event)=>{
                    event.preventDefault();
                    updateExistProject();
                }}>
                    <input
                        onBlur={updateExistProject}
                        className={`bg-transparent text-[14px] focus:outline-none text-center`}
                        autoFocus={true}
                        placeholder={'New project name'}
                        name={'project_name'}
                        value={projectName}
                        onChange={(event) => setProjectName(event.target.value)}
                        type={'text'}/>
                </form> : projectName}
            </div>
            <div className="card-footer p-2 border-t dark:border-t-dark-border dark:text-dark-text">
                API- <code>{}</code>
            </div>
        </div>
    );
};

export default ProjectCard;