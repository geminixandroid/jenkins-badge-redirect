function encodeCyrillic(str) {
  const temp = str.replace(/[А-Яа-яЁё]/g, function (match) {
    return 'RU_' + match.charCodeAt(0) + '_'
  })

  const encoded = encodeURIComponent(temp)
  
  return encoded.replace(/RU_(\d+)_/g, function (match, code) {
    return String.fromCharCode(code)
  })
}

module.exports = encodeCyrillic