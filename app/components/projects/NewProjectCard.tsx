import React from 'react';
import cancel from 'assets/icons/cancel.svg';
import Image from "next/image";
import {useAppDispatch} from "../../store";
import {ProjectSliceActions} from "../../store/slices/projects";

const NewProjectCard = () => {
    const dispatch = useAppDispatch();

    const cancelAddingNewProject = () => dispatch(ProjectSliceActions.toggleNewProject(false));
    return (
        <div

            onClick={cancelAddingNewProject}
            className={`dark:bg-transparent
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
                <a>
                    <Image width={14} height={14} src={cancel}
                           alt="ignore icon"/>
                </a>
            </div>
            <div className="card-body text-center dark:text-white">
                <form>
                    <input
                        className={`bg-transparent text-[14px] focus:outline-none`}
                        autoFocus={true}
                        placeholder={'New project name'}
                        name={'project_name'}
                        type={'text'}/>
                </form>
            </div>
            <div className="card-footer p-2 border-t dark:border-t-dark-border dark:text-dark-text">
                API-0
            </div>
        </div>
    );
};

export default NewProjectCard;