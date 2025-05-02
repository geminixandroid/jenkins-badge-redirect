const express = require('express')
const URL = require('url').URL

function stringIsAValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}

function encodeCyrillic(str) {
  const temp = str.replace(/[А-Яа-яЁё]/g, function (match) {
    return 'RU_' + match.charCodeAt(0) + '_'
  })

  const encoded = encodeURIComponent(temp)

  return encoded.replace(/RU_(\d+)_/g, function (match, code) {
    return String.fromCharCode(code)
  })
}

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
