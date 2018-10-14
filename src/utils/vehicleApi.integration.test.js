const {decodeVinNumber} = require('./vehicleApi')

test('Decodes vin', () => {
  const vin = 'WVGRF7BP6HD00296o'

  expect.assertions(1)

  return decodeVinNumber(vin)
    .then(vehicleInfo => {
      expect(vehicleInfo).toEqual({
        year: '2017',
        make: 'VOLKSWAGEN',
        model: 'Touareg',
        trim: '3.6L FSI Wolfsburg'
      })
    })
})