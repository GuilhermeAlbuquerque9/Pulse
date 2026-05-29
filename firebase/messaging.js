import { app }
from "./firebase-config.js";

import {
    getMessaging,
    getToken
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging.js";

import {
    saveFCMToken
}
from "./tokens.js";

const messaging =
getMessaging(app);

export async function registerFCM(){

    try{

        const registration =

        await navigator
        .serviceWorker
        .register(
            "./firebase-messaging-sw.js"
        );

        console.log(
            "✅ Service Worker FCM registrado"
        );

        const token =

        await getToken(

            messaging,

            {

                vapidKey:
                "BIKU2Wu0xdPmXc3BOUTliDYYmZtNo9HRKggA5vLgVHDn7WEc8ljC4QEu6jKXu0XfBzDNGAfQkNWoorpyOA9gerY",

                serviceWorkerRegistration:
                registration

            }

        );

        if(token){

            console.log(
                "✅ FCM Token:"
            );

            console.log(
                token
            );

            localStorage.setItem(

                "pulseFCMToken",

                token

            );

            const uid =

            localStorage.getItem(
                "pulseUID"
            );

            if(uid){

                await saveFCMToken(
                    uid,
                    token
                );

                console.log(
                    "🔔 Token salvo"
                );

            }

            return token;

        }

        console.warn(
            "Nenhum token gerado."
        );

        return null;

    }
    catch(error){

        console.error(
            "Erro FCM:",
            error
        );

        return null;

    }

}
