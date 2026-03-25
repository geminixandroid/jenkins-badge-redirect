const express = require('express')
const URL = require('url').URL
const encodeCyrillic = require('./src/logic/encodeCyrillic')

const app = express()
app.get('/icon', (req, res) => {
  const host = req.query['host']
  const job = req.query['job']
  const branch = req.query['branch']
  const queryKeys = Object.keys(req.query).filter(
    (key) => !['host', 'job', 'branch'].includes(key)
  )

  if (!host || !job || !branch || host === req.hostname) {
    res.writeHead(404)
    res.end()
    return
  }

  let redirect
  try {
    redirect = new URL(`https://${host}/buildStatus/icon`)
  } catch {
    res.writeHead(404)
    res.end()
    return
  }

  redirect.searchParams.append('job', `${job}/${encodeCyrillic(branch)}`)
  queryKeys.forEach((key) => {
    redirect.searchParams.append(key, req.query[key])
  })

  res.setHeader("Jenkins-Badge-Redirect-Version","1.0.3");

  res.redirect(redirect)
})

if (process.env.LISTEN) {
  const lastColon = process.env.LISTEN.lastIndexOf(':')
  const host = process.env.LISTEN.slice(0, lastColon)
  const port = parseInt(process.env.LISTEN.slice(lastColon + 1))
  app.listen(port, host, () => {
    console.log(`Server listening on ${process.env.LISTEN}`)
  })
} else if (require.main === module) {
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  })
}

module.exports = app