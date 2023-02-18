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
import JSONApiSkeleton from "../../app/components/api/JSONApiSkeleton";

const Projects = () => {
    const {theme} = useAppSelector(state => state.appSlice);
    const [value, setValue] = useState<number>(0);
    const debounceValue = useDebounce(value, 1000);
    const [showToolTip, setShowToolTip] = useState<{ [key: string]: any }>({});
    const toast = useToast()
    const {query} = useRouter();
    const [params, setParams] = useState<any>('')

    const {data, isSuccess, isLoading} = useGetApiQuery(params);
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

    console.log(data);

    const handleFillData = (slug: string, count: number) => {
        fillData({
            userId: me.data.data?.id,
            slug,
            count
        })
    }

    return (
        <div>
            <div className='flex justify-between dark:text-white'>
                <p className="project-name">Project Name</p>
                {<CreateApiForm project_id={params}>
                    <button className={'gradient'}>+ Add a new api</button>
                </CreateApiForm>}
            </div>
            {
                isLoading && <JSONApiSkeleton/>
            }
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
                                    <PopoverContent className={'max-w-[200px]'}>
                                        <PopoverArrow/>
                                        <PopoverBody className={'max-w-[200px]'}>
                                            <Slider
                                                size={'sm'}
                                                id={`slider${index}`}
                                                defaultValue={item.data_count}
                                                min={0}
                                                max={200}
                                                colorScheme='purple'
                                                onChangeEnd={(v) => {
                                                    handleFillData(item.slug, v);
                                                }}
                                                // onChange={(v) => setValue(v)}
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
                                                    label={`${item.data_count}`}
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
                        {me.isSuccess &&
                            <QRCodeApi value={`https://api.getjson.io/api/v1/${me.data.data?.id}/data/${item.slug}`}/>}

                        {me.isSuccess &&
                            <EditApiForm slug={item.slug} id={item.id} user_id={me.data.data?.id}/>}

                        <DeleteApi id={item.id}/>
                    </div>
                </div>
            </div>)}
            {/*Modal*/}

            <div className={'flex justify-center'}>
                {
                    data?.data?.length === 0 && <CreateApiForm project_id={params}>
                        <div
                            className={`rounded-md border-2 
                    border-dotted w-96 h-80 mx-auto md:mt-40 flex
                    cursor-pointer
                     justify-center items-center`}>

                            <span className={'text-[80px] opacity-30'}>+</span>
                        </div>
                    </CreateApiForm>
                }
            </div>
        </div>
    );
};

export default Projects;
