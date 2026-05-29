import { app }
from "./firebase-config.js";

import {
    getFirestore,
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const db =
getFirestore(app);

export async function saveFCMToken(
    uid,
    token
){

    try{

        await addDoc(

            collection(
                db,
                "tokens"
            ),

            {

                uid,

                token,

                createdAt:
                new Date()
                .toISOString()

            }

        );

        console.log(
            "🔔 Token salvo"
        );

    }
    catch(error){

        console.error(
            error
        );

    }

}