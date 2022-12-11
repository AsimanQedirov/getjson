import React, {FormEvent} from 'react';
import AddProjectZone from "components/projects/AddProjectZone";
import ProjectCard from "components/projects/ProjectCard";
import NewProjectCard from "../app/components/projects/NewProjectCard";
import {useAppSelector} from "../app/store";

function Projects() {
    const {isNewProject} = useAppSelector(state => state.projectSlice);
    /*search project name */
    const searchProject = (event: FormEvent) => {
        event.preventDefault();

    }

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
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
            </div>
        </div>
    );
}

export default Projects;