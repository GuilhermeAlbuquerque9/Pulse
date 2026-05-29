import { app }
from "./firebase-config.js";

import {
    getFirestore,
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const db =
getFirestore(app);

export async function saveLike(
    uid,
    news
){

    try{

        await addDoc(

            collection(
                db,
                "likes"
            ),

            {

                uid,

                title:
                news.title,

                url:
                news.url,

                createdAt:
                new Date()
                .toISOString()

            }

        );

        console.log(
            "👍 Like salvo"
        );

    }
    catch(error){

        console.error(error);

    }

}

export async function saveDislike(
    uid,
    news
){

    try{

        await addDoc(

            collection(
                db,
                "dislikes"
            ),

            {

                uid,

                title:
                news.title,

                url:
                news.url,

                createdAt:
                new Date()
                .toISOString()

            }

        );

        console.log(
            "👎 Dislike salvo"
        );

    }
    catch(error){

        console.error(error);

    }

}