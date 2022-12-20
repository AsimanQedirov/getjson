import React from 'react';

const ProjectCardSkeleton = () => {
    return (
        <div role="status"
             className="max-w-sm rounded dark:bg-transparent
            dark:border-dark-border border bg-input-bg shadow animate-pulse flex flex-col justify-between">
            <div className='flex justify-end m-2'>
                <div className="h-4 bg-gray-200  dark:bg-input-bg w-4"></div>
                <div className="h-4 bg-gray-200  dark:bg-input-bg w-4  ml-2"></div>
            </div>
            <div className='flex justify-center'>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-input-bg w-40"></div>
            </div>
            <div className="card-footer px-2 py-3.5 border-t dark:border-t-dark-border dark:text-dark-text">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-input-bg w-40"></div>
            </div>
        </div>)
};

export default ProjectCardSkeleton;