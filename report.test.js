const { report } = require("./report")
const { test, expect } = require("@jest/globals")

test("reportPages", () => {
    const input = {
        "boot.dev/path": 2,
        "boot.dev/path/andrew": 5,
        "boot.dev/path/john": 3,
        "boot.dev": 1
    }
    const actual = report(input)
    const expected = [
        ["boot.dev", 1],
        ["boot.dev/path", 2],
        ["boot.dev/path/john", 3],
        ["boot.dev/path/andrew", 5],
    ];
    expect(expected).toEqual(actual)
})
