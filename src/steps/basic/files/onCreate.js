module.exports =
`import user from '../../modules/user'

const functions = require('firebase-functions')
const admin = require('firebase-admin')
try { admin.initializeApp(functions.config().firebase) } catch (e) {} // You do that because the admin SDK can only be initialized once.

module.exports = functions.firestore.document('users/{uid}').onCreate(event => {
  return user.created(event)
})
`
