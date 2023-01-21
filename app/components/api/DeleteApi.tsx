import React, {useEffect} from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import {useDeleteApiMutation} from "../../store/api/json.api";
import {useAppSelector} from "../../store";

const DeleteApi = React.memo((
    { id}: {id: number }) => {
    const {theme} = useAppSelector(state => state.appSlice);
    const {isOpen, onClose, onOpen} = useDisclosure();
    const cancelRef = React.useRef<any>();
    const [deleteApi, {isSuccess, isLoading,isError}] = useDeleteApiMutation()
    const toast = useToast();
    const deleteAPI = () => {

            deleteApi({id});
    }
    useEffect(()=>{
        if(isSuccess){
            toast({
                title: 'Success',
                description: "API deleted successfully!",
                status: 'success',
                duration: 1000,
                isClosable: true,
            });
            onClose();
        }
    },[isSuccess])
    return (
        <div>
            <a onClick={onOpen}>
                <Image width={14} height={14}
                       src={`/assets/icons/project-delete${theme === 'light' ? '' : '-white'}.svg`}
                       alt="edit icon"/>
            </a>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent className={'dark:bg-main-border dark:text-white'}>

                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete API
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose} className={'dark:text-dark-api-bg'}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteAPI} ml={3} className={`${isLoading ? 'opacity-30' :
                                isError ? 'border-red-700' : ''}`}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    );
});

export default DeleteApi;
