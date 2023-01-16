import initializeAuthentication from "../app/config/firebase.init";
import Banner from "../app/components/utils/Banner";
import BannerProgress from "../app/components/utils/BannerProgress";
import {GetServerSideProps, NextPage} from "next";
import {useAppDispatch, useAppSelector, wrapper} from "../app/store";
import {useRouter} from "next/router";
initializeAuthentication();  /*initialize auth*/

const Home: NextPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const {isAuth} = useAppSelector(state => state.authSlice);

    return (
        <div
            // className='animate-[contentLoad_1s_ease-in-out]'
        >
            <Banner/>
            <BannerProgress/>
        </div>
    )
}
export default Home;

export const getServerSideProps: GetServerSideProps =
    wrapper.getServerSideProps(store => async (context,) => {
        if (context.req.cookies.access_token)
            return {
                redirect: {
                    destination: '/projects'
                },
                props: {}
            }
        return {
            props: {}
        }
    });

