import React from 'react';
import Image from "next/image";

const BannerProgress = () => {
    return (
        <div className='banner-progress
        bg-gradient-to-b
        from-[#323352FF]
        to-[#7C7B90FF]
        dark:from-[#565571]
        dark:to-[#565571]
        border border-[#615f7a] dark:bg-[#565571] flex justify-between items-center'>
            <div className={'w-full'}>
                <div className='banner-progress-title'>
                    What do you do to <br/>
                    use the API?
                </div>
                <div className='banner-progress-description'>
                    It's very convenient and simple
                </div>
            </div>
            <div className={'flex justify-between w-full'}>
                <div className={'banner-progress-icons text-white'}>
                    <div className='banner-progress-icon'>
                        <Image width={22} height={24} src={'/assets/icons/signin.svg'} alt={'Sign in'}/>
                    </div>
                    <p>
                        Sign in
                    </p>
                </div>
                <div className={'banner-progress-icons text-white'}>
                    <div className='banner-progress-icon'>
                        <Image width={22} height={24} src={'/assets/icons/database.svg'} alt={'Database'}/>
                    </div>
                    <p>Create your base</p>
                </div>
                <div className={'banner-progress-icons text-white'}>
                    <div className='banner-progress-icon'>
                        <Image width={22} height={24} src={'/assets/icons/make.svg'} alt={'Make ready'}/>
                    </div>
                    <p>
                        Make use
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BannerProgress;