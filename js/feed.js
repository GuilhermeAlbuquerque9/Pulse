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


// ==========================
// FEED TEMPORÁRIO
// (será trocado pelo Firebase)
// ==========================

let newsList = [

{
title:"Nova IA impressiona usuários",
summary:"Ferramenta viraliza e chama atenção do mercado de tecnologia.",
url:"https://example.com"
},

{
title:"Roblox anuncia novidades",
summary:"Novos recursos para criadores chegam em breve.",
url:"https://example.com"
},

{
title:"Computadores retrô voltam à moda",
summary:"Estética dos anos 2000 cresce nas redes sociais.",
url:"https://example.com"
},

{
title:"Windows Vista inspira designers",
summary:"Frutiger Aero continua popular entre desenvolvedores.",
url:"https://example.com"
}

];


// ==========================
// RENDERIZAR FEED
// ==========================

function renderFeed(newsArray){

feed.innerHTML = "";

if(newsArray.length === 0){

feed.innerHTML = `
<div class="news-card">
<h3>Nenhuma notícia encontrada</h3>
<p>Tente outra pesquisa.</p>
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

<h3>${news.title}</h3>

<p>${news.summary}</p>

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

renderFeed(newsList);


// ==========================
// ABRIR NOTÍCIA
// ==========================

function openNews(news){

currentNews = news;

modalTitle.textContent =
news.title;

modalSummary.textContent =
news.summary;

modalLink.href =
news.url;

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
() => {

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
() => {

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

news.title
.toLowerCase()
.includes(query)

||

news.summary
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
() => {

renderFeed(newsList);

alert(
"🔄 Feed atualizado!"
);

}
);


// ==========================
// ABRIR VIA NOTIFICAÇÃO
// ==========================

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