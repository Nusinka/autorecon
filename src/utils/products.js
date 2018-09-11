const { notStarted, productStatusTypes, stationStatusMeta, completeName, skipped } = require('../meta/products');
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
  } else if (currentStationId === completeName.id) {
    return completeName
  } else if (product.status === productStatusTypes.skipped) {
    return skipped
  } else {
    const stationInfo = dealerStations[currentStationId]
    return stationInfo
  }
}

const getStationStatusMeta = (product, dealerStations) => {
  const stations = product.stations || {}
  const status = product.status
  const currentDealerStation = getStationInfo(product, dealerStations)

  const currentDealerStationId = currentDealerStation && currentDealerStation.id
  const currentStation = stations[currentDealerStationId]
  if (currentStation) {
    return stationStatusMeta[currentStation.status]
  } else if (status === productStatusTypes.completed) {
    return stationStatusMeta.allFinished 
  } else if (status === productStatusTypes.skipped) {
    return stationStatusMeta.skipped
  }
  return {}
}

const getTotalDuration = (product) => {
  if (product.status === productStatusTypes.skipped) {
    return 0
  }
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

const getStationDurationInfo = (product) => {
  const {times} = product
  let reworkStatus = false
  let complete = false
  const durations = times.reduce((acc, time, index) => {
    const {timeChecked, stationId} = time
    if (!acc[stationId]) {
      acc[stationId] = 0
    }

    const duration = getTimeDuration(times, index)
    acc[stationId] += duration

    if (stationId === completeName.id && complete === false) {
      // if (reworkStatus === false) {
      complete = true
      // }
    }

    if (complete && stationId !== completeName.id) {
      complete = false
      if (!reworkStatus) {
        acc[stationStatusMeta.rework.id] = 0
        reworkStatus  = true
      }
      acc[stationStatusMeta.rework.id] += acc[completeName.id]
      acc[completeName.id] = 0
    }

    return acc
  }, {})
  return durations
}

module.exports = {
  getGpsLocation, hasGpsLocation, hasLocation, getLastTime, 
  getCurrentStationId, getStationInfo, getStationStatusMeta,
  getTimeDuration, getTotalDuration, getStationDurationInfo
}