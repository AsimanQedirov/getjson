import {useState} from 'react';

interface IProps {

}

const UseDropdown = () => {
    const [isOpen, __setIsOpen] = useState<boolean>(false)
    const toggleIsOpen = () => {
        __setIsOpen(!isOpen);
    }

    return {
        isOpen,
        toggleIsOpen
    }
};

export default UseDropdown;