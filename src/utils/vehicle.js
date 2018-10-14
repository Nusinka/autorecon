function cleanVin (vin) {
  vin = vin.replace(/ /, '')
  vin = vin.replace(/[Ii]/, '1')
  vin = vin.replace(/[Oo]/, '0')
  vin = vin.replace(/Ø/, '0')
  vin = vin.replace(/Q/, '0').trim()
  return vin.toUpperCase()
}

module.exports = {
  cleanVin
}