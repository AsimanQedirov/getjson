import {initializeApp} from "@firebase/app";
import {firebaseConfig} from "./firebase.config";
import {getAuth} from "@firebase/auth";
import {getDatabase} from "@firebase/database";

const initializeAuthentication = () => {
    initializeApp(firebaseConfig)
}
export const auth = getAuth(initializeApp(firebaseConfig));
export default initializeAuthentication;




