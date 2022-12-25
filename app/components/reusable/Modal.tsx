import React, {useState} from 'react';
import {Modal} from "antd";

interface IModal {
    children?: JSX.Element;
    content: JSX.Element;
    title: string;
    confirm: () => void
}

const GlobalModal = ({children, content, title , confirm}: IModal) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const toggle = () => setIsOpen(!isOpen);

    const onCancel = () => toggle();

    const onOk = () => {
        toggle();
        confirm();
    }

    return (
        <div>
            <div onClick={toggle}>
                {children}
            </div>
            <Modal
                footer={null}
                title={title}
                open={isOpen}
                onCancel={onCancel}>
                {content}
                <div className={'flex justify-end'}>
                    <button
                        onClick={onOk}
                        className='bg-red-500 text-white py-1 px-3 rounded'>Delete
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default GlobalModal;