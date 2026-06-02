import {

    getCurrentUser

}
from "./auth.js";

import {

    saveUserPreferences,

    loadUserPreferences,

    usernameExists

}
from "./firestore.js";


// ==========================
// USUÁRIO ATUAL
// ==========================

export async function initializeUser(){

    const user =
    getCurrentUser();

    if(!user){

        return null;

    }

    localStorage.setItem(

        "pulseUID",

        user.uid

    );

    console.log(
        "UID:",
        user.uid
    );

    return user.uid;

}


// ==========================
// VERIFICAR USERNAME
// ==========================

export async function isUsernameAvailable(
    username
){

    if(!username){

        return false;

    }

    const exists =

    await usernameExists(
        username
    );

    return !exists;

}


// ==========================
// SALVAR NA NUVEM
// ==========================

export async function savePreferencesToCloud(
    preferences
){

    const user =
    getCurrentUser();

    if(!user){

        console.error(
            "Usuário não autenticado."
        );

        return;

    }

    const data = {

        uid:
        user.uid,

        email:
        user.email,

        ...preferences

    };

    await saveUserPreferences(

        user.uid,

        data

    );

}


// ==========================
// CARREGAR DA NUVEM
// ==========================

export async function loadPreferencesFromCloud(){

    const user =
    getCurrentUser();

    if(!user){

        return null;

    }

    return await loadUserPreferences(
        user.uid
    );

}


// ==========================
// DADOS DO USUÁRIO
// ==========================

export function getUserData(){

    const user =
    getCurrentUser();

    if(!user){

        return null;

    }

    return {

        uid:
        user.uid,

        email:
        user.email

    };

}
