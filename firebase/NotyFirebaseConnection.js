const admin = require('firebase-admin')

const serviceAccount = require('./ezlinks-1b7b7-firebase-adminsdk-a4u13-8316ed2199.json')

admin.initializeApp({
    credential : admin.credential.cert(serviceAccount)
})

module.exports = admin
