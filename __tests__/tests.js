const stringIsAValidUrl = require('../src/logic/stringIsAValidUrl')
const encodeCyrillic = require('../src/logic/encodeCyrillic')

describe('stringIsAValidUrl', () => {
  test.each([
    ['http://some.url', true],
    ['http://some^url', false],
    ['123', false],
    ['', false],
    [null, false],
    [undefined, false],
  ])('stringIsAValidUrl %s->%s', (url, expected) => {
    const res = stringIsAValidUrl(url)
    expect(res).toBe(expected)
  })
})

describe('encodeCyrillic', () => {
  test.each([
    ['123абв', '123абв'],
    ['123abc', '123abc'],
  ])('stringIsAValidUrl %s->%s', (text, expected) => {
    const res = encodeCyrillic(text)
    expect(res).toBe(expected)
  })
})
