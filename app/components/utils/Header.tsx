import React, {useCallback} from 'react';
import logo from '../../../public/assets/images/logo.svg'
import Image from "next/image";
import Link from "next/link";
import en from '../../../public/assets/icons/en-language.svg';
import rus from '../../../public/assets/icons/ru-language.svg';
import az from '../../../public/assets/icons/az-language.svg';
import userSvg from '../../../public/assets/images/user.svg';
import moon from '../../../public/assets/icons/moon.svg';
import moonDark from '../../../public/assets/icons/moon-white.svg';
import sun from '../../../public/assets/icons/sun.svg';
import sunDark from '../../../public/assets/icons/sun-white.svg';
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../store";
import {AppSliceActions} from "../../store/slices/app";
import {Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/menu";
import {deleteCookie} from "cookies-next";
import {AuthSliceActions} from "../../store/slices/auth";

function Header() {
    const {theme} = useAppSelector(state => state.appSlice);
    const {isAuth} = useAppSelector(state => state.authSlice);
    const dispatch = useAppDispatch();
    const {pathname , push} = useRouter();

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
    const logout = () => {
        deleteCookie('access_token');
        push('/');
        dispatch(AuthSliceActions.loggedOut());
    }
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

                    <div>
                        <Menu>
                            <MenuButton>
                                <Image src={en} className='w-9' alt={'en'}/>
                            </MenuButton>
                            <MenuList
                                className={'bg-main-bg border dark:border-main-border dark:bg-dark-dropdown-bg dark:text-white p-1 shadow-lg rounded-md'}>
                                <MenuItem>
                                    <Image className="w-9 mr-2" src={az} alt={'aze'}/> Azerbaijan
                                </MenuItem>
                                <MenuItem>
                                    <Image className="w-9 mr-2" src={en} alt={'en'}/> English
                                </MenuItem>
                                <MenuItem>
                                    <Image className="w-9 mr-2" src={rus} alt={'ru'}/> Russian
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                <Menu>
                    <MenuButton className="ml-[20px]">
                        <div className='h-7 w-7 rounded-full !m-0 !p-0 border cursor-pointer'>
                            <Image src={userSvg} alt={'user'}/>
                        </div>
                    </MenuButton>
                    { <MenuList
                        className={'bg-main-bg border dark:border-main-border dark:bg-dark-dropdown-bg dark:text-white p-1 shadow-lg rounded-md'}>
                        <MenuItem onClick={logout}>
                            Logout
                        </MenuItem>
                    </MenuList>}
                </Menu>
            </div>
        </header>
    );
}

export default Header;