import React from 'react';
import {FacebookAuthProvider, getAuth, signInWithPopup} from "@firebase/auth";
import facebookSvg from 'assets/icons/facebook.svg';
import Image from "next/image";

const provider = new FacebookAuthProvider().setCustomParameters({
    'display': 'popup'
});

const FacebookLogin = () => {

    const handleFacebookSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(res => {
                console.log('res => ', res)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <button
            className={`
            bg-[#4267B2] 
            flex 
            items-center
             w-[290px] 
             px-[37px] 
             py-[12px] 
             text-[16px]
             font-[500]
             text-white
             rounded-[60px]`}
            onClick={handleFacebookSignIn}>
            <Image
                className="inline-block mr-[16px]"
                src={facebookSvg}
                alt="Picture of the author"
                layout={"fixed"}
            />
            Sign in with Facebook</button>
    );
}

export default FacebookLogin;