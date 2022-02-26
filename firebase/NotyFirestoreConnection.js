const  admin = require("./NotyFirebaseConnection");
var { v4: uuidv4 } = require('uuid');
const { generateRandomColor } = require("../utils/colorutils");
const db = admin.firestore()

module.exports = {
    verifyToken: async (idtoken) => {
       console.log(idtoken)
       let resp =
       await admin.auth().verifyIdToken(idtoken)
    },

    //USER FUNCTIONS
    createUser: async (name, email) => {
        await db.collection('users').doc(email).create({name: name.toLowerCase(),
             color: generateRandomColor(),
             admin: false,
             picture: picture})
    },
    getUser: async (userId) => {
        const snapshot = await db.collection('users').doc(userId).get()
        return snapshot.data()
    },
    getUsers: async () => {
        const snapshot = await db.collection('users').get()
        let arr = {}
        snapshot.forEach(doc => {
            arr[doc.ref.id] = doc.data()
        })
        return arr
        
    },
    deleteUser: async (userId) => {  
        let result = await db.collection('users').doc(userId).delete()
        if(result) 
            return true
        else
            return undefined
    },

    //COURSE FUNCTIONS 
    getCourse: async (courseId) => {
        const snapshot = await db.collection('course').doc(courseId).get()
        return snapshot.data()
    },
    getCourses: async () => {
        const snapshot = await db.collection('courses').get()
        let arr = {}
        snapshot.forEach(doc => {
            arr[doc.ref.id] = doc.data()
        })
        return arr
        
    },
}

