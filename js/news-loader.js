import {
    fetchAllRSS
}
from "./rss.js";

export async function loadRealNews(){

    const news =
    await fetchAllRSS();

    return news.map(item => ({

        title:
        item.title,

        summary:
        item.description
        ?.replace(/<[^>]*>/g,"")
        ?.substring(0,300),

        url:
        item.link,

        date:
        item.pubDate,

        image:
        item.thumbnail || ""

    }));

}