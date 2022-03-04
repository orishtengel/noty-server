const express = require("express");
const { async } = require("q");
const { authMiddleware } = require("../auth/auth");
const { getUser } = require("../firebase/NotyFirestoreConnection");


const userRoutes = express.Router()

userRoutes.use(authMiddleware)

userRoutes.get('/getUser', async function(req,res) {
    const user = await getUser(req.user.email)
    if (user) {
        res.status(200).json({ ok:true, data: user })
    }
    else {
        res.status(500).json({ ok:false })
    }
})

userRoutes.post("/getUserByEmail", async (req, res) => {
    try {
      const user = await getUser(req.body.email);
      res.status(201).json({ ok: true, data: user});
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
});


// app.get('/getUser', async function s(req, res) {
//     if(req.notyUserToken) {
//         console.log(req)
//         let user = await getUser(req.notyUserToken.email)
//         if(user) {
//             user.email = req.notyUserToken.email
//             res.status(200).send(user)
//         }
//         else {
//             res.status(400)
//         }
//     }
// })

module.exports = userRoutes


