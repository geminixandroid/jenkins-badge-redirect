function stringIsAValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}

module.exports = stringIsAValidUrl
