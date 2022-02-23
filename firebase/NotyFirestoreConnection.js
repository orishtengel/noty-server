const  admin = require("./NotyFirebaseConnection");
var { v4: uuidv4 } = require('uuid');

module.exports = {
    verifyToken: async (idtoken) => {
       console.log(idtoken)
       let resp = await admin.auth().verifyIdToken(idtoken)
       console.log(resp)  
    },
}

