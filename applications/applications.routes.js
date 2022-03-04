const express = require("express");
const { authMiddleware } = require("../auth/auth");
const { getApplications, addSubscribe } = require("../firebase/NotyFirestoreConnection");


const applicationRoutes = express.Router()

applicationRoutes.use(authMiddleware)

applicationRoutes.get('/getApplications', async function (req, res) {
    let arr = []
    arr = await getApplications()
    if(arr) {
        res.status(200).send({ok:true, data:arr})
    }
    else { 
        res.status(500)
    }
 })

 applicationRoutes.post("/addSubscribe", async (req, res) => {
    try {
        const { keyWebsite, date, startTime, endTime, frequncy } = req.body
        let resp = await addSubscribe(keyWebsite, req.user.email, date, startTime, endTime, frequncy)
        if(resp) {
            res.status(200).send({ok: true})
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = applicationRoutes


