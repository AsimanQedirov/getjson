import React from 'react';
import {getAuth, GithubAuthProvider, signInWithPopup} from "@firebase/auth";
import githubSvg from 'assets/icons/github.svg';
import Image from "next/image";

const provider = new GithubAuthProvider()

const GithubLogin = () => {
    const handleGithubSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(res => {
                console.log('res => ', res)
            })
            .catch(error => {
                console.log(new Error(error))
            })
    }
    return (
        <button
            className={`
            bg-[#171515] 
            flex 
            items-center
             w-[290px] 
             px-[37px] 
             py-[12px] 
             text-[16px]
             font-[500]
             text-white
             rounded-[60px]`}
            onClick={handleGithubSignIn}>
            <Image
                className="inline-block mr-[16px]"
                src={githubSvg}
                alt="Picture of the author"
                layout={"fixed"}
            />
            Sign in with Github</button>
    );
}

export default GithubLogin;