const colors = require('../theme')

const completeName = {
  id: 'complete',
  name: 'Completed'
}

const notStarted = {
  id: 'notStarted',
  name: 'Not Started'
}

const allStation = {
  id: 'all',
  name: 'All'
}

const stationStatusTypes = {
  notStarted: 'notStarted',
  active: 'active',
  stopped: 'stopped',
  finished: 'finished',
  allFinished: 'allFinished'
}

const stationStatusMeta = {
  notStarted: {
    id: stationStatusTypes.notStarted,
    name: 'Not Started',
    color: colors.white,
    showStatus: false
  },
  started: {
    id: stationStatusTypes.started,
    name: 'Started',
    color: colors.silver,
    showStatus: true
  },
  active: {
    id: stationStatusTypes.active,
    name: 'Active',
    color: colors.green,
    showStatus: true
  },
  stopped: {
    id: stationStatusTypes.stopped,
    name: 'Stopped',
    color: colors.red,
    showStatus: true
  },
  finished: {
    id: stationStatusTypes.finished,
    name: 'Finished',
    color: colors.blue,
    showStatus: false
  },
  allFinished: {
    id: stationStatusTypes.allFinished,
    name: '',
    color: colors.blue,
    showStatus: false
  },
}

module.exports = {completeName, allStation, stationStatusMeta, stationStatusTypes, notStarted}