import {
    registerFCM
}
from "../firebase/messaging.js";

import {
    initializeUser,
    savePreferencesToCloud
}
from "../firebase/user.js";

// ==========================
// RETROPIXEL PULSE™
// APP.JS
// ==========================

// ELEMENTOS

const chips =
document.querySelectorAll(".chip");

const days =
document.querySelectorAll(".day");

const saveButton =
document.getElementById("savePreferences");

const notificationButton =
document.getElementById("enableNotifications");

const languageSelect =
document.getElementById("language");

const timeInput =
document.getElementById("notificationTime");


// ==========================
// INICIALIZAÇÃO
// ==========================

window.addEventListener(
    "load",
    async () => {

        try{

            await initializeUser();

        }
        catch(error){

            console.error(
                "Erro ao inicializar usuário:",
                error
            );

        }

        if ("serviceWorker" in navigator) {

            try {

                const registration =
                await navigator.serviceWorker.register(
                    "./firebase-messaging-sw.js"
                );

                console.log(
                    "✅ Service Worker registrado!",
                    registration
                );

            }
            catch(error){

                console.error(
                    "❌ Erro ao registrar Service Worker:",
                    error
                );

            }

        }

        loadPreferences();

    }
);


// ==========================
// SELEÇÃO DE CHIPS
// ==========================

chips.forEach(chip => {

    chip.addEventListener(
        "click",
        () => {

            chip.classList.toggle(
                "selected"
            );

        }
    );

});


// ==========================
// SELEÇÃO DE DIAS
// ==========================

days.forEach(day => {

    day.addEventListener(
        "click",
        () => {

            day.classList.toggle(
                "selected"
            );

        }
    );

});


// ==========================
// NOTIFICAÇÕES
// ==========================

notificationButton.addEventListener(
    "click",
    async () => {

        if(!("Notification" in window)){

            alert(
                "Seu navegador não suporta notificações."
            );

            return;

        }

        const permission =
        await Notification.requestPermission();

        if(permission === "granted"){

            notificationButton.textContent =
            "✅ Notificações ativadas";

            notificationButton.disabled =
            true;

            try{

                await registerFCM();

            }
            catch(error){

                console.error(
                    error
                );

            }

            try {

                new Notification(
                    "Retropixel Pulse™",
                    {
                        body:
                        "Notificações ativadas com sucesso!"
                    }
                );

            }
            catch(error){

                console.error(
                    error
                );

            }

        }
        else{

            alert(
                "Permissão negada."
            );

        }

    }
);


// ==========================
// SALVAR PREFERÊNCIAS
// ==========================

saveButton.addEventListener(
    "click",
    async () => {

        const selectedThemes = [];
        const selectedSources = [];
        const selectedDays = [];

        const sourceNames = [

            "BBC",
            "CNN",
            "Reuters",
            "TechCrunch",
            "The Verge",
            "IGN",
            "Polygon",
            "g1",
            "Olhar Digital"

        ];

        document
        .querySelectorAll(".chip.selected")
        .forEach(chip => {

            const text =
            chip.textContent.trim();

            if(
                sourceNames.includes(
                    text
                )
            ){

                selectedSources.push(
                    text
                );

            }
            else{

                selectedThemes.push(
                    text
                );

            }

        });

        document
        .querySelectorAll(".day.selected")
        .forEach(day => {

            selectedDays.push(
                day.textContent.trim()
            );

        });

        const language =
        languageSelect.value;

        const notificationTime =
        timeInput.value;

        // VALIDAÇÕES

        if(
            selectedThemes.length === 0
        ){

            alert(
                "Escolha pelo menos um tema."
            );

            return;

        }

        if(
            selectedSources.length === 0
        ){

            alert(
                "Escolha pelo menos uma fonte."
            );

            return;

        }

        if(
            selectedDays.length === 0
        ){

            alert(
                "Escolha pelo menos um dia."
            );

            return;

        }

        if(
            notificationTime === ""
        ){

            alert(
                "Escolha um horário."
            );

            return;

        }

        const preferences = {

            language,

            themes:
            selectedThemes,

            sources:
            selectedSources,

            days:
            selectedDays,

            notificationTime,

            notificationsEnabled:
            Notification.permission ===
            "granted",

            createdAt:
            new Date()
            .toISOString()

        };

        // LOCAL STORAGE

        localStorage.setItem(

            "retropixelPulsePreferences",

            JSON.stringify(
                preferences
            )

        );

        // FIRESTORE

        try{

            await savePreferencesToCloud(
                preferences
            );

            console.log(
                "✅ Preferências salvas na nuvem"
            );

        }
        catch(error){

            console.error(
                "Erro ao salvar no Firestore:",
                error
            );

        }

        console.log(
            "Preferências:",
            preferences
        );

        alert(
            "Preferências salvas!"
        );

        window.location.href =
        "feed.html";

    }
);


// ==========================
// CARREGAR PREFERÊNCIAS
// ==========================

function loadPreferences(){

    const saved =

    localStorage.getItem(
        "retropixelPulsePreferences"
    );

    if(!saved){

        return;

    }

    const preferences =
    JSON.parse(saved);

    languageSelect.value =
    preferences.language;

    timeInput.value =
    preferences.notificationTime;

    document
    .querySelectorAll(".chip")
    .forEach(chip => {

        const text =
        chip.textContent.trim();

        if(

            preferences.themes.includes(
                text
            )

            ||

            preferences.sources.includes(
                text
            )

        ){

            chip.classList.add(
                "selected"
            );

        }

    });

    document
    .querySelectorAll(".day")
    .forEach(day => {

        const text =
        day.textContent.trim();

        if(

            preferences.days.includes(
                text
            )

        ){

            day.classList.add(
                "selected"
            );

        }

    });

    if(

        Notification.permission ===
        "granted"

    ){

        notificationButton.textContent =
        "✅ Notificações ativadas";

        notificationButton.disabled =
        true;

    }

}
