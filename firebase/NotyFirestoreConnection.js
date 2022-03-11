const  admin = require("./NotyFirebaseConnection");
var { v4: uuidv4 } = require('uuid');
const { generateRandomColor } = require("../utils/colorutils");
const { async } = require("q");
const db = admin.firestore()
const storage = admin.storage()
module.exports = {
    verifyToken: async (idtoken) => {
       return await admin.auth().verifyIdToken(idtoken)
    },

    //USER FUNCTIONS
    createUser: async (name, email, phone) => {
        return await db.collection('users').doc(email).create({name: name.toLowerCase(),
             color: generateRandomColor(),
             admin: false,
             phone: phone})
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
    getApplications: async () => {
        const snapshot = await db.collection('application').get()
        let arr = {}
        snapshot.forEach(doc => {
            arr[doc.ref.id] = doc.data()
        })
        return arr
    },
    getSubscriptionsByIdAndEmail: async (id, email) => {
        const snapshot = await db.collection('application').doc(id).collection('subscribes').get()
        let arr = {}
        snapshot.forEach(doc => {
            if(doc.data().email == email)
                arr[doc.ref.id] = doc.data()
        })
        return arr
    },
    getSubscriptionsById: async (id) => {
        const snapshot = await db.collection('application').doc(id).collection('subscribes').get()
        let arr = {}
        snapshot.forEach(doc => {
            arr[doc.ref.id] = doc.data()
        })
        return arr
    },
    addSubscribe: async (data) => {
        // console.log(keyWebsite,  date, startTime, endTime, frequncy)
        let res = await db.collection('application').doc(data.idWebsite).collection('subscribes').add(data)

        if(res) 
            return true
        else
            return false
    },   

    deleteSubscribe: async (idWebsite,idSubscribe) => {  
        let res = await db.collection('application').doc(idWebsite).collection('subscribes').doc(idSubscribe).delete()
        if(res) 
            return true
        else
            return undefined
    },
}

