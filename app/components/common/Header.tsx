import React, {useCallback, useState} from 'react';
import logo from 'assets/images/logo.svg'
import Image from "next/image";
import Link from "next/link";
import en from 'assets/icons/en-language.svg';
import rus from 'assets/icons/ru-language.svg';
import az from 'assets/icons/az-language.svg';
import dropdownSvg from 'assets/icons/dropdown.svg';
import userSvg from 'assets/images/user.svg';
import moon from 'assets/icons/moon.svg';
import moonDark from 'assets/icons/moon-white.svg';
import sun from 'assets/icons/sun.svg';
import sunDark from 'assets/icons/sun-white.svg';
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../store";
import {AppSliceActions} from "../../store/slices/app";

function Header() {
    const {theme} = useAppSelector(state => state.appSlice);
    const dispatch = useAppDispatch();
    const [dropdown, setDropdown] = useState<boolean>(false);
    const {pathname} = useRouter();

    const toggleDropdown = () => setDropdown(!dropdown);

    const changeTheme = useCallback(() => {
        if (localStorage.getItem("theme") === "dark") {
            localStorage.setItem("theme", "light");
            window.document.documentElement.classList.remove("dark");
            dispatch(AppSliceActions.changeTheme('light'))
        } else {
            localStorage.setItem("theme", "dark");
            window.document.documentElement.classList.add("dark");
            dispatch(AppSliceActions.changeTheme('dark'))

        }
    }, []);
    return (
        <header className="flex justify-between py-[24px]">
            <div className="header-menu flex"> {/* logo and navbar elements*/}
                <div className="logo flex items-center justify-center">
                    <Link href={"/"}>
                        <Image src={logo} alt={'Logo'}/>
                    </Link>
                </div>
                <div className="navbar text-[16px] font-[500] ml-[40px] flex gap-[16px] dark:text-white">
                    <Link className={`nav_link ${pathname === "/projects" ? '__activeLink' : ''}`} href={'/projects'}>
                        Projects
                    </Link>
                    <Link className={`nav_link ${pathname === "/docs" ? '__activeLink' : ''}`} href={'/docs'}>
                        Docs
                    </Link>
                </div>
            </div>


            <div className="header-profile flex items-center"> {/*languages and profile account*/}
                {/*dark mode*/}
                <div className='flex mr-[20px]'>
                    <Image src={theme === 'dark' ? sunDark : sun} alt={'sun'}/>
                    <label className="inline-flex relative items-center cursor-pointer mx-[12px]">
                        <input
                            onChange={changeTheme}
                            type="checkbox" value={'dark'}
                            checked={theme === 'dark' ? true : false}
                            className="sr-only peer focus:outline-none"/>
                        <div className="
                        w-11 h-6 bg-gray-200
                      rounded-full peer
                       bg-gradient-to-r
                       from-[#7C7B90FF]
                       to-[#323352FF]
                       dark:from-[#764BA2FF]
                       dark:to-[#667EEAFF]
                      peer-checked:after:translate-x-full peer-checked:after:border-white after:content-['']
                      after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300
                      after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                      dark:border-gray-600 peer-checked:bg-blue-600 focus:outline-none">
                        </div>
                    </label>
                    <Image src={theme === 'dark' ? moonDark : moon} alt={'moon'}/>
                </div>
                {/*header dropdown menu*/}
                <div className={'header-dropdown relative'}>
                    <button
                        onClick={toggleDropdown}
                        className={'flex items-center'}
                        id="languageDropdown"
                        data-dropdown-toggle="dropdown"
                        type="button">
                        <Image src={en} className='w-9' alt={'en'}/>
                        <Image className={'ml-1 '} src={dropdownSvg} alt={'dropdown'} width={15}/>
                    </button>
                    <div id="dropdown"
                         className={` py-2 transition duration-150 ease-in-out ${dropdown ? 'absolute' : 'hidden'}
                         z-10'
                        right-0
                        bg-main-bg
                        dark:bg-[#323352]
                        dark:border-main-border
                        border
                        min-w-max rounded divide-y divide-gray-100 shadow-2xl`}>
                        <ul aria-labelledby="languageDropdown" className="dark:text-white">
                            <li className={'px-4 cursor-pointer border-b dark:border-b-main-border'}>
                                <div className='flex items-center'>
                                    <Image className="w-9 mr-2" src={az} alt={'aze'}/> Azerbaijan
                                </div>
                            </li>
                            <li className={'px-4 cursor-pointer border-b dark:border-b-main-border'}>
                                <div className='flex items-center'>
                                    <Image className="w-9 mr-2" src={en} alt={'en'}/> English
                                </div>
                            </li>
                            <li className={'px-4 cursor-pointer'}>
                                <div className='flex items-center'>
                                    <Image className="w-9 mr-2" src={rus} alt={'ru'}/> Russian
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/*user profile*/}
                <div className='ml-[20px] h-9 w-9 rounded-full border'>
                    <Image src={userSvg} alt={'user'}/>
                </div>
            </div>
        </header>
    );
}

export default Header;