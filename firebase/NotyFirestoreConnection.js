const { admin } = require("./NotyFirebaseConnection");
const db = admin.firestore()
var { v4: uuidv4 } = require('uuid');

module.exports = {
    createUser: async (email, password) => {
        await db.collection('users').create({
             email: email.toLowerCase(),
             password: password,
             })
    },
}

