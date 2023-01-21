import React, {useEffect, useState} from 'react';
import Image from "next/image";
import CreateApiForm from "../../app/components/api/CreateApiForm";
import {useRouter} from "next/router";
import {useFillDataMutation, useGetApiQuery} from "../../app/store/api/json.api";
import {useMeQuery} from "../../app/store/auth/auth.api";
import {
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Tooltip,
    useToast
} from "@chakra-ui/react";
import {useAppSelector} from "../../app/store";
import useDebounce from "../../app/hook/useDebounce";
import DeleteApi from "../../app/components/api/DeleteApi";
import EditApiForm from "../../app/components/api/EditApiForm";
import QRCodeApi from "../../app/components/api/QRCodeApi";

const Projects = () => {
    const {theme} = useAppSelector(state => state.appSlice);
    const [value, setValue] = useState<number>(0);
    const debounceValue = useDebounce(value, 1000);
    const [showToolTip, setShowToolTip] = useState<{ [key: string]: any }>({});
    const toast = useToast()
    const {query} = useRouter();
    const [params, setParams] = useState<any>('')

    const {data, isSuccess} = useGetApiQuery(params);
    const [fillData] = useFillDataMutation();
    const me = useMeQuery(1);

    const copyLink = async (text: string) => {
        await navigator.clipboard.writeText(text);
        toast({
            title: 'Success',
            description: "Link copied",
            status: 'success',
            duration: 1000,
            isClosable: true,
        })
    }
    useEffect(() => {
        if (query.projects) setParams(query.projects)
    }, [query.projects]);
    useEffect(() => {
        if (debounceValue) {
            console.log('debounceValue', debounceValue);

        }
    }, [debounceValue])

    return (
        <div>
            <div className='flex justify-between dark:text-white'>
                <p className="project-name">Project Name</p>
                {<CreateApiForm project_id={params}/>}
            </div>
            {isSuccess && data.data?.map((item: any, index: number) => <div key={index} className="apis mt-5">
                <div
                    className="api-row p-4 rounded-xl bg-white
                    flex justify-between items-center dark:bg-dark-api-bg dark:border-dark-border border">
                    <div className='name flex items-center'>
                        <div className={'flex flex-col items-start ml-4'}>
                            <div className={'flex justify-center items-center'}>
                                <p className={'api-name dark:text-white'}>{item.title}</p>
                                <Popover placement={'top'}>
                                    <PopoverTrigger>
                                        <button className={`gradient ml-2`}>Generate data</button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow/>
                                        <PopoverBody>
                                            <Slider
                                                id={`slider${index}`}
                                                defaultValue={20}
                                                min={0}
                                                max={200}
                                                colorScheme='purple'
                                                onChange={(v) => setValue(v)}
                                                onMouseEnter={() => setShowToolTip({[`show${index}`]: true})}
                                                onMouseLeave={() => setShowToolTip({[`show${index}`]: false})}>
                                                <SliderTrack>
                                                    <SliderFilledTrack/>
                                                </SliderTrack>
                                                <Tooltip
                                                    hasArrow
                                                    bg='purple.600'
                                                    color='white'
                                                    placement='top'
                                                    isOpen={showToolTip[`show${index}`]}
                                                    label={`${value ?? 20}`}
                                                >
                                                    <SliderThumb/>
                                                </Tooltip>
                                            </Slider>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className={'flex justify-center items-center mt-1 dark:text-white'}>
                                {me.isSuccess &&
                                    <p className="api-link">
                                        https://api.getjson.io/api/v1/{me.data.data?.id}/data/{item.slug}</p>}
                                <p className="api-copy cursor-pointer flex ml-3"
                                   onClick={() =>
                                       copyLink(`https://api.getjson.io/api/v1/${me.data.data?.id}/data/${item.slug}`)}>
                                    <Image src={'/assets/icons/copy.svg'} width={20} height={20}
                                           alt={'copylink'}/> Copy link</p>
                            </div>
                        </div>
                    </div>
                    <div className={'flex items-center gap-4'}>
                        <QRCodeApi value={`https://api.getjson.io/api/v1/${me.data.data?.id}/data/${item.slug}`}/>

                        <EditApiForm slug={item.slug} id={item.id} user_id={me.data.data?.id}/>

                        <DeleteApi id={item.id}/>
                    </div>
                </div>
            </div>)}
            {/*Modal*/}
        </div>
    );
};

export default Projects;
