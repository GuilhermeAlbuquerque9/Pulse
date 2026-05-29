const saveButton =
document.getElementById(
"saveSettings"
);

const language =
document.getElementById(
"language"
);

const notificationTime =
document.getElementById(
"notificationTime"
);

const clearHistory =
document.getElementById(
"clearHistory"
);

const resetPreferences =
document.getElementById(
"resetPreferences"
);

const enableNotifications =
document.getElementById(
"enableNotifications"
);

const disableNotifications =
document.getElementById(
"disableNotifications"
);


// CARREGAR

const preferences =

JSON.parse(
localStorage.getItem(
"retropixelPulsePreferences"
)
);

if(preferences){

language.value =
preferences.language;

notificationTime.value =
preferences.notificationTime;

}


// SALVAR

saveButton.addEventListener(
"click",
() => {

if(!preferences) return;

preferences.language =
language.value;

preferences.notificationTime =
notificationTime.value;

localStorage.setItem(

"retropixelPulsePreferences",

JSON.stringify(
preferences
)

);

alert(
"Configurações salvas!"
);

}
);


// LIMPAR HISTÓRICO

clearHistory.addEventListener(
"click",
() => {

if(
confirm(
"Deseja limpar o histórico?"
)
){

localStorage.removeItem(
"pulseHistory"
);

alert(
"Histórico removido."
);

}

}
);


// RESETAR

resetPreferences.addEventListener(
"click",
() => {

if(
confirm(
"Resetar tudo?"
)
){

localStorage.removeItem(
"retropixelPulsePreferences"
);

localStorage.removeItem(
"pulseHistory"
);

localStorage.removeItem(
"pulseLikes"
);

localStorage.removeItem(
"pulseDislikes"
);

window.location.href =
"index.html";

}

}
);


// NOTIFICAÇÕES

enableNotifications
.addEventListener(
"click",
async () => {

const permission =

await Notification
.requestPermission();

if(
permission ===
"granted"
){

alert(
"Notificações ativadas!"
);

}

}
);

disableNotifications
.addEventListener(
"click",
() => {

alert(
"Para bloquear notificações, use as permissões do navegador."
);

}
);