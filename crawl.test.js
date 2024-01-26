const { normalizeURL, getURLSFromHTML } = require("./crawl")
const { test, expect } = require("@jest/globals")

test("test normalizeURL striping protocol", () => {
    const input = "https://boot.dev"
    const actual = normalizeURL(input)
    const expected = "boot.dev"
    expect(actual).toEqual(expected)
})

test("test normalizeURL striping trailing slashes", () => {
    const input = "https://boot.dev/"
    const actual = normalizeURL(input)
    const expected = "boot.dev"
    expect(actual).toEqual(expected)
})
test("test normalizeURL dealing with capitals", () => {
    const input = "https://BOOT.dev/"
    const actual = normalizeURL(input)
    const expected = "boot.dev"
    expect(actual).toEqual(expected)
})
test("test normalizeURL stripping http", () => {
    const input = "http://BOOT.dev/"
    const actual = normalizeURL(input)
    const expected = "boot.dev"
    expect(actual).toEqual(expected)
})


test("getUrlsFromHTML testing ", () => {
    const inputHTML = `
        <html>
            <body>
                <a href="https://blog.boot.dev/">
                    the blog
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getURLSFromHTML(inputHTML, inputBaseUrl)
    const expected = ["https://blog.boot.dev/"]

    expect(actual).toEqual(expected)
})
test("getUrlsFromHTML relative testing ", () => {
    const inputHTML = `
        <html>
            <body>
                <a href="/path/">
                    the blog
                </a>
                <a href="https://blog.boot.dev/blog/">
                    the blog
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getURLSFromHTML(inputHTML, inputBaseUrl)
    const expected = ["https://blog.boot.dev/path/", "https://blog.boot.dev/blog/"]

    expect(actual).toEqual(expected)
})
test("getUrlsFromHTML invalid URL  ", () => {
    const inputHTML = `
        <html>
            <body>
                <a href="invlaid">
                    the blog
                </a>
            </body>
        </html>
    `
    const inputBaseUrl = "https://blog.boot.dev";
    const actual = getURLSFromHTML(inputHTML, inputBaseUrl)
    const expected = []
    expect(actual).toEqual(expected)
})