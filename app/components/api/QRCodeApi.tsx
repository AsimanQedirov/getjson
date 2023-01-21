import React from 'react';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import QRCode from "react-qr-code";
import Image from "next/image";
import {useAppSelector} from "../../store";

const QrCodeApi = ({value}: { value: string }) => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const {theme} = useAppSelector(state => state.appSlice);

    return (
        <div>
            <a onClick={onOpen}>
                <Image width={14} height={14}
                       src={`/assets/icons/qrcode-${theme === 'light' ? 'light' : 'dark'}.svg`}
                       alt="qrcode icon"/>
            </a>
            <Modal onClose={onClose} isCentered size={'sm'} isOpen={isOpen}>
                <ModalOverlay
                    bg='blackAlpha.200'
                    backdropFilter='blur(3px) hue-rotate(0deg)'
                />
                <ModalContent className={'dark:bg-main-border dark:text-white'}>
                    <ModalHeader>Scan your API</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody className={'flex justify-center'}>
                        <QRCode value={value} className={'mb-4'}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default QrCodeApi;
