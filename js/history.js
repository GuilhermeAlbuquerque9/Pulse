const container =
document.getElementById(
"historyContainer"
);

const clearButton =
document.getElementById(
"clearHistory"
);

function loadHistory(){

const history =

JSON.parse(
localStorage.getItem(
"pulseHistory"
)
) || [];

container.innerHTML = "";

if(history.length === 0){

container.innerHTML = `

<div class="news-card">

<h3>
Nenhuma notícia aberta
</h3>

<p>
Seu histórico está vazio.
</p>

</div>

`;

return;

}

history.forEach(item => {

const card =
document.createElement("div");

card.className =
"news-card";

card.innerHTML = `

<h3>
${item.title}
</h3>

<p>
${item.summary}
</p>

<p>
🕒 ${item.date}
</p>

<a
href="${item.url}"
target="_blank">

🔗 Abrir notícia

</a>

`;

container.appendChild(
card
);

});

}

loadHistory();

clearButton.addEventListener(
"click",
() => {

if(
confirm(
"Limpar histórico?"
)
){

localStorage.removeItem(
"pulseHistory"
);

loadHistory();

}

}
);