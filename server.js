const express = require('express')
const URL = require('url').URL
const stringIsAValidUrl = require('./src/logic/stringIsAValidUrl')
const encodeCyrillic = require('./src/logic/encodeCyrillic')

const app = express()
app.get('/icon', (req, res) => {
  const host = req.query['host']
  const job = req.query['job']
  const branch = req.query['branch']
  const queryKeys = Object.keys(req.query).filter(
    (key) => !['host', 'job', 'branch'].includes(key)
  )

  if (!host || !job || !branch || host.includes(req.hostname)) {
    res.writeHead(404)
    res.end()
    return
  }

  const redirect = new URL(`https://${host}/buildStatus/icon`)

  redirect.searchParams.append('job', `${job}/${encodeCyrillic(branch)}`)
  queryKeys.forEach((key) => {
    redirect.searchParams.append(key, req.query[key])
  })

  if (!stringIsAValidUrl(redirect)) {
    res.writeHead(404)
    res.end()
    return
  }

  res.redirect(redirect)
})

const port = 80

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})