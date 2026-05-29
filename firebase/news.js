import { app }
from "./firebase-config.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

const db =
getFirestore(app);

export async function saveNews(news){

    try{

        await addDoc(
            collection(db,"news"),
            news
        );

    }
    catch(error){

        console.error(error);

    }

}

export async function loadNews(){

    const snapshot =
    await getDocs(
        collection(db,"news")
    );

    const news = [];

    snapshot.forEach(doc => {

        news.push({
            id: doc.id,
            ...doc.data()
        });

    });

    return news;

}