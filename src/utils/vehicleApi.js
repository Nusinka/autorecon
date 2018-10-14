const fetch = require('cross-fetch');

const baseUrl = 'https://vpic.nhtsa.dot.gov/api/'
const decodeVinFlat = 'vehicles/DecodeVinValues/'
const format = '?format=json'

function makeUrl (endpoint, query) {
  return baseUrl + endpoint + query + format
}

function decodeVinNumber (vin) {
  if (!fetch) {
    throw new Error('Fetch method needed')
  }

  const url = makeUrl(decodeVinFlat, vin)
  return fetch(url)
    .then(results => {
      return results.json()
    })
    .then(data => {
      const {
        ModelYear: year,
        Make: make,
        Model: model,
        Series: trim,
        ErrorCode
      } = data.Results[0]

      // Error code '0' means no error
      if (ErrorCode.startsWith('0')) {
        return {
          year,
          make,
          model,
          trim
        }
      }
    })
}

module.exports = {decodeVinNumber}