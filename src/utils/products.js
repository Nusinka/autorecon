const {completeName, notStarted} = require('../meta/dealership')
const { productStatusTypes, stationStatusMeta } = require('../meta/products');
const { firebaseTimestampToDate } = require('./firebase')

function getGpsLocation (product) {
  if (!hasLocation(product)) {
    return {}
  }
  const {currentLocation} = product

  if (currentLocation) {
    return currentLocation
  }

  const time = getLastTime(product)
  const {location, locationAccuracy} = time
  return {location, locationAccuracy}
}

function hasGpsLocation (product) {
  if (!hasLocation(product)) {
    return false
  }

  if (product.currentLocation) {
    return !!product.currentLocation.location.longitude
  }

  const time = getLastTime(product)

  return time && !!time.location.longitude
}

function hasLocation (product) {
  if (!product) {
    return false
  }

  const {times, currentLocation} = product

  if (currentLocation && !!currentLocation.location) {
    return true
  }

  const time = getLastTime(product)

  return time && !!time.location
}

function getLastTime (product) {
  const {times} = product
  if (!times) {
    return
  }

  const lastIndex = times.length - 1
  return times[lastIndex]
}

const getCurrentStationId = (product) => {
  const {currentStationId, times} = product
  if (currentStationId) {
    return currentStationId
  }
  if (!times) {
    return undefined
  }
  const lastIndex = times.length - 1

  return times[lastIndex].stationId
}

const getStationInfo = (product, dealerStations) => {
  const currentStationId = getCurrentStationId(product)
  if (product.status === notStarted.id) {
    return notStarted
  } else if (currentStationId === completeName.id || product.status === productStatusTypes.skipped) {
    return completeName
  } else {
    const stationInfo = dealerStations[currentStationId]
    return stationInfo
  }
}

const getStationStatusMeta = (product, dealerStations) => {
  const stations = product.stations || {}
  const status = product.status
  const currentStationId = getStationInfo(product, dealerStations).id
  const currentStation = stations[currentStationId]
  if (currentStation) {
    return stationStatusMeta[currentStation.status]
  } else if (status === productStatusTypes.completed) {
    return stationStatusMeta.allFinished 
  }
  return {}
}

const getTotalDuration = (product) => {
  const start = firebaseTimestampToDate(product.timeStarted)
  let end
  if (product.timeCompleted) {
    end = firebaseTimestampToDate(product.timeCompleted)
  } else {
    end = Date.now()
  }
  return end.valueOf() - start.valueOf()
}

const getTimeDuration = (times, index) => {
  const length = times.length
  const start = firebaseTimestampToDate(times[index].timeChecked)
  let end
  if (index + 1 < length) {
    end = firebaseTimestampToDate(times[index + 1].timeChecked)
  } else {
    end = Date.now()
  }
  return end.valueOf() - start.valueOf()
}

module.exports = {
  getGpsLocation, hasGpsLocation, hasLocation, getLastTime, 
  getCurrentStationId, getStationInfo, getStationStatusMeta,
  getTimeDuration, getTotalDuration
}