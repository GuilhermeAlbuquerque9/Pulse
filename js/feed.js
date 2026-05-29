import {
    loadRealNews
}
from "./news-loader.js";

import {
    saveLike,
    saveDislike
}
from "../firebase/feedback.js";

// ==========================
// RETROPIXEL PULSE™
// FEED.JS
// ==========================

const feed =
document.getElementById("newsFeed");

const searchInput =
document.getElementById("searchInput");

const refreshButton =
document.getElementById("refreshFeed");

const modal =
document.getElementById("newsModal");

const closeModal =
document.getElementById("closeModal");

const modalTitle =
document.getElementById("modalTitle");

const modalSummary =
document.getElementById("modalSummary");

const modalLink =
document.getElementById("modalLink");

const likeButton =
document.getElementById("likeButton");

const dislikeButton =
document.getElementById("dislikeButton");

let currentNews = null;

let newsList = [];


// ==========================
// CARREGAR FEED REAL
// ==========================

async function initializeFeed(){

    try{

        feed.innerHTML = `

        <div class="news-card">

            <h3>📡 Carregando notícias...</h3>

            <p>
                Buscando notícias mais recentes...
            </p>

        </div>

        `;

        newsList =
        await loadRealNews();

        renderFeed(newsList);

        const params =
        new URLSearchParams(
            window.location.search
        );

        const title =
        params.get("news");

        if(title){

            const found =
            newsList.find(news =>

                news.title === title

            );

            if(found){

                openNews(found);

            }

        }

    }
    catch(error){

        console.error(error);

        feed.innerHTML = `

        <div class="news-card">

            <h3>⚠️ Erro ao carregar</h3>

            <p>
                Não foi possível obter notícias.
            </p>

        </div>

        `;

    }

}


// ==========================
// RENDERIZAR FEED
// ==========================

function renderFeed(newsArray){

    feed.innerHTML = "";

    if(newsArray.length === 0){

        feed.innerHTML = `

        <div class="news-card">

            <h3>
                Nenhuma notícia encontrada
            </h3>

            <p>
                Tente outra pesquisa.
            </p>

        </div>

        `;

        return;

    }

    newsArray.forEach(news => {

        const card =
        document.createElement("div");

        card.className =
        "news-card";

        card.innerHTML = `

        <h3>
            ${news.title}
        </h3>

        <p>
            ${news.summary || "Sem resumo disponível."}
        </p>

        <button
        class="primary-btn read-btn">

            📖 Ler

        </button>

        `;

        card
        .querySelector(".read-btn")
        .addEventListener(
            "click",
            () => {

                openNews(news);

            }
        );

        feed.appendChild(card);

    });

}


// ==========================
// ABRIR NOTÍCIA
// ==========================

function openNews(news){

    currentNews = news;

    modalTitle.textContent =
    news.title;

    modalSummary.textContent =
    news.summary ||
    "Sem resumo disponível.";

    modalLink.href =
    news.url;

    modalLink.target =
    "_blank";

    modal.classList.remove(
        "hidden"
    );

    saveToHistory(news);

}


// ==========================
// FECHAR MODAL
// ==========================

closeModal.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "hidden"
        );

    }
);


// ==========================
// HISTÓRICO
// ==========================

function saveToHistory(news){

    let history =

    JSON.parse(
        localStorage.getItem(
            "pulseHistory"
        )
    ) || [];

    history.unshift({

        title:
        news.title,

        summary:
        news.summary,

        url:
        news.url,

        date:
        new Date()
        .toLocaleString()

    });

    history = history.slice(0,100);

    localStorage.setItem(

        "pulseHistory",

        JSON.stringify(
            history
        )

    );

}


// ==========================
// LIKE
// ==========================

likeButton.addEventListener(
    "click",
    async () => {

        if(!currentNews) return;

        let likes =

        JSON.parse(
            localStorage.getItem(
                "pulseLikes"
            )
        ) || [];

        likes.push(
            currentNews.title
        );

        localStorage.setItem(

            "pulseLikes",

            JSON.stringify(
                likes
            )

        );

        try{

            const uid =
            localStorage.getItem(
                "pulseUID"
            );

            if(uid){

                await saveLike(
                    uid,
                    currentNews
                );

            }

        }
        catch(error){

            console.error(error);

        }

        alert(
            "👍 Preferência salva!"
        );

    }
);


// ==========================
// DISLIKE
// ==========================

dislikeButton.addEventListener(
    "click",
    async () => {

        if(!currentNews) return;

        let dislikes =

        JSON.parse(
            localStorage.getItem(
                "pulseDislikes"
            )
        ) || [];

        dislikes.push(
            currentNews.title
        );

        localStorage.setItem(

            "pulseDislikes",

            JSON.stringify(
                dislikes
            )

        );

        try{

            const uid =
            localStorage.getItem(
                "pulseUID"
            );

            if(uid){

                await saveDislike(
                    uid,
                    currentNews
                );

            }

        }
        catch(error){

            console.error(error);

        }

        alert(
            "👎 Preferência salva!"
        );

    }
);


// ==========================
// BUSCA
// ==========================

searchInput.addEventListener(
    "input",
    () => {

        const query =

        searchInput.value
        .toLowerCase();

        const filtered =

        newsList.filter(news =>

            (news.title || "")
            .toLowerCase()
            .includes(query)

            ||

            (news.summary || "")
            .toLowerCase()
            .includes(query)

        );

        renderFeed(filtered);

    }
);


// ==========================
// ATUALIZAR FEED
// ==========================

refreshButton.addEventListener(
    "click",
    async () => {

        refreshButton.disabled = true;

        refreshButton.textContent =
        "⏳ Atualizando...";

        try{

            newsList =
            await loadRealNews();

            renderFeed(newsList);

            alert(
                "🔄 Feed atualizado!"
            );

        }
        catch(error){

            console.error(error);

            alert(
                "Erro ao atualizar notícias."
            );

        }

        refreshButton.disabled = false;

        refreshButton.textContent =
        "🔄 Atualizar";

    }
);


// ==========================
// INICIAR
// ==========================

initializeFeed();
