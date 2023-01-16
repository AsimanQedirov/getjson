import React, {useState} from 'react';
import Image from "next/image";
import {useAppSelector} from "../../store";
import {IProjectResponse} from "../../models/project";
import {useDeleteProjectMutation, useUpdateProjectMutation} from "../../store/project/project.api";
import ProjectCardSkeleton from "./ProjectCardSkeleton";
import {useRouter} from "next/router";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from "@chakra-ui/react";

const ProjectCard = ({name, slug, unique_id, api_count}: IProjectResponse) => {
    const router = useRouter();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = React.useRef<any>()
    const [projectName, setProjectName] = useState<string>(name ?? '')
    const [updateProject, {isLoading: isUpdating}] = useUpdateProjectMutation();
    const [deleteProject, {isLoading: isDeleting}] = useDeleteProjectMutation();
    const {theme} = useAppSelector(state => state.appSlice);
    const toProject = () => {
        router.push(`projects/${unique_id}`);
    }
    console.log(unique_id)
    const updateExistProject = () => {
        if (projectName) {
            updateProject({name: projectName, id: unique_id});
        }
        setIsUpdate(false);
    }
    const deleteThisProject = () => {
        deleteProject(unique_id);
    }
    if (isUpdating) {
        return <ProjectCardSkeleton/>
    }
    return (
        <div
            className={`dark:bg-transparent
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
                <a onClick={() => setIsUpdate(true)}>
                    <Image width={14} height={14}
                           src={`/assets/icons/project-edit${theme === 'light' ? '' : '-white'}.svg`}
                           alt="edit icon"/></a>
                <a onClick={onOpen}>
                    <Image width={14} height={14}
                           src={`/assets/icons/project-delete${theme === 'light' ? '' : '-white'}.svg`}
                           alt="edit icon"/>
                </a>


            </div>
            <div className="card-body text-center dark:text-white" onClick={toProject}>
                {isUpdate ? <form onSubmit={(event) => {
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
                API- <code>{api_count}</code>
            </div>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Project
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure delete this?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteThisProject} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    );
};

export default ProjectCard;