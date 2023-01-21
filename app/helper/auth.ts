import {NextRouter} from "next/router";
import {AppDispatch} from "../store";
import {setCookie} from "cookies-next";
import {AuthSliceActions} from "../store/slices/auth";

export class Auth {

    static login = (userCredentials: any, dispatcher: AppDispatch, router: NextRouter) => {
        setCookie('access_token', userCredentials.access_token);
        setCookie('user' , JSON.stringify(userCredentials.userData));
        dispatcher(AuthSliceActions.loggedIn())
        router.push('/projects');
    }

}
