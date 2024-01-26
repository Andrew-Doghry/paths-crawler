const { JSDOM } = require("jsdom")
async function crawlPage(baseUrl, currentURL, pages) {
    const baseURLObj = new URL(baseUrl)
    const currentURLObj = new URL(currentURL)
    if (baseURLObj.hostname !== currentURLObj.hostname) {//the base case 
        return pages//won't crawl other urls only ones related to the target site
    }
    const normalizedCurrentURl = normalizeURL(currentURL)
    if (pages[normalizedCurrentURl] > 0) {//the final base case 
        pages[normalizedCurrentURl]++;
        return pages
    }
    pages[normalizedCurrentURl] = 1;
    console.log(`actively crawling ${currentURL}`)
    let resp;
    try {
        resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`error in fetch with status code ${resp.status} on page ${currentURL}`)
            return pages
        }
        // if not html page won't insert that sub url in the pages 
        const contentType = resp.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(`no html in response with content type : ${contentType} on page ${currentURL}`)
            return pages
        }
        const htmlBody = await resp.text()
        const nextURLs = getURLSFromHTML(htmlBody, baseUrl)//returns an array of the embedded urls 
        for (nextURL of nextURLs) {
            pages = await crawlPage(baseUrl, nextURL, pages)
        }
    } catch (err) {
        console.log(`err in fetch; ${err.message}`)
    }
    // console.log(await resp.text())
    return pages
}//the final result is an array of pages 
function getURLSFromHTML(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll("a")
    for (const link of linkElements) {
        let urlOBJ;
        if (link.href[0] === '/') {
            // relative 
            try {
                urlOBJ = new URL(`${baseUrl}${link.href}`)
                urls.push(urlOBJ.href)
            } catch (err) {
                console.log(`not valid url : ${err.message} `)
            }
        } else {
            // if not valid the url object will throw an error 
            // absolute url 
            try {
                urlOBJ = new URL(`${link.href}`)
                urls.push(urlOBJ.href)
            } catch (err) {
                console.log(`not valid url : ${err.message} `)
            }
        }
    }
    return urls
}

ReadableStreamDefaultController
function normalizeURL(url) {
    const urlOBJ = new URL(url)
    let validURL = `${urlOBJ.hostname}${urlOBJ.pathname}`
    if (validURL.length > 0 && validURL.slice(-1) == "/") {
        validURL = validURL.slice(0, -1)
    }
    return validURL
}



module.exports = {
    normalizeURL,
    getURLSFromHTML,
    crawlPage
}