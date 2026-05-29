import { app }
from "./firebase-config.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const db =
getFirestore(app);

export async function saveUserPreferences(
    uid,
    preferences
){

    try{

        await setDoc(

            doc(
                db,
                "users",
                uid
            ),

            preferences

        );

        console.log(
            "✅ Preferências salvas"
        );

    }
    catch(error){

        console.error(error);

    }

}

export async function loadUserPreferences(
    uid
){

    try{

        const snapshot =

        await getDoc(

            doc(
                db,
                "users",
                uid
            )

        );

        if(snapshot.exists()){

            return snapshot.data();

        }

        return null;

    }
    catch(error){

        console.error(error);

        return null;

    }

}
