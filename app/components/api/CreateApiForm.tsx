import React, {useEffect, useState} from 'react';
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
import {useForm} from 'react-hook-form'
import {useCreateApiMutation, useFillDataMutation, useGetColumnsQuery} from "../../store/api/json.api";
import {IFieldColumns} from "../../models/json";
import {useMeQuery} from "../../store/auth/auth.api";

const CreateApiForm = React.memo(({project_id}: { project_id: string }) => {
    /*rtk query*/
    const columns = useGetColumnsQuery(1);
    const me = useMeQuery(1);
    const [fillData] = useFillDataMutation()
    const [createApi, {isLoading, isError, isSuccess, data}] = useCreateApiMutation();
    const {isOpen, onClose, onOpen} = useDisclosure();
    const {handleSubmit, register, formState: {errors}, reset} = useForm();
    const [fieldColumns, setFieldColumns] = useState<Array<IFieldColumns>>([
        {
            fieldName: 'fieldName_',
            fieldType: 'fieldType_',
            fieldCheckbox: 'fieldCheckbox_'
        }
    ]);
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
        body['project_id'] = project_id
        createApi(body)
    }

    const appendNewField = () => {
        setFieldColumns([...fieldColumns, {
            fieldName: 'fieldName_',
            fieldType: 'fieldType_',
            fieldCheckbox: 'fieldCheckbox_'
        }])
    }
    const removeExistField = (order: number) => {
        setFieldColumns(fieldColumns.filter((item: IFieldColumns, index: number) => index !== order))
    }
    useEffect(() => {
        if (isSuccess) {
            setFieldColumns([
                {
                    fieldName: 'fieldName_',
                    fieldType: 'fieldType_',
                    fieldCheckbox: 'fieldCheckbox_'
                }
            ]);
            reset({})
            if (me.isSuccess) {
                fillData({userId: me.data.data.id, slug: data.data.title})
            }
            onClose(); //close modal after the request is success
        }
    }, [isSuccess])
    return (
        <>
            <button onClick={onOpen} className={'gradient'}>+ Add a new api</button>
            <Modal onClose={onClose} isCentered size={'2xl'} isOpen={isOpen}>
                <ModalOverlay
                    bg='blackAlpha.200'
                    backdropFilter='blur(3px) hue-rotate(0deg)'
                />
                <ModalContent className={'dark:bg-main-border dark:text-white'}>
                    <ModalHeader>Create new API</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl isInvalid={!!(errors.name)}>
                                <FormLabel htmlFor='name'>Email address</FormLabel>
                                <FormHelperText className={'dark:text-white'}>
                                    Enter meaningful resource name, it will be used to generate
                                    API endpoints.</FormHelperText>
                                <Input type='text' className={'mt-1'} {...register(
                                    'name',
                                    {
                                        required: true,
                                    })} placeholder={'Name...'}/>
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
                            {fieldColumns.map((item: IFieldColumns, index: number) =>
                                <div key={index} className={'grid grid-cols-4 mt-3 gap-2 items'}>
                                    <FormControl isInvalid={!!(errors[`${item.fieldName}${index}`])}>
                                        <Input type='text' {...register(
                                            `${item.fieldName}${index}`,
                                            {
                                                required: true,
                                            })} placeholder={'Field name'}/>
                                        <FormErrorMessage>{errors[`${item.fieldName}${index}`] && 'This is required'}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl isInvalid={!!(errors[`${item.fieldType}${index}`])}>
                                        <Select placeholder='Type' isDisabled={columns.isLoading} {...register(
                                            `${item.fieldType}${index}`,
                                            {
                                                required: true,
                                            })}>
                                            {
                                                (columns.status === 'fulfilled' && columns.data.data) &&
                                                columns.data.data.map((column: any, col_index: number) => {
                                                    return <option key={col_index}
                                                                   value={column.id}>{column.type}</option>
                                                })
                                            }
                                        </Select>
                                        <FormErrorMessage>{errors[`${item.fieldType}${index}`] && 'This is required'}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl className={'pt-2'}>
                                        <Checkbox {...register(`${item.fieldCheckbox}${index}`)} colorScheme='blue'>
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
                                    className={`w-full border rounded-3xl p-3 ${isLoading ? 'opacity-30' :
                                        isError ? 'border-red-700' : ''}`}
                                    type={'submit'}>Create and Generate
                                </button>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
});
export default CreateApiForm;
