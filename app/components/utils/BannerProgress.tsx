import React from 'react';

const BannerProgress = () => {
    return (
        <div className='banner-progress
        bg-gradient-to-b
        from-[#323352FF]
        to-[#7C7B90FF]
        dark:from-[#565571]
        dark:to-[#565571]
        border border-[#615f7a] dark:bg-[#565571]'>
            <div className='banner-progress-title'>
                What do you do to <br/>
                use the API?
            </div>
            <div className='banner-progress-description'>
                It's very convenient and simple
            </div>
        </div>
    );
}

export default BannerProgress;