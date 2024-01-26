function report(pages) {
    const entries = Object.entries(pages)
    entries.sort(sortPages)
    return entries

}

function sortPages(p1, p2) {
    // return (p1[1] > p2[1]) ? 1 : (p1[1] < p2[1]) ? -1 : 0;
    return p1[1] - p2[1];
}
module.exports = {
    report
}