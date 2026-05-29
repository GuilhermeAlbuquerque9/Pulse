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

export async function saveHistoryItem(
    uid,
    news
){

    try{

        await addDoc(

            collection(
                db,
                "history"
            ),

            {

                uid,

                title:
                news.title,

                summary:
                news.summary || "",

                url:
                news.url,

                createdAt:
                new Date()
                .toISOString()

            }

        );

        console.log(
            "📖 Histórico salvo"
        );

    }
    catch(error){

        console.error(
            error
        );

    }

}