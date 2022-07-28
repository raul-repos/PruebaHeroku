const { sum, max } = require("./dummy")

describe("Test sum", () => {
  test("test 1", () => {
    expect(sum(1, 2)).toBe(3)
  })
  test("test 2", () => {
    expect(sum(0, 0)).toBe(0)
  })
})

describe("Test max", () => {
  test("test 1", () => {
    expect(max(1, 2)).toBe(2)
  })

  test("test 2", () => {
    expect(max(0, 0)).toBe(0)
  })
})
