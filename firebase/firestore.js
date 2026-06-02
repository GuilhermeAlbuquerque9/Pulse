import { app }
from "./firebase-config.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    deleteDoc,
    collection,
    query,
    where,
    getDocs
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

export async function usernameExists(
    username
){

    const q = query(

        collection(
            db,
            "users"
        ),

        where(
            "username",
            "==",
            username
        )

    );

    const snapshot =
    await getDocs(q);

    return !snapshot.empty;

}

export async function deleteAccountData(
    uid
){

    const collections = [

        "likes",
        "dislikes",
        "history",
        "tokens"

    ];

    for(const collectionName of collections){

        const q = query(

            collection(
                db,
                collectionName
            ),

            where(
                "uid",
                "==",
                uid
            )

        );

        const snapshot =
        await getDocs(q);

        for(const document of snapshot.docs){

            await deleteDoc(
                document.ref
            );

        }

    }

    await deleteDoc(

        doc(
            db,
            "users",
            uid
        )

    );

}
