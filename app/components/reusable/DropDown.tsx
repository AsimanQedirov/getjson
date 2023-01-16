import React, {createContext, useContext, useEffect, useRef} from 'react';
import useDropdown from "../../hook/useDropdown";

interface IDropDownChildren {
    children: JSX.Element
}

export const DropDownContext = createContext({
    isOpen: false,
    toggleIsOpen: () => {

    }
})


const DropDown = ({children}: IDropDownChildren) => {
    const {isOpen, toggleIsOpen} = useDropdown();
    return (
        <div className='dropdown'>
            <DropDownContext.Provider value={{isOpen, toggleIsOpen}}>
                {children}
            </DropDownContext.Provider>
        </div>
    );
};
const Button = ({children}: IDropDownChildren) => {
    const {toggleIsOpen} = useContext(DropDownContext);
    return <div onClick={toggleIsOpen}>
        {children}
    </div>
};

const Items = ({children}: IDropDownChildren) => {
    return <li className={'px-4 cursor-pointer border-b dark:border-b-main-border'}>
        {children}
    </li>
}

const DropDownMenu = ({children}: IDropDownChildren) => {
    const {isOpen, toggleIsOpen} = useContext(DropDownContext);
    const ref = useRef<any>();
    useEffect(() => {
        /**
         * click outside the div
         * @param event
         */
        const clickOutsideDiv = (event: any) => {
            console.log('i clicked!')
            if (ref.current && !ref.current.contains(event.target) && isOpen) {
                toggleIsOpen();
            }
        }
        document.addEventListener("click", clickOutsideDiv);

        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("click", clickOutsideDiv);
        };
    }, [ref]);
    return <div
        ref={ref}
        id="dropdown"
        className={`py-2 transition duration-150 ease-in-out ${isOpen ? 'absolute' : 'hidden'}
                        z-10'
                        right-0
                        bg-main-bg
                        dark:bg-[#323352]
                        dark:border-main-border
                        border
                        min-w-max rounded divide-y divide-gray-100 shadow-2xl`}>
        <ul aria-labelledby="languageDropdown" className="dark:text-white" onClick={toggleIsOpen}>
            {children}
        </ul>
    </div>
}
DropDown.Button = Button;
DropDownMenu.Items = Items;

export {DropDown, DropDownMenu} ;