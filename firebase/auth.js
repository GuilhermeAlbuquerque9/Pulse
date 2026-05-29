import { app }
from "./firebase-config.js";

import {
    getAuth,
    signInAnonymously
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const auth =
getAuth(app);

export async function anonymousLogin(){

    try{

        const result =
        await signInAnonymously(auth);

        console.log(
            "Usuário anônimo:",
            result.user.uid
        );

        return result.user;

    }
    catch(error){

        console.error(error);
    }

}
