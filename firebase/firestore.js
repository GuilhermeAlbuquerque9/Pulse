import { app }
from "./firebase-config.js";

import {

getFirestore,
doc,
setDoc,
getDoc

}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const db =
getFirestore(app);

export async function savePreferences(
uid,
preferences
){

await setDoc(

doc(
db,
"users",
uid
),

preferences

);

}

export async function getPreferences(
uid
){

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