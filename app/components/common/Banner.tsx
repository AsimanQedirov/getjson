import React from 'react';
import Image from "next/image";
import banner from 'assets/images/banner.svg'
import GoogleLogin from "../auth/GoogleLogin";
import TwitterLogin from "../auth/TwitterLogin";
import FacebookLogin from "../auth/FacebookLogin";
import GithubLogin from "../auth/GithubLogin";

const Banner = () => {

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
                <div className="banner_login-forms grid grid-cols-2 gap-3.5">
                    <GoogleLogin/>
                    <TwitterLogin/>
                    <FacebookLogin/>
                    <GithubLogin/>
                </div>
            </div>
            <div className="banner_image">
                <Image src={banner} alt={'banner image'}/>
            </div>
        </div>
    );
}

export default Banner;