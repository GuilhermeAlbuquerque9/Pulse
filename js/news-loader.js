import {
    fetchAllRSS
}
from "./rss.js";

export async function loadRealNews(){

    const rssItems =
    await fetchAllRSS();

    // Agrupa por fonte
    const sourceMap =
    {};

    rssItems.forEach(item => {

        const source =

        item.source ||

        item.feed ||

        item.creator ||

        "Desconhecida";

        if(
            !sourceMap[source]
        ){

            sourceMap[source] =
            [];

        }

        // Máximo 3 notícias por fonte

        if(

            sourceMap[source]
            .length < 3

        ){

            sourceMap[source]
            .push(item);

        }

    });

    // Junta tudo novamente

    const filteredNews =

    Object.values(
        sourceMap
    ).flat();

    // Ordena por data
    // (mais recentes primeiro)

    filteredNews.sort(
        (a,b) =>

        new Date(
            b.pubDate || 0
        )

        -

        new Date(
            a.pubDate || 0
        )
    );

    return filteredNews.map(item => ({

        title:
        item.title,

        summary:

        item.description

        ?.replace(
            /<[^>]*>/g,
            ""
        )

        ?.substring(
            0,
            300
        )

        ||

        "Sem resumo disponível.",

        url:
        item.link,

        date:
        item.pubDate,

        image:
        item.thumbnail || "",

        source:

        item.source ||

        item.feed ||

        item.creator ||

        "Desconhecida"

    }));

}
