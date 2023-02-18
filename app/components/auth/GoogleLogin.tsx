import React, {useEffect} from 'react';
import {GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import Image from "next/image";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../config/firebase.init";
import {useAppDispatch} from "../../store";
import {AuthSliceActions} from "../../store/slices/auth";
import {useRegisterMutation} from "../../store/auth/auth.api";
import {Auth} from "../../helper/auth";
import {useRouter} from "next/router";


const provider = new GoogleAuthProvider();

const GoogleLogin = ({size}: { size: string }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [user, setUser] = useAuthState(auth);
    const [register, {data, isSuccess, isLoading, isError}] = useRegisterMutation();
    const handeGoogleSignIn = async () => {
        signInWithPopup(auth, provider)
            .then(res => {
                console.log('res => ', res)
            })
    }
    const registerWithGoogle = ({displayName, email, accessToken}: any) => {
        const data = {
            name: displayName,
            email,
            access_token: accessToken,
            // oauth_token: _tokenResponse.oauthAccessToken
        };
        register(data);
    }
    useEffect(() => {
        if (user) {
            registerWithGoogle(user);
        }
    }, [user]);

    useEffect(() => {
        if (isSuccess && data) {
            Auth.login({
                access_token: data.authorization.token,
                userData: data.user
            }, dispatch, router)
            dispatch(AuthSliceActions.loggedIn());
        }
    }, [isSuccess]);

    return (
        <button
            className={`
            bg-white 
            flex 
            items-center
             w-${size ?? '[290px]'} 
             px-[48px] 
             py-[12px] 
             text-[16px]
             font-[500]
             ${size ? 'border' : ''}
             justify-center
             rounded-[60px]`}
            onClick={handeGoogleSignIn}>
            <Image
                className="inline-block mr-[16px]"
                src={'/assets/icons/google.svg'} width={21} height={22}
                alt="Picture of the author"
            />
            Sign in with Google</button>
    );
}

export default GoogleLogin;
