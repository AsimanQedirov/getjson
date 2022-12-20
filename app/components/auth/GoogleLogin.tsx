import React from 'react';
import {getAuth, GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import googleSvg from 'assets/icons/google.svg';
import Image from "next/image";

const provider = new GoogleAuthProvider();

const GoogleLogin = () => {

    const handeGoogleSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(res => {
                console.log('res => ', res)
            })
    }
    return (
        <button
            className={`
            bg-white 
            flex 
            items-center
             w-[290px] 
             px-[48px] 
             py-[12px] 
             text-[16px]
             font-[500]
             rounded-[60px]`}
            onClick={handeGoogleSignIn}>
            <Image
                className="inline-block mr-[16px]"
                src={googleSvg}
                alt="Picture of the author"
            />
            Sign in with Google</button>
    );
}

export default GoogleLogin;