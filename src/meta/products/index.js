const {colors} = require('../theme')

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

const skipped = {
  id: 'skipped',
  name: ''
}

const entryTypes = {
  selected: {
    name: 'selected'
  },
  scanned: {
    name: 'scanned'
  }
}

const scanTypes = {
  scanIn: 'scanIn',
  stopped: 'stopped',
  finished: 'finished',
  restart: 'restart',
  updateLocation: 'updateLocation',
  move: 'move'
}

const productActions = {
  initial: {name: 'initial'},
  initialMove: {name: 'initialMove'},
  initialUpdateLocation: {name: 'initialUpdateLocation'},
  initialRestart: {name: 'initialRestart'},
  stop: {name: 'stop'},
  resume: {name: 'resume'},
  move: {name: 'move'},
  finishStation: {name: 'finishStation'},
  complete: {name: 'complete'},
  updateLocation: {name: 'updateLocation'},
  restart: {name: 'restart'},
  skip: {name: 'skip'}
}

const stationStatusTypes = {
  notStarted: 'notStarted',
  active: 'active',
  stopped: 'stopped',
  finished: 'finished',
  allFinished: 'allFinished',
  started: 'started',
  rework: 'rework',
  skipped: 'skipped'
}

const stationStatusMeta = {
  notStarted: {
    id: stationStatusTypes.notStarted,
    name: 'Not Started',
    color: colors.white,
    showStatus: false,
    webIcon: {
      name: 'ios-radio-button-off',
      color: colors.black
    }
  },
  active: {
    id: stationStatusTypes.active,
    name: 'Active',
    color: colors.green,
    showStatus: true,
    webIcon: {
      name: 'ios-radio-button-on',
      color: colors.green
    }
  },
  stopped: {
    id: stationStatusTypes.stopped,
    name: 'Stopped',
    color: colors.red,
    showStatus: true,
    webIcon: {
      name: 'ios-radio-button-on',
      color: colors.red
    }
  },
  finished: {
    id: stationStatusTypes.finished,
    name: 'Finished',
    color: colors.blue,
    showStatus: false,
    webIcon: {
      name: 'ios-checkmark-circle',
      color: colors.blue
    }
  },
  allFinished: {
    id: stationStatusTypes.allFinished,
    name: '',
    color: colors.blue,
    showStatus: true,
    icon: "md-checkmark",
    webIcon: {
      name: 'ios-checkmark-circle',
      color: colors.blue
    }
  },
  started: {
    id: stationStatusTypes.started,
    name: 'Started',
    color: colors.green,
    showStatus: false,
    webIcon: {
      name: 'ios-radio-button-on',
      color: colors.green
    }
  },
  rework: {
    id: stationStatusTypes.rework,
    name: 'Rework',
    color: colors.red,
    showStatus: false,
    webIcon: {
      name: 'ios-radio-button-on',
      color: colors.red
    }
  },
  skipped: {
    id: stationStatusTypes.skipped,
    name: '',
    color: colors.red,
    showStatus: false,
    webIcon: {
      name: 'ios-alert',  
      color: colors.red
    }
  }
}

const timesTypes = {
  active: 'active',
  queue: 'queue',
  rework: 'rework',
  combined: 'combined'
}

const productStatusTypes = {
  notStarted: 'notStarted',
  inProgress: 'inProgress',
  completed: 'completed',
  skipped: 'skipped',
  wholesale: 'wholesale'
}

const productFeedStatusTypes = {
  missingFeedInfo: {
    id: 'missingFeedInfo'
  }
}


module.exports = {
  allStation, notStarted, completeName, 
  entryTypes, scanTypes, productActions, productStatusTypes,
  stationStatusTypes, stationStatusMeta, timesTypes, skipped,
  productFeedStatusTypes
}
