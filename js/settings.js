import {
    deleteAccountData
}
from "../firebase/firestore.js";

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

const deleteAccount =
document.getElementById(
"deleteAccount"
);

const enableNotifications =
document.getElementById(
"enableNotifications"
);

const disableNotifications =
document.getElementById(
"disableNotifications"
);

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

resetPreferences.addEventListener(
"click",
() => {

if(
confirm(
"Resetar tudo?"
)
){

localStorage.clear();

window.location.href =
"index.html";

}

}
);

deleteAccount.addEventListener(
"click",
async () => {

const confirmation =
confirm(
"Excluir sua conta permanentemente?"
);

if(!confirmation){

return;

}

try{

const uid =

localStorage.getItem(
"pulseUID"
);

if(uid){

await deleteAccountData(
uid
);

}

localStorage.clear();

alert(
"Conta excluída."
);

window.location.href =
"index.html";

}
catch(error){

console.error(error);

alert(
"Erro ao excluir conta."
);

}

}
);

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
"Use as permissões do navegador para bloquear notificações."
);

}
);
