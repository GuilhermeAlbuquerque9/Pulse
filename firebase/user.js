import {
    anonymousLogin
}
from "./auth.js";

import {
    saveUserPreferences,
    loadUserPreferences
}
from "./firestore.js";

export async function initializeUser(){

    const user =
    await anonymousLogin();

    if(!user){

        console.error(
            "Falha ao criar usuário."
        );

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

export async function savePreferencesToCloud(
    preferences
){

    const uid =
    localStorage.getItem(
        "pulseUID"
    );

    if(!uid){

        console.error(
            "UID não encontrado."
        );

        return;

    }

    await saveUserPreferences(
        uid,
        preferences
    );

}

export async function loadPreferencesFromCloud(){

    const uid =
    localStorage.getItem(
        "pulseUID"
    );

    if(!uid){

        return null;

    }

    return await loadUserPreferences(
        uid
    );

}
