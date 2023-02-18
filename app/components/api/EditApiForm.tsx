import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {useAppSelector} from "../../store";
import {
    Checkbox,
    Divider,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Select,
    useDisclosure
} from "@chakra-ui/react";
import {jsonApi, useGetColumnsQuery, useUpdateApiMutation} from "../../store/api/json.api";
import {IApiSettings, IFieldColumns, IFieldValueColumns} from "../../models/json";
import {useForm} from "react-hook-form";

interface IProps {
    user_id: string;
    slug: string;
    id: string
}

const EditApiForm = React.memo(({user_id, slug, id}: IProps) => {
    const {theme} = useAppSelector(state => state.appSlice);
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [trigger, {data: showData, isSuccess: isShowSuccess, isError, isLoading}] = jsonApi.useLazyShowApiQuery();
    const [updateApi, {
        isLoading: isUpdateLoading,
        isError: isUpdateError,
        isSuccess: isUpdateSuccess,
        error: updateError
    }] = useUpdateApiMutation()
    const {handleSubmit, register, formState: {errors}, reset} = useForm({});
    const [fieldColumns, setFieldColumns] = useState<Array<IFieldValueColumns>>([]);
    const onSubmit = (data: any) => {
        const body: any = {
            columns: []
        }
        Object.entries(data).forEach(([key, value], index) => {
            if (data['fieldName_' + index]) {
                body.columns.push({
                    title: {
                        [data['fieldName_' + index]]: Number(data['fieldType_' + index])
                    },
                    required: data['fieldCheckbox_' + index] ? 1 : 0
                })
            }
        });
        body['title'] = data.name;
        body['project_id'] = id;
        // createApi(body)
        updateApi({...body, id})
    }

    const columns = useGetColumnsQuery(1);

    const editApi = () => {
        trigger({id});
        onOpen();
    };

    const appendNewField = () => {
        setFieldColumns([...fieldColumns, {
            fieldName: 'fieldName_',
            fieldType: 'fieldType_',
            fieldCheckbox: 'fieldCheckbox_',
            value: '',
            title: '',
            required: false,
        }])
    }
    const removeExistField = (order: number) => {
        setFieldColumns(fieldColumns.filter((item: IFieldColumns, index: number) => index !== order))
    }

    useEffect(() => {
        if (isShowSuccess && showData.data.api_settings.length > 0) {
            setFieldColumns(showData.data.api_settings.map((item: IApiSettings) => {
                    return {
                        fieldName: 'fieldName_',
                        fieldType: 'fieldType_',
                        fieldCheckbox: 'fieldCheckbox_',
                        value: item.column_id,
                        title: item.title,
                        required: !!item.required
                    }
                })
            )
        }
    }, [isShowSuccess]);
    console.log(fieldColumns);
    return (
        <div>
            <a onClick={editApi}>
                <Image width={14} height={14}
                       src={`/assets/icons/project-edit${theme === 'light' ? '' : '-white'}.svg`}
                       alt="edit icon"/>
            </a>

            <Modal onClose={onClose} isCentered size={'2xl'} isOpen={isOpen}>
                <ModalOverlay
                    bg='blackAlpha.200'
                    backdropFilter='blur(3px) hue-rotate(0deg)'
                />
                <ModalContent className={'dark:bg-main-border dark:text-white'}>
                    <ModalHeader>Create new API</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {!isLoading && <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!(errors.name)}>
                                <FormLabel htmlFor='name'>Email address</FormLabel>
                                <FormHelperText className={'dark:text-white'}>
                                    Enter meaningful resource name, it will be used to generate
                                    API endpoints.</FormHelperText>
                                <Input type='text' className={'mt-1'} {...register(
                                    'name',
                                    {
                                        required: true,
                                    })} defaultValue={showData?.data.title} placeholder={'Name...'}/>
                                <FormErrorMessage>{errors.name && 'This is required'}</FormErrorMessage>
                            </FormControl>
                            <Divider className={'my-2'}/>
                            <div className={'grid grid-cols-4'}>
                                <FormControl>
                                    <Input type='text' className={'mt-1'} {...register(
                                        'id',
                                        {
                                            required: true,
                                        })} value={'ID'}/>
                                </FormControl>
                            </div>
                            {fieldColumns.length > 0 &&
                                fieldColumns.map((item: IFieldValueColumns, index: number) =>
                                <div key={index} className={'grid grid-cols-4 mt-3 gap-2 items'}>
                                    <FormControl isInvalid={!!(errors[`${item.fieldName}${index}`])}>
                                        <Input type='text' {...register(
                                            `${item.fieldName}${index}`,
                                            {
                                                required: true,
                                            })} placeholder={'Field name'} defaultValue={item.title}/>
                                        <FormErrorMessage>{errors[`${item.fieldName}${index}`] && 'This is required'}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!(errors[`${item.fieldType}${index}`])}>
                                        <Select placeholder='Type' isDisabled={columns.isLoading} {...register(
                                            `${item.fieldType}${index}`,
                                            {
                                                required: true,
                                            })} defaultValue={item.value}>
                                            {
                                                (columns.status === 'fulfilled' && columns.data.data) &&
                                                columns.data.data.map((column: any, col_index: number) => {
                                                    return <option key={col_index}
                                                                   value={column.id}>{column.type}</option>
                                                })
                                            }
                                        </Select>
                                        <FormErrorMessage>{errors[`${item.fieldType}${index}`] && 'This is required'}
                                        </FormErrorMessage>
                                    </FormControl>
                                    <FormControl className={'pt-2'}>
                                        <Checkbox defaultChecked={item.required}
                                                  {...register(`${item.fieldCheckbox}${index}`)} colorScheme='blue'>
                                            Required
                                        </Checkbox>
                                    </FormControl>
                                    <div className={'col-span-1'}>
                                        {fieldColumns.length !== 1 &&
                                            <button className='border rounded-3xl px-4 mt-2 text-[20px]' type={'button'}
                                                    onClick={() => {
                                                        removeExistField(index)
                                                    }}>-
                                            </button>}
                                    </div>
                                </div>)
                            }
                            <button className='bg-gradient-to-b
                              from-[#323352FF]
                              to-[#7C7B90FF]
                              dark:from-[#565571]
                              dark:to-[#565571]
                                 border rounded-3xl px-6 mt-3 text-[20px] text-white' type={'button'}
                                    onClick={appendNewField}>+
                            </button>
                            <div className={'flex w-full gap-3 mt-6 mb-3'}>
                                <button className='w-full border rounded-3xl p-3' type={'button'}
                                        onClick={onClose}>Cancel
                                </button>
                                <button
                                    className={`w-full border rounded-3xl p-3 ${isUpdateLoading ? 'opacity-30' :
                                        isUpdateError ? 'border-red-700' : ''}`}
                                    type={'submit'}>Update your api
                                </button>
                            </div>
                        </form>}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
});

export default EditApiForm;
