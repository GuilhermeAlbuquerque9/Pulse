import {
    anonymousLogin
}
from "./auth.js";

import {
    saveUserPreferences,
    loadUserPreferences,
    usernameExists
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

export async function isUsernameAvailable(
    username
){

    return !(await usernameExists(
        username
    ));

}

export async function savePreferencesToCloud(
    preferences
){

    const uid =
    localStorage.getItem(
        "pulseUID"
    );

    if(!uid){

        return;

    }

    const username =
    localStorage.getItem(
        "pulseUsername"
    );

    const data = {

        uid,

        username,

        ...preferences

    };

    await saveUserPreferences(
        uid,
        data
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
