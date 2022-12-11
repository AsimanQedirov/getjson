import React, {useEffect, useState} from 'react';
import editIcon from 'assets/icons/project-edit.svg';
import deleteIcon from 'assets/icons/project-delete.svg';
import editLightIcon from 'assets/icons/project-edit-white.svg';
import deleteLightIcon from 'assets/icons/project-delete-white.svg';
import Image from "next/image";
import {useAppSelector} from "../../store";

const ProjectCard = () => {
    const {theme} = useAppSelector(state => state.appSlice);
    const [randomNumber, setRandomNumber] = useState<number>(0);

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * 10));
    }, []);
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
                <a><Image width={12} height={12} src={theme === 'light' ? editIcon : editLightIcon}
                          alt="edit icon"/></a>
                <a><Image width={12} height={12} src={theme === 'light' ? deleteIcon : deleteLightIcon}
                          alt="edit icon"/></a>
            </div>
            <div className="card-body text-center dark:text-white">
                Project name
            </div>
            <div className="card-footer p-2 border-t dark:border-t-dark-border dark:text-dark-text">
                API- <code>{randomNumber}</code>
            </div>
        </div>
    );
};

export default ProjectCard;