import React from 'react';
import {getAuth, GithubAuthProvider, signInWithPopup} from "@firebase/auth";
import Image from "next/image";

const provider = new GithubAuthProvider()

const GithubLogin = ({size}: { size: string }) => {
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
             w-${size ?? '[290px]'} 
              justify-center
             px-[37px] 
             py-[12px] 
             text-[16px]
             font-[500]
             text-white
             rounded-[60px]`}
            onClick={handleGithubSignIn}>
            <Image
                className="inline-block mr-[16px]"

                src={'/assets/icons/github.svg'} width={21} height={22}
                alt="Picture of the author"
                layout={"fixed"}
            />
            Sign in with Github</button>
    );
}

export default GithubLogin;
