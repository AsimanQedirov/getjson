import React, {FormEvent} from 'react';
import AddProjectZone from "components/projects/AddProjectZone";
import ProjectCard from "components/projects/ProjectCard";
import NewProjectCard from "../app/components/projects/NewProjectCard";
import {useAppSelector} from "../app/store";
import {useGetProjectsQuery} from "../app/store/project/project.api";
import {IProjectResponse} from "../app/models/project";
import ProjectCardSkeleton from "../app/components/projects/ProjectCardSkeleton";

function Projects() {
    const {data, isLoading, status} = useGetProjectsQuery(1);
    const {isNewProject} = useAppSelector(state => state.projectSlice);
    /*search project name */
    const searchProject = (event: FormEvent) => {
        event.preventDefault();
    }
    console.log('isLoading', status)
    return (
        <div className='projects'>
            <div className='flex items-center justify-between'>
                <p className='dark:text-white'>Total - 10 Project</p>
                <form onSubmit={searchProject}>
                    <input
                        className={`p-3 dark:bg-transparent dark:border-dark-border dark:text-white
                        bg-input-bg border border-input-border rounded-[50px]
                         text-[14px] focus:outline-none min-w-[300px]`}
                        placeholder={'Search project name'}
                        autoComplete={'off'}
                        name={'project_name'}
                        type={'text'}/>
                </form>
            </div>
            <div className={'current-projects grid grid-cols-4 gap-5 mt-3'}>
                <AddProjectZone/>
                {isNewProject && <NewProjectCard/>}
                {data && (data.data.map((item: IProjectResponse, index: number) =>
                    <ProjectCard name={item.name} slug={item.slug} unique_id={item.unique_id} key={index}/>))}
                {isLoading && <>
                    <ProjectCardSkeleton/>
                    <ProjectCardSkeleton/>
                    <ProjectCardSkeleton/>
                </>}
            </div>
        </div>
    );
}

export default Projects;