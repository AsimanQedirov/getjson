import React, {useState} from 'react';

interface IGlobalModal {
    children: JSX.Element
}

const GlobalModal = ({children}: IGlobalModal) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = ()=> setIsOpen(!isOpen);
    console.log('children', children);
    return (
        <>
            <div onClick={toggle}>
                {
                    children
                }
            </div>
            <div id={'container'}
                 onClick={close}
                 className={`absolute ${isOpen ? 'visible' : 'hidden'}  inset-0 bg-black bg-opacity-30 
            h-screen w-full flex justify-center items-start z-50
            md:items-center pt-10 md:pt-0`}>
                <div className={`transform transition-transform relative w-10/12 md:w-3/12 h-auto 
                 bg-white rounded shadow-lg transition-opacity
                flex flex-col justify-between
                 duration-300 ${isOpen ? 'opacity-1' : 'opacity-0'} 
                 ${isOpen ? '' : '-translate-y-full'}`}>
                    <div className="modal-header flex justify-between items-center border-b border-b-gray-200 p-2">
                        <p className="modal-title">Delete Project</p>
                        <span id={'close'} onClick={close} className={'text-[30px] cursor-pointer'}>&times;</span>
                    </div>
                    <div className="modal-content p-2">

                    </div>
                    <div className="modal-footer border-t border-t-gray-200 h-12 flex justify-center p-2">

                    </div>
                </div>
            </div>
        </>

    );
};

export default GlobalModal;