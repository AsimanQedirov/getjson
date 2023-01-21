import React, {useEffect} from 'react';
import Image from "next/image";
import GoogleLogin from "../auth/GoogleLogin";
import GithubLogin from "../auth/GithubLogin";
import {useLoginGuestMutation} from "../../store/auth/auth.api";
import {useRouter} from "next/router";
import {setCookie} from "cookies-next";
import {useAppDispatch} from "../../store";
import {AuthSliceActions} from "../../store/slices/auth";
import {Auth} from "../../helper/auth";

const Banner = () => {
    const dispatch = useAppDispatch();
    const [loginGuest, loginResult] = useLoginGuestMutation();
    const router = useRouter();

    useEffect(() => {
        if (loginResult.isSuccess) {
            const {access_token, user} = loginResult.data;
            Auth.login({
                access_token,
                userData: user
            }, dispatch, router);
            // setCookie('access_token', access_token);
            // dispatch(AuthSliceActions.loggedIn());
            // router.push('/projects');
        }
    }, [loginResult.isSuccess])

    return (
        <div className="grid grid-cols-2 banner">
            <div className="banner_Login">
                <div className='banner_login_description dark:text-white'>
                    <p>Sign in and create <br/> your API with us <br/> in minutes.</p>
                </div>
                <div className='banner_login_about dark:text-[#CBD5E0]'>
                    <p>We created this platform specifically for <br/>
                        developers to facilitate they work.</p>
                </div>
                <div className="banner_login-forms grid grid-cols-2 gap-3.5 mb-5">
                    <GoogleLogin/>
                    <GithubLogin/>
                </div>
                <hr/>
                <div className='flex justify-center mt-5 dark:text-white '>
                    <button
                        onClick={loginGuest}
                        disabled={loginResult.isLoading}
                        className={`${loginResult.isLoading ? 'opacity-50' : ''} transition bg-transparent
                        dark:border-dark-border
                        border-2
                        flex 
                        items-center
                         w-[290px] 
                         py-[12px] 
                         text-[16px]
                         font-[500]
                         flex
                         justify-center
                         rounded-[60px]`}>
                        Guest Checkout
                    </button>
                </div>

            </div>
            <div className="banner_image">
                <Image src={'/assets/images/banner.svg'} width={557} height={600} alt={'banner image'}/>
            </div>
        </div>
    );
}

export default Banner;
