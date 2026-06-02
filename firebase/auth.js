import { app }
from "./firebase-config.js";

import {

    getAuth,

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged

}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

const auth =
getAuth(app);

// ==========================
// CRIAR CONTA
// ==========================

export async function registerUser(
    email,
    password
){

    try{

        const result =

        await createUserWithEmailAndPassword(

            auth,

            email,

            password

        );

        console.log(
            "Conta criada:",
            result.user.uid
        );

        return result.user;

    }
    catch(error){

        console.error(
            error
        );

        throw error;

    }

}

// ==========================
// LOGIN
// ==========================

export async function loginUser(
    email,
    password
){

    try{

        const result =

        await signInWithEmailAndPassword(

            auth,

            email,

            password

        );

        console.log(
            "Login realizado:",
            result.user.uid
        );

        return result.user;

    }
    catch(error){

        console.error(
            error
        );

        throw error;

    }

}

// ==========================
// LOGOUT
// ==========================

export async function logoutUser(){

    try{

        await signOut(
            auth
        );

        console.log(
            "Logout realizado."
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
// USUÁRIO ATUAL
// ==========================

export function getCurrentUser(){

    return auth.currentUser;

}

// ==========================
// OBSERVAR LOGIN
// ==========================

export function watchAuthState(
    callback
){

    return onAuthStateChanged(

        auth,

        user => {

            callback(
                user
            );

        }

    );

}
