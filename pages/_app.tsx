import type {AppProps} from 'next/app';
import {useAppDispatch, useAppSelector, wrapper} from "../app/store";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import '../public/assets/scss/style.scss'
import Header from "../app/components/utils/Header";
import Footer from "../app/components/utils/Footer";
import {useEffect} from "react";
import {AppSliceActions} from "../app/store/slices/app";
import '../app/axios/interceptor';
import {ChakraProvider} from "@chakra-ui/react";
import localfont from "@next/font/local";
import {useRouter} from "next/router";

const montserrat = localfont({src: '../public/assets/fonts/Montserrat-Regular.ttf'})
const App = ({Component, pageProps: {...pageProps}}: AppProps) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const isAuth = useAppSelector(state => state.authSlice.isAuth);

    useEffect(() => {
        if (localStorage.theme === "dark") {
            window.document.documentElement.classList.add("dark");
            dispatch(AppSliceActions.changeTheme('dark'));
        } else {
            window.document.documentElement.classList.remove("dark");
            dispatch(AppSliceActions.changeTheme('light'));
        }
    }, []);


    useEffect(() => {
        if (isAuth) {
            router.push('/projects');
        }
    }, [isAuth]);

    // if (!isAuth && path !== '/') {
    //     router.push('/');
    //     return;
    // }

    return <main className={montserrat.className}>
        <div className='bg-main-bg bg-gradient-to-b dark:from-[#323352FF] dark:to-[#51506DFF] relative'>
            <ChakraProvider>
                <div className="container min-h-screen mx-auto relative">
                    <Header/>
                    <div className='pb-48'>
                        <Component {...pageProps} />
                    </div>
                    <Footer/>
                </div>
            </ChakraProvider>
        </div>
    </main>


}
export default wrapper.withRedux(App);
