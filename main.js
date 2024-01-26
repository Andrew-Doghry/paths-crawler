const { crawlPage } = require("./crawl")
const { report } = require("./report")
async function main() {
    const args = process.argv
    if (args.length < 3) {
        console.log("\x1b[31mno websites provided .....\x1b[0m")
        process.exit(1)
    }
    if (args.length > 3) {
        console.log("\x1b[31mtoo many command line args .....\x1b[0m")
        process.exit(1)
    }
    console.log("start crawling ")
    try {

        pages = await crawlPage(args[2], args[2], {})
        // for (const page of Object.entries(pages)) {
        //     console.log(`found the page ${page[0]} ${page[1]} times `)
        // }
        // console.log("\x1b[31m the pages are ", pages)
        console.log(report(pages))
    } catch (err) {
        console.log("error in crawling ")
    }
}


main()
