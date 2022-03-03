const express = require("express");
const { authMiddleware } = require("../auth/auth");
const { getUser } = require("../firebase/NotyFirestoreConnection");


const userRoutes = express.Router()

userRoutes.use(authMiddleware)

userRoutes.get('/getUser', async function(req,res) {
    let user = await getUser(req.user.email)
    if (user) {
        res.status(200).send(user)
    }
    else {
        res.status(500)
    }
})




module.exports = userRoutes


