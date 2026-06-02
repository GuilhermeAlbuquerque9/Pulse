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


// ==========================
// SALVAR PREFERÊNCIAS
// ==========================

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

        console.error(
            error
        );

    }

}


// ==========================
// CARREGAR PREFERÊNCIAS
// ==========================

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

        if(
            snapshot.exists()
        ){

            return snapshot.data();

        }

        return null;

    }
    catch(error){

        console.error(
            error
        );

        return null;

    }

}


// ==========================
// USERNAME JÁ EXISTE?
// ==========================

export async function usernameExists(
    username
){

    try{

        const q =

        query(

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
    catch(error){

        console.error(
            error
        );

        return false;

    }

}


// ==========================
// EXCLUIR CONTA
// ==========================

export async function deleteAccountData(
    uid
){

    try{

        // USERS

        await deleteDoc(

            doc(
                db,
                "users",
                uid
            )

        );

        // COLEÇÕES RELACIONADAS

        const collections = [

            "likes",

            "dislikes",

            "history",

            "tokens"

        ];

        for(
            const collectionName
            of
            collections
        ){

            const q =

            query(

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

            for(
                const document
                of
                snapshot.docs
            ){

                await deleteDoc(
                    document.ref
                );

            }

        }

        console.log(
            "🗑️ Conta removida"
        );

    }
    catch(error){

        console.error(
            error
        );

        throw error;

    }

}


// ==========================
// LIMPAR HISTÓRICO
// ==========================

export async function clearUserHistory(
    uid
){

    try{

        const q =

        query(

            collection(
                db,
                "history"
            ),

            where(
                "uid",
                "==",
                uid
            )

        );

        const snapshot =

        await getDocs(q);

        for(
            const document
            of
            snapshot.docs
        ){

            await deleteDoc(
                document.ref
            );

        }

        console.log(
            "📖 Histórico removido"
        );

    }
    catch(error){

        console.error(
            error
        );

    }

}
