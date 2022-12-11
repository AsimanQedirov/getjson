import initializeAuthentication from "../app/config/firebase.init";
import Banner from "../app/components/common/Banner";
import BannerProgress from "../app/components/common/BannerProgress";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppSliceActions} from "../app/store/slices/app";
import {useAppDispatch} from "../app/store";

initializeAuthentication();  /*initialize auth*/

export default function Home() {
    return (
        <div className='animate-[contentLoad_1s_ease-in-out]'>
            <Banner/>
            <BannerProgress/>
        </div>
    )
}

