import React from 'react';
import Image from "next/image";
import {useAppSelector} from "../../store";
import {useDisclosure} from "@chakra-ui/react";
import {jsonApi} from "../../store/api/json.api";

interface IProps {
    user_id: string;
    slug: string;
    id: string
}

const EditApiForm = React.memo(({user_id, slug, id}: IProps) => {
    const {theme} = useAppSelector(state => state.appSlice);
    const {isOpen, onClose, onOpen} = useDisclosure();
    const [trigger, {data, isSuccess, isError, isLoading}] = jsonApi.useLazyShowApiQuery();
    const editApi = () => {
        trigger({id});
    }
    return (
        <div>
            <a onClick={editApi}>
                <Image width={14} height={14}
                       src={`/assets/icons/project-edit${theme === 'light' ? '' : '-white'}.svg`}
                       alt="edit icon"/>
            </a>

        </div>
    );
});

export default EditApiForm;
