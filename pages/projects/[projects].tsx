import React, {useEffect, useState} from 'react';
import Image from "next/image";
import CreateProjectForm from "../../app/components/projects/CreateProjectForm";
import {useRouter} from "next/router";
import {useGetApiQuery} from "../../app/store/api/json.api";
import {useMeQuery} from "../../app/store/auth/auth.api";


const Projects = () => {
    const {query} = useRouter();
    const [params, setParams] = useState<any>('')

    const {data, isSuccess} = useGetApiQuery(params);
    const me = useMeQuery(1);

    useEffect(() => {
        if (query.projects) setParams(query.projects)
    }, [query.projects])
    return (
        <div>
            <div className='flex justify-between'>
                <p className="project-name">Project Name</p>
                {<CreateProjectForm project_id={params}/>}
            </div>
            {isSuccess && data.data.api?.map((item: any, index: number) => <div key={index} className="apis mt-5">
                <div className="api-row p-4 rounded-xl bg-white flex justify-between">
                    <div className='name flex items-center'>

                        <div className={'flex flex-col items-start ml-4'}>
                            <div className={'flex justify-center items-center'}>
                                <p className={'api-name'}>{item.title}</p>
                                <button className={`gradient ml-2`}>Generate data</button>
                            </div>
                            <div className={'flex justify-center items-center mt-1'}>
                                {me.isSuccess &&
                                    <p className="api-link">https://api.getjson.io/api/v1/{me.data.data.id}/data/{item.slug}</p>}
                                <p className="api-copy cursor-pointer flex ml-3">
                                    <Image src={'/assets/icons/copy.svg'} width={20} height={20}
                                           alt={'copylink'}/> Copy link</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
            {/*Modal*/}
        </div>
    );
};

export default Projects;