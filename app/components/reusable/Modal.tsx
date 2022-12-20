import React from 'react';
import {useAppDispatch, useAppSelector} from "../../store";
import {AppSliceActions} from "../../store/slices/app";

const Modal = () => {
    const dispatch = useAppDispatch();
    const {isOpenModal, modalContent , modalFooter} = useAppSelector(state => state.appSlice);
    const close = () => dispatch(AppSliceActions.toggleModalClose());
    console.log(modalContent)
    return (
        <>
            <div className={`absolute ${isOpenModal ? 'visible' : 'hidden'}  inset-0 bg-black bg-opacity-30 
            h-screen w-full flex justify-center items-start z-50
            md:items-center pt-10 md:pt-0`}>
                <div className={`transform transition-transform relative w-10/12 md:w-3/12 h-auto 
                 bg-white rounded shadow-lg transition-opacity
                flex flex-col justify-between
                 duration-300 ${isOpenModal ? 'opacity-1' : 'opacity-0'} 
                 ${isOpenModal ? '' : '-translate-y-full'}`}>
                    <div className="modal-header flex justify-between items-center border-b border-b-gray-200 p-2">
                        <p className="modal-title">Delete Project</p>
                        <span onClick={close} className={'text-[30px] cursor-pointer'}>&times;</span>
                    </div>
                    <div className="modal-content p-2">
                        {modalContent}
                    </div>
                    <div className="modal-footer border-t border-t-gray-200 h-12 flex justify-center p-2">
                        {modalFooter}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;