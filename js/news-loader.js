import {
    fetchAllRSS
}
from "./rss.js";

export async function loadRealNews(){

    const preferences =

    JSON.parse(

        localStorage.getItem(
            "retropixelPulsePreferences"
        )

    ) || {};

    const selectedSources =

    preferences.sources || [];

    const rssItems =

    await fetchAllRSS(
        selectedSources
    );

    const sourceMap = {};

    rssItems.forEach(item => {

        const source =
        item.source ||
        "Desconhecida";

        if(
            !sourceMap[source]
        ){

            sourceMap[source] = [];

        }

        if(
            sourceMap[source]
            .length < 3
        ){

            sourceMap[source]
            .push(item);

        }

    });

    const filteredNews =

    Object.values(
        sourceMap
    ).flat();

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
        item.source

    }));

}
