import React from 'react';

const JsonApiSkeleton = () => {
    return (
        <div className={'mt-5 flex flex-col gap-y-4'}>
            <div role="status"
                 className="rounded-lg dark:bg-transparent
            dark:border-dark-border border bg-input-bg shadow animate-pulse flex flex-col justify-between p-4">

                <div className="h-4 bg-gray-200 rounded-full dark:bg-input-bg w-32"></div>

                <div className="h-4 bg-gray-200 rounded-full dark:bg-input-bg w-80 mt-4"></div>
            </div>
            <div role="status"
                 className="rounded-lg dark:bg-transparent
            dark:border-dark-border border bg-input-bg shadow animate-pulse flex flex-col justify-between p-4">

                <div className="h-4 bg-gray-200 rounded-full dark:bg-input-bg w-32"></div>

                <div className="h-4 bg-gray-200 rounded-full dark:bg-input-bg w-80 mt-4"></div>
            </div>
            <div role="status"
                 className="rounded-lg dark:bg-transparent
            dark:border-dark-border border bg-input-bg shadow animate-pulse flex flex-col justify-between p-4">

                <div className="h-4 bg-gray-200 rounded-full dark:bg-input-bg w-32"></div>

                <div className="h-4 bg-gray-200 rounded-full dark:bg-input-bg w-80 mt-4"></div>
            </div>
        </div>
    );
};

export default JsonApiSkeleton;
