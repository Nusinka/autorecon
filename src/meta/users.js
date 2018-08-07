const userTypes = {
  employee: {
    id: 'employee',
    name: 'Employee',
    level: 0
  },
  manager: {
    id: 'manager',
    name: 'Manager',
    level: 1
  }
}

const userStatusTypes = {
  active: {id: 'active'},
  deleted: {id: 'deleted'}
}

module.exports = {userTypes, userStatusTypes}