const request = require('supertest')
const app = require('../server')
const encodeCyrillic = require('../src/logic/encodeCyrillic')

describe('GET /icon', () => {
  const branch = 'feature/some-cool'
  const host = 'jenkins.some.com'

  test.each([
    [
      'regular-tests',
      'Regular tests',
      `https://${host}/buildStatus/icon?job=regular-tests%2Ffeature%252Fsome-cool&subject=Regular+tests`,
    ],
    [
      'E2E Tests',
      'E2E tests',
      `https://${host}/buildStatus/icon?job=E2E+Tests%2Ffeature%252Fsome-cool&subject=E2E+tests`,
    ],
    [
      'security-pipeline',
      'Security pipeline',
      `https://${host}/buildStatus/icon?job=security-pipeline%2Ffeature%252Fsome-cool&subject=Security+pipeline`,
    ],
  ])('redirects job=%s correctly', async (job, subject, expectedLocation) => {
    const res = await request(app)
      .get('/icon')
      .query({ host, job, branch, subject })
    expect(res.status).toBe(302)
    expect(res.headers.location).toBe(expectedLocation)
  })

  test('returns 404 when host is missing', async () => {
    const res = await request(app).get('/icon').query({ job: 'my-job', branch })
    expect(res.status).toBe(404)
  })

  test('returns 404 when host is invalid', async () => {
    const res = await request(app).get('/icon').query({ host: 'not a valid host!!', job: 'my-job', branch })
    expect(res.status).toBe(404)
  })
})

describe('encodeCyrillic', () => {
  test.each([
    ['123абв', '123абв'],
    ['123abc', '123abc'],
    ['bugfix/task-sample', 'bugfix%2Ftask-sample'],
  ])('encodeCyrillic %s->%s', (text, expected) => {
    const res = encodeCyrillic(text)
    expect(res).toBe(expected)
  })
})
