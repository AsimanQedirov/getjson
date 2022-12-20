import type {AppProps} from 'next/app';
import {useAppDispatch, wrapper} from "../app/store";
import '../app/assets/scss/style.scss'
import Header from "../app/components/utils/Header";
import Footer from "../app/components/utils/Footer";
import {useEffect} from "react";
import {AppSliceActions} from "../app/store/slices/app";
import '../app/axios/interceptor';
import Modal from "../app/components/reusable/Modal";

const App = ({Component, pageProps: {...pageProps}}: AppProps) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (localStorage.theme === "dark") {
            window.document.documentElement.classList.add("dark");
            dispatch(AppSliceActions.changeTheme('dark'));
        } else {
            window.document.documentElement.classList.remove("dark");
            dispatch(AppSliceActions.changeTheme('light'));
        }
    }, []);
    return <div className='bg-main-bg bg-gradient-to-b dark:from-[#323352FF] dark:to-[#51506DFF] relative'>
        <Modal/>
        <div className="container min-h-screen mx-auto relative">
            <Header/>
            <div className='pb-48'>
                <Component {...pageProps} />
            </div>
            <Footer/>
        </div>
    </div>

}
export default wrapper.withRedux(App);
