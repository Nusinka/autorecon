const moment = require('moment')

function firebaseTimestampToDate(timestamp) {
    return firebaseTimestampToMoment(timestamp).toDate()
}

function firebaseTimestampToMoment(timestamp) {
    return moment(timestamp.seconds * 1000)
}


function getDataFromQuerySnapshot (snapshot) {
    const data = {}
    snapshot.forEach(snapShot => {
      const item = snapShot.data()
      let id = snapShot.id
      data[id] = item
    })
    return data
  }

module.exports = {
    firebaseTimestampToDate,
    firebaseTimestampToMoment,
    getDataFromQuerySnapshot
}