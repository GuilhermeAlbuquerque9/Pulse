import {
    registerFCM
}
from "../firebase/messaging.js";

import {
    registerUser,
    loginUser,
    watchAuthState
}
from "../firebase/auth.js";

import {
    savePreferencesToCloud,
    isUsernameAvailable,
    loadPreferencesFromCloud
}
from "../firebase/user.js";


// ==========================
// LOGIN
// ==========================

const authSection =
document.getElementById(
    "authSection"
);

const preferencesSection =
document.getElementById(
    "preferencesSection"
);

const emailInput =
document.getElementById(
    "email"
);

const passwordInput =
document.getElementById(
    "password"
);

const confirmPasswordInput =
document.getElementById(
    "confirmPassword"
);

const registerButton =
document.getElementById(
    "registerButton"
);

const loginButton =
document.getElementById(
    "loginButton"
);


// ==========================
// PREFERÊNCIAS
// ==========================

const chips =
document.querySelectorAll(
    ".chip"
);

const days =
document.querySelectorAll(
    ".day"
);

const saveButton =
document.getElementById(
    "savePreferences"
);

const notificationButton =
document.getElementById(
    "enableNotifications"
);

const languageSelect =
document.getElementById(
    "language"
);

const timeInput =
document.getElementById(
    "notificationTime"
);

const usernameInput =
document.getElementById(
    "username"
);


// ==========================
// AUTH STATE
// ==========================

watchAuthState(
    async user => {

        if(!user){

            authSection.style.display =
            "block";

            preferencesSection.style.display =
            "none";

            return;

        }

        localStorage.setItem(
            "pulseUID",
            user.uid
        );

        try{

            const cloudPreferences =
            await loadPreferencesFromCloud();

            if(
                cloudPreferences &&
                cloudPreferences.username
            ){

                localStorage.setItem(

                    "retropixelPulsePreferences",

                    JSON.stringify(
                        cloudPreferences
                    )

                );

                localStorage.setItem(
                    "pulseUsername",
                    cloudPreferences.username
                );

                window.location.href =
                "feed.html";

                return;

            }

        }
        catch(error){

            console.error(
                error
            );

        }

        authSection.style.display =
        "none";

        preferencesSection.style.display =
        "block";

    }
);


// ==========================
// CRIAR CONTA
// ==========================

registerButton.addEventListener(
    "click",
    async () => {

        const email =
        emailInput.value.trim();

        const password =
        passwordInput.value;

        const confirmPassword =
        confirmPasswordInput.value;

        if(email === ""){

            alert(
                "Digite um e-mail."
            );

            return;

        }

        if(password.length < 6){

            alert(
                "A senha deve ter pelo menos 6 caracteres."
            );

            return;

        }

        if(
            password !==
            confirmPassword
        ){

            alert(
                "As senhas não coincidem."
            );

            return;

        }

        try{

            await registerUser(
                email,
                password
            );

            alert(
                "Conta criada com sucesso!"
            );

        }
        catch(error){

            alert(
                error.message
            );

        }

    }
);


// ==========================
// LOGIN
// ==========================

loginButton.addEventListener(
    "click",
    async () => {

        const email =
        emailInput.value.trim();

        const password =
        passwordInput.value;

        if(
            email === "" ||
            password === ""
        ){

            alert(
                "Preencha e-mail e senha."
            );

            return;

        }

        try{

            await loginUser(
                email,
                password
            );

        }
        catch(error){

            alert(
                "Falha ao entrar."
            );

            console.error(
                error
            );

        }

    }
);


// ==========================
// CHIPS
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
// DIAS
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

        if(
            !("Notification" in window)
        ){

            alert(
                "Seu navegador não suporta notificações."
            );

            return;

        }

        const permission =

        await Notification
        .requestPermission();

        if(
            permission ===
            "granted"
        ){

            try{

                await registerFCM();

                notificationButton.textContent =
                "✅ Notificações ativadas";

                notificationButton.disabled =
                true;

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

    }
);


// ==========================
// SALVAR PREFERÊNCIAS
// ==========================

saveButton.addEventListener(
    "click",
    async () => {

        const username =
        usernameInput.value.trim();

        if(username === ""){

            alert(
                "Escolha um nome de usuário."
            );

            return;

        }

        const available =

        await isUsernameAvailable(
            username
        );

        if(!available){

            alert(
                "Este nome de usuário já está em uso."
            );

            return;

        }

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
        .querySelectorAll(
            ".chip.selected"
        )
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
        .querySelectorAll(
            ".day.selected"
        )
        .forEach(day => {

            selectedDays.push(
                day.textContent.trim()
            );

        });

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
            timeInput.value === ""
        ){

            alert(
                "Escolha um horário."
            );

            return;

        }

        const preferences = {

            username,

            language:
            languageSelect.value,

            themes:
            selectedThemes,

            sources:
            selectedSources,

            days:
            selectedDays,

            notificationTime:
            timeInput.value,

            notificationsEnabled:

            Notification.permission ===
            "granted",

            createdAt:

            new Date()
            .toISOString()

        };

        localStorage.setItem(

            "pulseUsername",

            username

        );

        localStorage.setItem(

            "retropixelPulsePreferences",

            JSON.stringify(
                preferences
            )

        );

        try{

            await savePreferencesToCloud(
                preferences
            );

            alert(
                "Preferências salvas!"
            );

            window.location.href =
            "feed.html";

        }
        catch(error){

            console.error(
                error
            );

            alert(
                "Erro ao salvar preferências."
            );

        }

    }
);
