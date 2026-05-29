import { app } from "./firebase-config.js";

import {
    getMessaging,
    getToken
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging.js";

const messaging =
getMessaging(app);

export async function registerFCM(){

    try{

        const token =
        await getToken(
            messaging,
            {
                vapidKey:
                "BIKU2Wu0xdPmXc3BOUTliDYYmZtNo9HRKggA5vLgVHDn7WEc8ljC4QEu6jKXu0XfBzDNGAfQkNWoorpyOA9gerY"
            }
        );

        if(token){

            console.log(
                "✅ FCM Token:"
            );

            console.log(token);

            localStorage.setItem(
                "pulseFCMToken",
                token
            );

            return token;

        }

        console.warn(
            "Nenhum token gerado."
        );

    }
    catch(error){

        console.error(
            "Erro FCM:",
            error
        );

    }

}
