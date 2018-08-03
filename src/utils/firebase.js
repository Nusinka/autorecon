const moment = require('moment')

function firebaseTimestampToDate(timestamp) {
    return firebaseTimestampToMoment(timestamp).toDate()
}

function firebaseTimestampToMoment(timestamp) {
    return moment(timestamp.seconds * 1000)
}

module.exports = {
    firebaseTimestampToDate,
    firebaseTimestampToMoment
}