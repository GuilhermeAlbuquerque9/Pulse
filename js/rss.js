// ==========================
// RETROPIXEL PULSE™
// RSS.JS
// ==========================

// FEEDS RSS

const RSS_FEEDS = {

    techcrunch:
    "https://techcrunch.com/feed/",

    verge:
    "https://www.theverge.com/rss/index.xml",

    polygon:
    "https://www.polygon.com/rss/index.xml",

    reuters:
    "https://feeds.reuters.com/reuters/technologyNews",

    bbc:
    "https://feeds.bbci.co.uk/news/technology/rss.xml"

};


// ==========================
// CONVERSOR RSS → JSON
// ==========================

const RSS_TO_JSON =

"https://api.rss2json.com/v1/api.json?rss_url=";


// ==========================
// BUSCAR UM FEED
// ==========================

export async function fetchRSSFeed(url){

    try{

        const response =
        await fetch(

            RSS_TO_JSON +
            encodeURIComponent(url)

        );

        const data =
        await response.json();

        return data.items || [];

    }
    catch(error){

        console.error(
            "Erro RSS:",
            error
        );

        return [];

    }

}


// ==========================
// BUSCAR TODOS OS FEEDS
// ==========================

export async function fetchAllRSS(selectedSources = []){

    let allNews = [];

    const sourceMap = {

        "TechCrunch":
        RSS_FEEDS.techcrunch,

        "The Verge":
        RSS_FEEDS.verge,

        "Polygon":
        RSS_FEEDS.polygon,

        "Reuters":
        RSS_FEEDS.reuters,

        "BBC":
        RSS_FEEDS.bbc

    };

    const feedsToLoad =

    selectedSources.length > 0

    ? selectedSources

    : Object.keys(sourceMap);

    for(const source of feedsToLoad){

        const feedUrl =
        sourceMap[source];

        if(!feedUrl){

            continue;

        }

        const news =
        await fetchRSSFeed(
            feedUrl +
            "?t=" +
            Date.now()
        );

        news.forEach(item => {

            item.source =
            source;

        });

        allNews =
        allNews.concat(news);

    }

    return allNews;

}
